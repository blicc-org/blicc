import axios from 'axios'
import fs from 'fs-extra'

const instance = axios.create({
  baseURL: 'http://localhost',
  withCredentials: true,
  validateStatus: status => status >= 200 && status < 500,
})

export async function setBundleData(slug, data, cookie) {
  await instance.put(`/bundles/${slug}`, data, {
    headers: {
      Cookie: cookie,
      'Content-Type': 'application/javascript',
    },
  })
}

export async function setChart(inputData, cookie) {
  const { title, bundle, description, key, slug } = inputData
  let id = ''

  const { data: currentCharts } = await instance.get('/charts', {
    headers: {
      Cookie: cookie,
    },
  })
  currentCharts.charts.forEach(chart => {
    if (chart.slug === slug && chart.key === key) id = chart.id
  })

  if (id) {
    const { data: currentChart } = await instance.get(`/charts/${id}`, {
      headers: {
        Cookie: cookie,
      },
    })

    await instance.put(
      `/charts/${id}`,
      { ...currentChart, title, bundle, description },
      {
        headers: {
          Cookie: cookie,
        },
      }
    )
  } else {
    await instance.post('/charts', inputData, {
      headers: {
        Cookie: cookie,
      },
    })
  }
}

export async function readData(file) {
  return await fs.readFile(`${__dirname}/../build/bundles/${file}`)
}

export async function getCookie(email, password) {
  let response = await instance.post('/tokens', {
    email,
    password,
  })

  const cookies = response.headers['set-cookie']
  return cookies.find(cookie => cookie.startsWith('access_token')).split(';')[0]
}

export async function getMetaInfo(path) {
  return fs.readdirSync(path).map(file => {
    const fileExports = require(path + file)
    const { title: bundle, meta = {} } = fileExports['default']
    const keys = Object.keys(fileExports).filter(exp => exp !== 'default')
    return {
      file,
      bundle,
      slug: slug(bundle),
      plugins: keys.map(key => {
        const title = meta[key] && meta[key].title ? meta[key].title : key
        const description =
          meta[key] && meta[key].description ? meta[key].description : ''
        return { title, description, key }
      }),
    }
  })
}

function slug(str) {
  str = str.replace(/^\s+|\s+$/g, '')
  str = str.toLowerCase()

  const from = 'àáäâèéëêìíïîòóöôùúüûñç·/_,:;'
  const to = 'aaaaeeeeiiiioooouuuunc------'
  for (let i = 0, l = from.length; i < l; i++) {
    str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i))
  }

  str = str
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')

  return str
}

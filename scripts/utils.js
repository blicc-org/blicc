import axios from 'axios'
import fs from 'fs-extra'

export async function setBundleData(baseUrl, slug, data, cookie) {
  await axios.put(`${baseUrl}/bundles/${slug}`, data, {
    headers: {
      Cookie: cookie,
      'Content-Type': 'application/javascript',
    },
  })
}

export async function setChart(baseUrl, inputData, cookie) {
  const { title, bundle, description, key, slug } = inputData
  let id = ''

  const { data: currentCharts } = await axios.get(`${baseUrl}/charts`, {
    headers: {
      Cookie: cookie,
    },
  })
  currentCharts.charts.forEach(chart => {
    if (chart.slug === slug && chart.key === key) id = chart.id
  })

  if (id) {
    const { data: currentChart } = await axios.get(`${baseUrl}/charts/${id}`, {
      headers: {
        Cookie: cookie,
      },
    })

    await axios.put(
      `${baseUrl}/charts/${id}`,
      { ...currentChart, title, bundle, description },
      {
        headers: {
          Cookie: cookie,
        },
      }
    )
  } else {
    await axios.post(`${baseUrl}/charts`, inputData, {
      headers: {
        Cookie: cookie,
      },
    })
  }
}

export async function readData(file) {
  return await fs.readFile(`${__dirname}/../build/bundles/${file}`)
}

export async function getCookie(baseUrl, email, password) {
  let response = await axios.post(`${baseUrl}/tokens`, {
    email,
    password,
  })

  console.log(response)

  const cookies = response.headers['set-cookie']
  return cookies.find(cookie => cookie.startsWith('access_token')).split(';')[0]
}

export async function getMetaInfo(path) {
  return fs
    .readdirSync(path, { withFileTypes: true })
    .filter(dirent => !dirent.isDirectory())
    .map(({ name }) => {
      const fileExports = require(path + name)
      const { title: bundle, meta = {} } = fileExports['default']
      const keys = Object.keys(fileExports).filter(exp => exp !== 'default')
      return {
        name,
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

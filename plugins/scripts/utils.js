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

export async function setChart(data, cookie) {
  await instance.post('/charts', data, {
    headers: {
      Cookie: cookie,
    },
  })
}

export async function readData(slug) {
  return await fs.readFile(`${__dirname}/../build/${slug}.min.js`)
}

export async function getCookie(email, password) {
  let response = await instance.post('/tokens', {
    email,
    password,
  })

  const cookies = response.headers['set-cookie']
  return cookies.find(cookie => cookie.startsWith('access_token')).split(';')[0]
}

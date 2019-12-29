import '@babel/polyfill'
import dotenv from 'dotenv'
import {
  getCookie,
  setBundleData,
  setChart,
  readData,
  getMetaInfo,
} from './utils'

dotenv.config()

async function main() {
  const bundles = await getMetaInfo(`${__dirname}/es5/`)

  const email = process.env.EMAIL
  const password = process.env.PASSWORD
  const baseUrl = process.env.SERVER

  const cookie = await getCookie(baseUrl, email, password)

  bundles.forEach(async ({ name, bundle, slug, plugins }) => {
    const data = await readData(name)
    await setBundleData(baseUrl, slug, data, cookie)
    plugins.forEach(async ({ title, description, key }) => {
      await setChart(baseUrl, { title, bundle, description, key, slug }, cookie)
    })
  })
}

main()

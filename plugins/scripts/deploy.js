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

  const email = process.env.ADMIN_MAIL
  const password = process.env.ADMIN_PASSWORD

  const cookie = await getCookie(email, password)

  bundles.forEach(async ({ file, bundle, slug, plugins }) => {
    const data = await readData(file)
    await setBundleData(slug, data, cookie)
    plugins.forEach(async ({ title, description, key }) => {
      await setChart({ title, bundle, description, key, slug }, cookie)
    })
  })
}

main()

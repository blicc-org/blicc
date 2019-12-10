import '@babel/polyfill'
import flags from 'commander'
import dotenv from 'dotenv'
import { getCookie, setBundleData, setChart, readData } from './utils'

dotenv.config()
flags.option('-b, --bundle <value>', 'Name of bundle to deploy')
flags.parse(process.argv)
;(async () => {
  const email = process.env.ADMIN_MAIL
  const password = process.env.ADMIN_PASSWORD

  const title = 'Geil'
  const bundle = 'Essentials'
  const description = 'Use the pie chart to display data.'
  const key = 'HelloWorld'
  const slug = flags.bundle

  const cookie = await getCookie(email, password)
  await setChart({ title, bundle, description, key, slug }, cookie)
  const data = await readData(slug)
  await setBundleData(slug, data, cookie)
})()

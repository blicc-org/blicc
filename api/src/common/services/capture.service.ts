import puppeteer from 'puppeteer'
import sharp from 'sharp'
import { Logger, MinIOClient } from '../../util'
import { ADMIN_MAIL, ADMIN_PASSWORD, APP } from '../../config'

export class CaptureService {
  public capture(id: string): void {
    const bucket = 'dashboard-thumbnails'
    const region = 'de-east-1'
    const imgName = `${id}.jpg`
    const quality = 50

    // wrapped to force no blocking when called in controller
    ;(async (): Promise<void> => {
      const browser = await puppeteer.launch({
        headless: true,
        executablePath: '/usr/bin/google-chrome-unstable',
        args: ['--no-sandbox', '--disable-dev-shm-usage'],
      })
      const page = await browser.newPage()
      await page.setViewport({
        width: 1280,
        height: 720,
        deviceScaleFactor: 1,
      })

      await page.goto(`https:blicc.org/login`)
      await page.type('#inputEmail', ADMIN_MAIL)
      await page.type('#inputPassword', ADMIN_PASSWORD)
      await page.click('#submitLogin')
      await page.waitForNavigation()
      await page.goto(`${APP.ORIGIN}/dashboards/${id}?fullscreen`)
      await page.waitFor(500)

      let buf: Buffer = await page.screenshot({
        encoding: 'binary',
        type: 'jpeg',
        quality,
      })

      Logger.info(`Store thumbnail 1280x720/${imgName}`)
      MinIOClient.store(bucket, region, `1280x720/${imgName}`, buf)

      buf = await sharp(buf)
        .resize(640, 360)
        .jpeg({ quality, force: false })
        .toBuffer()

      Logger.info(`Store thumbnail 640x360/${imgName}`)
      MinIOClient.store(bucket, region, `640x360/${imgName}`, buf)

      await browser.close()
    })()
  }
}

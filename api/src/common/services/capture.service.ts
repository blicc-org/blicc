import puppeteer from 'puppeteer'
import sharp from 'sharp'
import { ADMIN_MAIL, ADMIN_PASSWORD, APP } from '../../config'
import { Resolution, ImageService } from './image.service'

export class CaptureService {
  public static capture(
    id: string,
    bucket: string,
    screenshotPath: string,
    resLarge: Resolution,
    resSmall: Resolution
  ): void {
    const region = 'de-east-1'
    const imgName = `${id}.jpg`
    const quality = 50
    const timeToWaitInMS = 500

    // wrapped to force no blocking when called in controller
    ;(async (): Promise<void> => {
      const browser = await puppeteer.launch({
        headless: true,
        executablePath: '/usr/bin/google-chrome-unstable',
        args: ['--no-sandbox', '--disable-dev-shm-usage'],
      })
      const page = await browser.newPage()
      await page.setViewport({
        width: resLarge.getWidth(),
        height: resLarge.getHeight(),
        deviceScaleFactor: 1,
      })

      await page.goto(`${APP.ORIGIN}/login`)
      await page.type('#inputEmail', ADMIN_MAIL)
      await page.type('#inputPassword', ADMIN_PASSWORD)
      await page.click('#submitLogin')
      await page.waitForNavigation()
      await page.goto(`${APP.ORIGIN}${screenshotPath}`)
      await page.waitFor(timeToWaitInMS)

      let buf: Buffer = await page.screenshot({
        encoding: 'binary',
        type: 'jpeg',
        quality,
      })

      ImageService.store(bucket, region, resLarge, imgName, buf)

      buf = await sharp(buf)
        .resize(resSmall.getWidth(), resSmall.getHeight())
        .jpeg({ quality, force: false })
        .toBuffer()

      ImageService.store(bucket, region, resSmall, imgName, buf)

      await browser.close()
    })()
  }
}

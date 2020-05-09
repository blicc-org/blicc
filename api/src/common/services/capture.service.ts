import puppeteer from 'puppeteer'
import sharp from 'sharp'
import { ADMIN_MAIL, ADMIN_PASSWORD, APP } from '../../config'
import { Resolution, ImageService } from './image.service'

export class CaptureService {
  private static REGION = 'de-east-1'
  private static QUALITY = 50
  private static TIME_TO_WAIT_IN_MS = 500

  public static capture(
    id: string,
    bucket: string,
    screenshotPath: string,
    resLarge: Resolution,
    resSmall: Resolution
  ): void {
    const imgName = `${id}.jpg`

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

      await page.goto(`${APP.ORIGIN_INSIDE}/login`)
      await page.type('#inputEmail', ADMIN_MAIL)
      await page.type('#inputPassword', ADMIN_PASSWORD)
      await page.click('#submitLogin')
      await page.waitForNavigation()
      await page.goto(`${APP.ORIGIN_INSIDE}${screenshotPath}`)
      await page.waitFor(this.TIME_TO_WAIT_IN_MS)

      let buf: Buffer = await page.screenshot({
        encoding: 'binary',
        type: 'jpeg',
        quality: this.QUALITY,
      })

      ImageService.store(bucket, this.REGION, resLarge, imgName, buf)

      buf = await sharp(buf)
        .resize(resSmall.getWidth(), resSmall.getHeight())
        .jpeg({ quality: this.QUALITY, force: false })
        .toBuffer()

      ImageService.store(bucket, this.REGION, resSmall, imgName, buf)

      await browser.close()
    })()
  }
}

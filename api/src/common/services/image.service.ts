import { Logger } from '../../util'
import { MinIOClient } from '../../util'

export class Resolution {
  private width: number
  private height: number

  public constructor(width: number, height: number) {
    this.width = width
    this.height = height
  }

  public getWidth(): number {
    return this.width
  }

  public getHeight(): number {
    return this.height
  }

  public getString(): string {
    return `${this.width}x${this.height}`
  }
}

export class ImageService {
  public static store(
    bucket: string,
    region: string,
    res: Resolution,
    imgName: string,
    buf: Buffer
  ): void {
    Logger.info(`Store image ${res.getString()}/${imgName}`)
    MinIOClient.store(bucket, region, `${res.getString()}/${imgName}`, buf)
  }
}

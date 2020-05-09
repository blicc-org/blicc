import { Client } from 'minio'
import { Logger } from './logger'
import { MINIO_USERNAME, MINIO_PASSWORD } from '../config'

class MinIO {
  private client: Client

  public constructor() {
    this.client = new Client({
      endPoint: 'storage',
      port: 9000,
      useSSL: false,
      accessKey: MINIO_USERNAME,
      secretKey: MINIO_PASSWORD,
    })
  }

  public store(
    bucket: string,
    region: string,
    imgPath: string,
    imgBuffer: Buffer
  ): void {
    this.client.bucketExists(bucket, (err, exists) => {
      if (err) return Logger.error(err.toString())
      if (exists) {
        this.client.putObject(bucket, imgPath, imgBuffer, (err) => {
          if (err) return Logger.error(err.toString())
          Logger.info(`File ${imgPath} uploaded successfully.`)
        })
      } else {
        this.client.makeBucket(bucket, region, (err) => {
          if (err) return Logger.error(err.toString())
          Logger.info(`Bucket created successfully in ${region}.`)

          this.client.putObject(bucket, imgPath, imgBuffer, (err) => {
            if (err) return Logger.error(err.toString())
            Logger.info(`File ${imgPath} uploaded successfully.`)
          })
        })
      }
    })
  }

  public async load(bucket: string, imgPath: string): Promise<Buffer> {
    const chunks: Uint8Array[] = []
    const stream = await this.client.getObject(bucket, imgPath)

    stream.on('data', (chunk) => {
      chunks.push(chunk)
    })

    return new Promise((resolve, reject) => {
      stream.on('end', () => resolve(Buffer.concat(chunks)))
      stream.on('error', () => reject())
    })
  }

  public async remove(bucket: string, imgPath: string): Promise<void> {
    await this.client.removeObject(bucket, imgPath)
  }
}

export const MinIOClient = new MinIO()

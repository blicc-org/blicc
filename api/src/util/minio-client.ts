import { Client } from 'minio'
import { MINIO_USERNAME, MINIO_PASSWORD } from '../config'

class Minio {
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
      if (err) return console.log(err)
      if (exists) {
        this.client.putObject(bucket, imgPath, imgBuffer, (err) => {
          if (err) return console.log(err)
          console.log(`File ${imgPath} uploaded successfully.`)
        })
      } else {
        this.client.makeBucket(bucket, region, (err) => {
          if (err) return console.log(err)
          console.log(`Bucket created successfully in ${region}.`)

          this.client.putObject(bucket, imgPath, imgBuffer, (err) => {
            if (err) return console.log(err)
            console.log(`File ${imgPath} uploaded successfully.`)
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
}

export const MinioClient = new Minio()

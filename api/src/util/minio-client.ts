import { Client } from 'minio'

class Minio {
  private client: Client

  public constructor() {
    const accessKey = process.env.MINIO_USERNAME || ''
    const secretKey = process.env.MINIO_PASSWORD || ''

    this.client = new Client({
      endPoint: 'storage',
      port: 9000,
      useSSL: false,
      accessKey,
      secretKey,
    })
  }

  public store(
    bucket: string,
    region: string,
    name: string,
    imgBuffer: Buffer
  ): void {
    this.client.bucketExists(bucket, (err, exists) => {
      if (err) return console.log(err)
      if (exists) {
        this.client.putObject(bucket, name, imgBuffer, (err) => {
          if (err) return console.log(err)
          console.log(`File ${name} uploaded successfully.`)
        })
      } else {
        this.client.makeBucket(bucket, region, (err) => {
          if (err) return console.log(err)
          console.log(`Bucket created successfully in ${region}.`)

          this.client.putObject(bucket, name, imgBuffer, (err) => {
            if (err) return console.log(err)
            console.log(`File ${name} uploaded successfully.`)
          })
        })
      }
    })
  }

  public async load(bucket: string, name: string): Promise<Buffer> {
    const chunks: Uint8Array[] = []
    const stream = await this.client.getObject(bucket, name)

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

import { Client } from 'minio'

class Minio {
  private client: Client

  public constructor() {
    this.client = new Client({
      endPoint: 'storage',
      port: 9000,
      useSSL: false,
      accessKey: 'api',
      secretKey: 'password',
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
      if (!exists) {
        this.client.makeBucket(bucket, region, (err) => {
          if (err) return console.log(err)
          console.log(`Bucket created successfully in ${region}.`)
        })
      }
    })
    this.client.putObject(bucket, name, imgBuffer, (err) => {
      if (err) return console.log(err)
      console.log(`File ${name} uploaded successfully.`)
    })
  }
}

export const MinioClient = new Minio()

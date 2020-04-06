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
}
export const MinioClient = new Minio()

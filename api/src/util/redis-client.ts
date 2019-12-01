import redis, { RedisClient as Client } from 'redis'
import { REDIS_PORT, REDIS_HOST } from '../config'

export class RedisClient {
  private static instance: RedisClient
  private client: Client

  private constructor() {
    this.client = redis.createClient(REDIS_PORT, REDIS_HOST)
    this.client.on('error', error => {
      console.log('Redis error: ' + error)
    })
  }

  public static getInstance(): RedisClient {
    if (!RedisClient.instance) {
      RedisClient.instance = new RedisClient()
    }
    return RedisClient.instance
  }

  public set(key: string, value: string): void {
    this.client.set(key, value)
  }

  public async get(key: string): Promise<string> {
    return new Promise((accept, reject) => {
      this.client.get(key, (err, reply) => {
        if (!err) accept(reply)
        else reject(err)
      })
    })
  }
}

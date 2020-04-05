import redis, { RedisClient as Client } from 'redis'
import { REDIS_PORT, REDIS_HOST } from '../config'
import { Logger } from './logger'

class Redis {
  private client: Client

  public constructor() {
    this.client = redis.createClient(REDIS_PORT, REDIS_HOST)
    this.client.on('error', (e) => Logger.error(e))
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

export const RedisClient = new Redis()

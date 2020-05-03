import { connect } from 'amqplib'
import { RABBITMQ_USERNAME, RABBITMQ_PASSWORD } from '../config'
import { Logger } from './logger'

class RabbitMQ {
  private URL = `amqp://${RABBITMQ_USERNAME}:${RABBITMQ_PASSWORD}@rabbitmq:5672`

  public async publish(queue: string, obj: any): Promise<void> {
    const message = JSON.stringify(obj)
    const connection = await connect(this.URL)
    const channel = await connection.createChannel()
    channel.sendToQueue(queue, Buffer.from(message))
    Logger.info(`message send to ${queue}: ${message}`)
  }

  public async status(): Promise<boolean> {
    const connection = await connect(this.URL)
    try {
      await connection.createChannel()
    } catch (err) {
      return false
    }
    return true
  }
}

export const RabbitMQClient = new RabbitMQ()

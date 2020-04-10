import { connect } from 'amqplib'
import { RABBITMQ_USERNAME, RABBITMQ_PASSWORD } from '../config'
import { Logger } from './logger'

class RabbitMQ {
  private URL = `amqp://${RABBITMQ_USERNAME}:${RABBITMQ_PASSWORD}@rabbitmq:5672`

  public constructor() {}

  public async publish(queue: string, message: string): Promise<void> {
    Logger.info('create connection to rabbitMQ client')
    const connection = await connect(this.URL)
    Logger.info('create channel')
    const channel = await connection.createChannel()
    Logger.info('assert queue')
    await channel.assertQueue(queue)
    channel.sendToQueue(queue, Buffer.from(message))
  }
}

export const RabbitMQClient = new RabbitMQ()

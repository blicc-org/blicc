import { connect } from 'amqplib'
import { RABBITMQ_USERNAME, RABBITMQ_PASSWORD } from '../config'
import { Logger } from './logger'

class RabbitMQ {
  private URL = `amqp://${RABBITMQ_USERNAME}:${RABBITMQ_PASSWORD}@rabbitmq:5672`
  private connection: any // eslint-disable-line @typescript-eslint/no-explicit-any

  constructor() {
    this.connection = connect(this.URL)
  }

  public async publish(queue: string, message: string): Promise<void> {
    Logger.info('create channel')
    const channel = this.connection.createChannel()
    Logger.info('assert queue')
    await channel.assertQueue(queue)
    channel.sendToQueue(queue, Buffer.from(message))
  }

  public status(): boolean {
    return true
  }
}

export const RabbitMQClient = new RabbitMQ()

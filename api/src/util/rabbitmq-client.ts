import amqplib from 'amqplib'

export class RabbitMQClient {
  public constructor() {
    const q = 'tasks'

    const open = amqplib.connect('amqp://admin:test@rabbitmq:5672')

    // Publisher
    open
      .then((conn) => {
        return conn.createChannel()
      })
      .then((ch) => {
        return ch.assertQueue(q).then(() => {
          return ch.sendToQueue(q, Buffer.from('something to do'))
        })
      })
      .catch(console.warn)

    // Consumer
    open
      .then((conn) => {
        return conn.createChannel()
      })
      .then((ch) => {
        return ch.assertQueue(q).then(() => {
          return ch.consume(q, (msg) => {
            if (msg !== null) {
              console.log(msg.content.toString())
              ch.ack(msg)
            }
          })
        })
      })
      .catch(console.warn)
  }
}
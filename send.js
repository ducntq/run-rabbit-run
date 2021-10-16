import dotenv from 'dotenv'
import AMQPClient from '@cloudamqp/amqp-client'

dotenv.config()

async function run() {
  try {
    const amqp = new AMQPClient(process.env.RABBITMQ_HOST, process.env.RABBITMQ_USERNAME, process.env.RABBITMQ_PASSWORD)
    const conn = await amqp.connect()
    const ch = await conn.channel()
    /*
    const consumer = await q.subscribe({noAck: true}, async (msg) => {
      console.log(msg.bodyToString())
      await consumer.cancel()
    })
    */
    await ch.basicPublish("non-existing-exchange", 'routingkey', null, true, true)
    //await consumer.wait() // will block until consumer is canceled or throw an error if server closed channel/connection
    await conn.close()
  } catch (e) {
    console.error("ERROR", e)
    e.connection.close()
  }
}

run()
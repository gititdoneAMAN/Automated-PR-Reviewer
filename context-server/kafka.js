require('dotenv').config();
const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: process.env.KAFKA_CLIENT_ID || 'my-app',
  brokers: [process.env.KAFKA_BROKER || '192.168.101.73:9092'],
});

const producer = kafka.producer();
const consumer = kafka.consumer({ groupId: 'my-app3' });

const topic = process.env.KAFKA_TOPIC || 'code-events';

let isProducerConnected = false;
let isConsumerConnected = false;

async function initProducer() {
  if (!isProducerConnected) {
    await producer.connect();
    isProducerConnected = true;
    console.log('Producer connected.');
  }
}

async function initConsumer() {
  if (!isConsumerConnected) {
    await consumer.connect();
    isConsumerConnected = true;
    console.log('Consumer connected.');
  }
}

async function produce(message) {
  try {
    await initProducer();
    const response = await producer.send({
      topic,
      messages: [{ value: message }],
      retry: { retries: 5 },
    });
    console.log('Message sent:', message, 'Response:', response);
  } catch (error) {
    console.error('Error in producer:', error);
  }
}

async function consume() {
  try {
    await initConsumer();
    await consumer.subscribe({ topic, fromBeginning: true });

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        try {
          console.log({
            offset: message.offset,
            value: message?.value?.toString(),
          });
          console.log('-------------------WE WORK HERE------------------');
        } catch (error) {
          console.error('Error processing message:', error);
        }
      },
    });
  } catch (error) {
    console.error('Error in consumer:', error);
  }
}

async function shutdown() {
  console.log('Shutting down gracefully...');
  await producer.disconnect();
  await consumer.disconnect();
  process.exit(0);
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

module.exports = { produce, consume, shutdown };

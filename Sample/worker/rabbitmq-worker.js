const amqp = require("amqplib");
const { processJob } = require("./jobProcessing.js");
const { setKey } = require("./redis-worker.js");
// *** Configure & Establish Connection *** //

let channel;

const startQueueService = async () => {
  try {
    const amqpServerIP = "amqp://rabbitmq:5672";
    const connection = await amqp.connect(amqpServerIP);
    channel = await connection.createChannel();
    await channel.assertQueue("jobs");
    channel.prefetch(1);
    console.log("Queue Listening for Jobs...");
  } catch (err) {
    if (channel === undefined) {
      while (channel === undefined) {
        console.log(`${err}, Retrying to connect to Queue Service...`);
        function sleep(ms) {
          return new Promise((resolve) => {
            setTimeout(resolve, ms);
          });
        }
        await sleep(1500);
        await startQueueService();
      }
    } else {
      console.log(
        `Error Connecting to Queue Service on Worker Node, Error: ${err}`
      );
    }
  }
};

const startProcessing = async () => {
  try {
    if (channel === undefined) {
      await startQueueService();
    }

    // *** Start Processing Jobs *** //
    channel.consume("jobs", async (data) => {
      const job = JSON.parse(data.content.toString());
      await setKey(job.folder_name, "Processing");
      try {
        await processJob(job);
      } catch (err) {
        console.log(`Error while Processing Job: ${err}`);
      }
      channel.ack(data);
    });
  } catch (err) {
    console.log(`Unable to process jobs on Worker Node, Error: ${err}`);
  }
};

module.exports = { startQueueService, startProcessing };

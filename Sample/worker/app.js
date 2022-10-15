const { startQueueService, startProcessing } = require("./rabbitmq-worker.js");
const { connectRedis } = require("./redis-worker.js");

// *** Start listening for jobs in Queue service *** //
const startWorker = async () => {
  try {
    await startQueueService();
    await connectRedis();
    await startProcessing();
  } catch (err) {
    console.log(`Error on Worker Node: ${err}`);
  }
};

startWorker();

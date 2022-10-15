const amqp = require("amqplib");

let channel;

// *** Configure the connection *** //
const connectQueue = async () => {
  const amqpServerIP = "amqp://rabbitmq:5672";
  const connection = await amqp.connect(amqpServerIP);
  channel = await connection.createChannel();
  channel.assertQueue("jobs");
};

// *** Function to Push in Queue *** //
const sendInQueue = async (data) => {
  // *** Establish connection for the first time *** //
  if (channel === undefined) {
    try {
      await connectQueue();
    } catch (err) {
      console.log(
        `Error Connecting to Queue Service on Servr Node, Error: ${err}`
      );
    }
  }

  try {
    channel.sendToQueue("jobs", data);
  } catch (err) {
    console.log(`Error sending in Queue Service : ${err}`);
    channel.close();
    connection.close();
  }
};

module.exports = { sendInQueue };

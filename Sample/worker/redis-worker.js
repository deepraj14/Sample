const redis = require("redis");

let redisClient;

const connectRedis = async () => {
  try {
    redisClient = redis.createClient({
      socket: {
        port: 6379,
        host: "redis-server",
      },
    });

    await redisClient.connect();
    console.log("Successfully connected to Redis (Worker Node)...");
  } catch (err) {
    if (redisClient === undefined) {
      while (redisClient === undefined) {
        console.log(`${err}, Retrying to connect to Redis...`);
        function sleep(ms) {
          return new Promise((resolve) => {
            setTimeout(resolve, ms);
          });
        }
        await sleep(1000);
        await connectRedis();
      }
    } else {
      console.log("Error in Redis(Worker Node): " + err);
    }
  }
};

const setKey = async (key, value) => {
  await redisClient.set(key, value);
};

const setEx = async (key, value) => {
  await redisClient.set(key, value, {
    EX: 600,
  });
};

const getKey = async (key) => {
  const value = await redisClient.get(key);
  return value;
};

const delKey = async (key) => {
  await redisClient.del(key);
};

module.exports = { setKey, setEx, getKey, delKey, connectRedis };

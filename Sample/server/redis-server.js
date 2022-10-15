const redis = require("redis");

let redisClient;

const connect = async () => {
  redisClient = redis.createClient({
    socket: {
      port: 6379,
      host: "redis-server",
    },
  });
  await redisClient.connect();
};

const setKey = async (key, value) => {
  if (redisClient === undefined) {
    await connect();
  }
  await redisClient.set(key, value);
};

const getKey = async (key) => {
  if (redisClient === undefined) {
    await connect();
  }
  const value = await redisClient.get(key);
  return value;
};

const delKey = async (key) => {
  if (redisClient === undefined) {
    await connect();
  }
  await redisClient.del(key);
};

module.exports = { setKey, getKey, delKey };

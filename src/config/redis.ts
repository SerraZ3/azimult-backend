import Redis from "ioredis";

const { REDIS_HOST, REDIS_PORT, REDIS_PASS } = process.env;

const redis = new Redis({
  host: REDIS_HOST,
  port: REDIS_PORT ? parseInt(REDIS_PORT) : undefined,
  password: REDIS_PASS,
});

export default redis;

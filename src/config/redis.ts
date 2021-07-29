import Redis from 'ioredis';
import { REDIS_HOST, REDIS_PORT } from '../constants/env';

const redisConfig = {
  host: REDIS_HOST,
  port: Number(REDIS_PORT),
};

const redisClient = new Redis(redisConfig);

redisClient.on('error', (err) => {
  console.log(err);
  process.exit(1);
});

export { redisConfig, redisClient };

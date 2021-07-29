import Redis from 'ioredis';
import { REDIS_HOST, REDIS_PORT } from '../constants/env';

const redisConfig = {
  host: REDIS_HOST,
  port: Number(REDIS_PORT),
};

const redisClient = new Redis(redisConfig);

export { redisConfig, redisClient };

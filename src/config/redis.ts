import { REDIS_HOST, REDIS_PORT } from '../constants/env';

const redisConfig = {
  host: REDIS_HOST,
  port: Number(REDIS_PORT),
};

export { redisConfig };

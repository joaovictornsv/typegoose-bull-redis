/* eslint-disable no-unused-vars */
import Redis from 'ioredis';

class RedisCache {
  constructor(
    private redisClient: Redis.Redis,
  ) {}

  set = async (
    key: string,
    value: any,
    timeExp: number,
  ): Promise<'OK'|null> => this.redisClient.set(key, JSON.stringify(value), 'EX', timeExp)

  get = async (key: string): Promise<Object | null> => {
    const value = await this.redisClient.get(key);

    return value ? JSON.parse(value) : null;
  }
}

export { RedisCache };

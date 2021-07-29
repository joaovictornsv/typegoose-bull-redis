/* eslint-disable no-unused-vars */
import { Request, Response } from 'express';
import { redisClient } from '../config/redis';
import { UserModel } from '../entities/User';
import { mailQueue } from '../services/mail-queue';
import { RedisCache } from '../services/redis-cache';

class UserController {
  constructor(
    private redisCache: RedisCache = new RedisCache(redisClient),
  ) {}

  create = async (req: Request, res: Response) => {
    const userData = req.body;

    if (!userData.name || !userData.email) {
      return res.status(400).json({ error: 'Fill required fields "name" and "email"' });
    }

    const userAlreadyExists = await UserModel.findOne({ email: userData.email });

    if (userAlreadyExists) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const user = await UserModel.create(userData);

    await mailQueue.add({ user }, { delay: 5000 });

    return res.status(201).json(user);
  }

  index = async (req: Request, res: Response) => {
    const cacheUsers = await this.redisCache.get('users');

    if (cacheUsers) {
      console.log('from cache');
      return res.status(200).json(cacheUsers);
    }

    const users = await UserModel.find();

    await this.redisCache.set('users', users, 30);

    console.log('from DB');
    return res.status(200).json(users);
  }

  indexById = async (req: Request, res: Response) => {
    const { id } = req.params;

    const cacheUser = await this.redisCache.get(`user_${id}`);

    if (cacheUser) {
      console.log('from cache');
      return res.status(200).json(cacheUser);
    }

    const user = await UserModel.findById(id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    await this.redisCache.set(`user_${id}`, user, 30);

    console.log('from DB');
    return res.status(200).json(user);
  }

  verifyEmail = async (req: Request, res: Response) => {
    const { id } = req.params;

    const user = await UserModel.findById(id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.verifiedEmail = true;

    user.save()
      .then(() => res.status(200).json({ message: 'Email verified' }))
      .catch((err) => res.status(500).json({ error: err }));
  }
}

export { UserController };

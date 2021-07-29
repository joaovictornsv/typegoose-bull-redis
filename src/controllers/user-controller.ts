import { Request, Response } from 'express';
import { UserModel } from '../entities/User';
import { mailQueue } from '../services/mail-queue';

class UserController {
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
    const users = await UserModel.find();

    return res.status(200).json(users);
  }

  indexById = async (req: Request, res: Response) => {
    const { id } = req.params;

    const user = await UserModel.findById(id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

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

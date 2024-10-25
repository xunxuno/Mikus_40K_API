import { Request, Response } from 'express';
import { createUser } from '../models/userModel';

export const addUser = async (req: Request, res: Response): Promise<void> => {
  const { userName, email, password } = req.body;

  if (!userName || !email || !password) {
    res.status(400).json({ message: 'Required data is missing' });
    return;
  }

  try {
    await createUser({ userName, email, password });
    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error creating user', error: err });
  }
};

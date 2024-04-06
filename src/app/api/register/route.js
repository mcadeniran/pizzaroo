import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { User } from '../../models/User';

export async function POST(req) {
  const body = await req.json();
  mongoose.connect(process.env.MONGO_URL);
  const pass = body.password;

  if (!pass?.length || pass.length < 5) {
    new Error('Password must be at least 5 characters');
    return false;
  }

  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(pass, salt);
  // user.password = hash;

  body.password = hashedPassword;

  const createdUser = await User.create(body);
  return Response.json(createdUser);
}
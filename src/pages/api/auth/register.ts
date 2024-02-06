import prisma from '@/lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt'

// POST /api/post
// Required fields in body: title
// Optional fields in body: content
export default async function handle(req:NextApiRequest, res:NextApiResponse) {
  const { email, name, password} = req.body;
  const hashPassword = await bcrypt.hash(password, 10);

  const checkUserExist = await prisma.user.findUnique({
    where: {
      email: email
    }
  })

  if(checkUserExist) {
    res.status(400).json({error: 'User already exist'})
  } else {
    const result = await prisma.user.create({
      data: {
        email,
        name,
        password: hashPassword,
      },
    })
    res.json(result);
  }
}
import { signIn } from 'next-auth/react';
import prisma from '@/lib/prisma';
import bcrypt from 'bcrypt';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handle(req:NextApiRequest, res:NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).end(); // Method Not Allowed
  }

  const { email, password } = req.body;

  const user = await prisma.user.findUnique({
    where: {
      email,
     },
  });

  if (user?.password && bcrypt.compareSync(password, user.password)) {
    // Successful login, use NextAuth.js signIn function
    await signIn('domain-login', { email, password, redirect: false });
    return res.status(200).json({ message: 'Login successful' });
  } else {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
}
// import prisma from '../../../../../lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import prisma from '@/lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';
import { Encrypter } from '@/lib/crypto';

// POST /api/post
// Required fields in body: title
// Optional fields in body: content
export default async function handle(req:NextApiRequest, res:NextApiResponse) {
  const { email, username, url, password, notes, title, category } = req.body;

  const session = await getServerSession(req,res, authOptions)
  const encryptionKey = session?.user?.name || 'your_secret_key';
  const encrypter = new Encrypter(encryptionKey);
  const originalText = password
  const encryptedText = encrypter.encrypt(originalText)

  const result = await prisma.createPassWords.create({
    data: {
      email: email,
      username: username,
      url: url,
      password: encryptedText,
      title: title,
      notes: notes,
      category,
      author: {
        connect: {
          email: session?.user?.email,
        }
      },
    },
  })
  res.json(result);
}
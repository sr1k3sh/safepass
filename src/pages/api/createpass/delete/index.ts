import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import prisma from '@/lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

// POST /api/post
// Required fields in body: title
// Optional fields in body: content
export default async function handle(req:NextApiRequest, res:NextApiResponse) {
  const { id } = req.body;

  const session = await getServerSession(req,res, authOptions)

  const result = await prisma.createPassWords.delete({
    where: {
      id,
      author: {
        email: session?.user?.email,
      }
    },
  })
  res.json(result);
}
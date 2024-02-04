import prisma from '@/lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

// Update /api/publish
export default async function handle(req:NextApiRequest, res: NextApiResponse) {
  const { id } = req.body;

  const result = await prisma.post.update({
    where: {
      id
    },
    data: {
      published: true,
    }
  })
  res.json(result);
}
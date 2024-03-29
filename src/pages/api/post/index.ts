// import prisma from '../../../../../lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import prisma from '@/lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

// POST /api/post
// Required fields in body: title
// Optional fields in body: content
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const { title, content } = req.body;

  const session = await getServerSession(req,res, authOptions)

  const result = await prisma.post.create({
    data: {
      title: title,
      content: content,
      author: {
        connect: {
          email: session?.user?.email,
        }
      }
    },
  })
  res.json(result);
}
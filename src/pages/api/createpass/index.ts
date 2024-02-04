// import prisma from '../../../../../lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import prisma from '@/lib/prisma';

// POST /api/post
// Required fields in body: title
// Optional fields in body: content
export default async function handle(req, res) {
  const { email, username, url, password, notes, title, category } = req.body;

  const session = await getServerSession(req,res, authOptions)

  const result = await prisma.createPassWords.create({
    data: {
      email: email,
      username: username,
      url: url,
      password: password,
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
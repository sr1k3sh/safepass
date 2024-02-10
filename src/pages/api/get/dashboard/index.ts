// import prisma from '../../../../../lib/prisma';
import { getServerSession } from 'next-auth';
import prisma from '@/lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';
import { Encrypter } from '@/lib/crypto';
import { authOptions } from '@/pages/api/auth/[...nextauth]'

// POST /api/post
// Required fields in body: title
// Optional fields in body: content
export default async function handle(req:NextApiRequest, res:NextApiResponse) {
  // const { type, bank, cardNumber, expiration, cvv, cardHolder } = req.body;

  // res.status(200).json({ message: 'Hello from Next.js!' })

  const session = await getServerSession(req,res, authOptions)

  const result = await prisma.createPassWords.findMany({
    where: {
      author: { email: session?.user.email },
    },
    include: {
      author: {
        select: { name: true },
      }
    }
  })

  const encrypter = new Encrypter(session?.user?.name || 'your_secret_key')
  const encryptedData = result.map((pass: any) => {
    return ({
      ...pass,
      // password: encrypter.decrypt(pass.password)
    })
  })



  res.json({data:encryptedData});
}
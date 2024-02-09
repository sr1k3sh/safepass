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
  const { type, bank, cardNumber, expiration, cvv, cardHolder } = req.body;

  const session = await getServerSession(req,res, authOptions)
  const encryptionKey = session?.user?.name || 'your_secret_key';
  const encrypter = new Encrypter(encryptionKey);
  // const originalText = cvv
  const encryptedCvv = encrypter.encrypt(cvv)
  const encryptedCard = encrypter.encrypt(cardNumber)

  const result = await prisma.cards.create({
    data: {
      type,
      bank,
      cardNumber: encryptedCard,
      expiration,
      cvv: encryptedCvv,
      cardHolder,
      author: {
        connect: {
          email: session?.user?.email,
        }
      },
    },
  })
  res.json(result);
}
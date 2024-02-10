// import prisma from '../../../../../lib/prisma';
import { getServerSession } from 'next-auth';
import prisma from '@/lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';
import { Encrypter } from '@/lib/crypto';
import { authOptions } from '@/pages/api/auth/[...nextauth]'

// POST /api/post
// Required fields in body: title
// Optional fields in body: content
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  try {
    const session = await getServerSession(req, res, authOptions);

    if (!session) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const result = await prisma.cards.findMany({
      where: {
        author: { email: session?.user.email },
      },
      include: {
        author: {
          select: { name: true },
        }
      }
    });

    const encrypter = new Encrypter(session?.user?.name || 'your_secret_key');
    const encryptedData = result.map((pass: any) => {
      return ({
        ...pass,
        cvv: encrypter.decrypt(pass.cvv),
        cardNumber: encrypter.decrypt(pass.cardNumber),
        // password: encrypter.decrypt(pass.password)
      });
    });

    res.json({ data: encryptedData });
  } catch (error) {
    res.status(error.response?.status || 500).json({ message: error.message || 'Internal Server Error' });
  }
}
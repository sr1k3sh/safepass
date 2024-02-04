import prisma from '@/lib/prisma';

// Update /api/publish
export default async function handle(req, res) {
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
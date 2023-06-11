import { NextApiRequest, NextApiResponse } from "next";

import prisma from '@/libs/prismadb';
import serverAuth from "@/libs/serverAuth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST' && req.method !== 'DELETE') {
    return res.status(405).end();
  }

  try {
    const { postId } = req.body;

    const { currentUser } = await serverAuth(req, res);

    if (!postId || typeof postId !== 'string') {
      throw new Error('ID no válido');
    }

    const post = await prisma.post.findUnique({
      where: {
        id: postId
      }
    });

    if (!post) {
      throw new Error('ID no válido');
    }

    
    
    if (req.method === 'DELETE' && currentUser.id === post.userId) {
      const deletedPost = await prisma.post.delete({
        where: {
          id: postId
        }
      });
      return res.status(200).json(deletedPost);
    }

    

    
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
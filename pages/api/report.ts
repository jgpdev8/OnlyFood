import { NextApiRequest, NextApiResponse } from "next";

import prisma from '@/libs/prismadb';
import serverAuth from "@/libs/serverAuth";
import Router from "next/router";

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

    let updatedReportIds = [...(post.ReportIds || [])];
    
    if (req.method === 'POST') {
      updatedReportIds.push(currentUser.id);
      
    
      
    }

    if (req.method === 'DELETE') {
      updatedReportIds = updatedReportIds.filter((ReportedId) => ReportedId !== currentUser?.id);
    }
    let updatedPost;
      if(updatedReportIds.length>=3){
        updatedPost = await prisma.post.delete({
          where: {
            id: postId
          }
        });    
      }else{
        updatedPost = await prisma.post.update({
          where: {
            id: postId
          },
          data: {
            ReportIds: updatedReportIds
          }
        });
      }
    

    return res.status(200).json(updatedPost);
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
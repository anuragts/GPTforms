import type{ NextApiRequest, NextApiResponse } from "next";

import { prisma } from "@/db/client"
export default async (req:NextApiRequest,res:NextApiResponse) => {

  const {email}:{email:string} = req.body

  // const parseEmail = email;
  const user = await prisma.user.findUnique({
    where: {
      email:email,
    },
  })

      if (user) {
        res.status(200).json(true)
      }  else {
        res.status(200).json(false)
      }
}
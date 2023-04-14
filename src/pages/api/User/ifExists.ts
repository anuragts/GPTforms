import type{ NextApiRequest, NextApiResponse } from "next";

import { prisma } from "@/db/client"
export default async (req:NextApiRequest,res:NextApiResponse) => {

  const email :string = req.body

    const exists = await prisma.user.findMany({
        where: { email  },
      });

      if (( exists).length > 0) {
        res.status(200).json("exists")
      } 
}
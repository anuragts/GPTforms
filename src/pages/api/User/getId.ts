import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/db/client";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { email }: {email:string} = req.body;
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
    },
  });
  res.status(200).json(user);
};

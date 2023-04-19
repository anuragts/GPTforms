import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/db/client";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { id }:{id:string} = await req.body;
  const parseint = parseInt(id);
  const data = await prisma.form_fields.findMany({
    where: {
      form_id: parseint,
    },
    select: {
      name: true,
      description: true,
    },
  });
  res.status(200).json(data);
};

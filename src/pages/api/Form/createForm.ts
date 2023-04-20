import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/db/client";

interface Form {
  name: string;
  description: string;
  user_id: number;
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { name, description, user_id }: Form = await req.body;

  const id = parseInt(`${user_id}`);

  const form = await prisma.forms.create({
    data: {
      name,
      description,
      user: {
        connect: {
          id,
        },
      },
    },
  });

  res.status(201).json(form);
};

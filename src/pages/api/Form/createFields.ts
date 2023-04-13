import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/db/client";

interface Field{
    name: string;
    description: string;
    form_id: number;
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { name, description, form_id }:Field = await req.body;
  const id = parseInt(`${form_id}`);
  const form = await prisma.form_fields.create({
    data: {
      name,
      description,
      form: {
        connect: {
          id,
        },
      },
    },
  });
  res.status(201).json(form);
};

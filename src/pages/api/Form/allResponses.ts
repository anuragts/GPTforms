import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/db/client";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { formId } = req.body;

  const parseFormid = parseInt(formId);

  const response = await prisma.response.findMany({
    where: { form_id: parseFormid },
    include: { form_field: true },
  });

  res.status(200).json(response);
};

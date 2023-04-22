import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/db/client";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { formId } = req.body;

  const parseFID = parseInt(formId);

  if (!formId) {
    return res.status(400).json({ error: "Form ID not provided" });
  }

  try {
    const forms = await prisma.forms.findMany({
      where: {
        id: parseFID,
      },
    });
    res.status(200).json(forms);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};


import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/db/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { userId } = req.body;

  const parseUID = parseInt(userId);

  if (!userId) {
    return res.status(400).json({ error: "User ID not provided" });
  }

  try {
    const forms = await prisma.forms.findMany({
      where: { user_id: parseUID },
    });

    return res.status(200).json(forms);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
}

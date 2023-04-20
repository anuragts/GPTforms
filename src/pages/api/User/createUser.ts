import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/db/client";

interface User {
  name?: string;
  email: string;
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { name, email } = (await req.body) as User;

  const exists: Promise<Array<{ id: number }>> = prisma.user.findMany({
    where: { email },
  });
  if (!name || !email) {
    res.status(400).json("Please enter all fields");
  } else if ((await exists).length > 0) {
    res.status(400).json("Already exists");
  } else {
    const user = await prisma.user.create({
      data: {
        name,
        email,
      },
    });
    res.status(201).json(user);
  }
};

export default handler;

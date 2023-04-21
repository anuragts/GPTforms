import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/db/client";

interface Form {
  form_id: string;
  formData: {
    [key: string]: string;
  };
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { form_id, formData }: Form = req.body;

  const id = parseInt(form_id);

  const response = await prisma.response.create({
    data: {
      form_id: id,
      form_field: {
        createMany: {
          data: Object.entries(formData).map(([field_name, field_value]) => ({
            field_name,
            field_value,
          })),
        },
      },
    },
  });


  res.status(200).json(response);
};

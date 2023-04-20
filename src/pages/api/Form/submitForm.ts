import { PrismaClient} from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from "next";

interface Form {
  form_id: string;
  formData: {
    [key: string]: string;
  };
}

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { form_id, formData }: Form = req.body;

  const id = parseInt(form_id);
  
  const response = await prisma.response.create({
    data: {
      form_id:id,
      form_field: {
        createMany: {
          data: Object.entries(formData).map(([field_name, field_value]) => ({
            field_name,
            field_value
          }))
        }
      }
    }
  });

  console.log(response);

  res.status(200).json(response);
};

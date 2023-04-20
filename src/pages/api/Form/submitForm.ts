import type { NextApiRequest, NextApiResponse } from "next";

interface Form {
  form_id: number;
  formData: {
    [key: string]: string;
  };
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { form_id,formData }: Form = req.body;
  console.log(form_id, formData); // 9 { '10': 'This is 3', '11': 'This is 2', '12': 'This is 1' }
  res.status(200).json({ form_id, formData });
};


import type { NextApiRequest, NextApiResponse } from "next";
import { openAi } from "@/config/openAi.config";

type Form = {
  name: string;
  description: string;
  no_fields: string;
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { name, description, no_fields }: Form = req.body;

  const parseNo = parseInt(no_fields);
  const response = await openAi.createCompletion({
    model: `text-davinci-003`,
    prompt: `You are Form AI , you'll be provided with form name and description and no of fields and you have to create form fields for it.\nGive response as {1 : "field name"}\n\nexample response -  \nform name - Maths test \ndescription - make form for maths test form middle school students.\nnumber of fields - 2\n\nresponse - [ {1:'What is 1+1'}. {2:'Is 15 an odd number ?'} ]\n\nNow create for the following - \n\nform name - ${name} \ndescription - ${description} \nnumber of fields - ${parseNo}\n\nresponse - `,
    temperature: 0.7,
    max_tokens: 256,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });

  res.status(200).json(response.data?.choices[0].text);
};

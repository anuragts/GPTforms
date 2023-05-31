import axios from "axios";

type Field = {
  name: string;
  description: string;
  form_id: number;
};

type FormField = {
  name: string;
  description: string;
};

export const createFields = async (
  fields: Array<{ [key: number]: string }>,
  formId: number
) => {
  const mappedFields: Array<FormField> = fields.map((field) => {
    const name = Object.values(field)[0];
    return { name, description: "", form_id: formId };
  });

  const fieldCreationPromises = mappedFields.map((field) =>
    axios.post<Field>("/api/create", field)
  );
  const createdFields = await Promise.all(fieldCreationPromises);

  return createdFields.map((field) => field.data);
};

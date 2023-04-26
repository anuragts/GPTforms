import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { useRouter } from "next/router";
interface Field {
  name: string;
  description: string;
  form_id: number;
}

interface FormField {
  name: string;
  description: string;
}

export const createFields = async (fields: any, formId: number) => {
  const mappedFields: any = fields.map((field: any) => {
    const name = Object.values(field)[0];
    return { name, description: "", form_id: formId };
  });

  const fieldCreationPromises = mappedFields.map((field: any) =>
    axios.post<Field>("/api/Form/createFields", field)
  );
  const createdFields = await Promise.all(fieldCreationPromises);

  return createdFields.map((field) => field.data);
};

export default function CreateAI() {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [fields, setFields] = useState<number>(0);
  const [user_id, setUser_id] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [form_id, setForm_id] = useState<number | null>(null);

  const { user } = useUser();
  const email: string = user?.primaryEmailAddress?.emailAddress as string;

  const router = useRouter();

  useEffect(() => {
    if (email) {
      const fetchUser = async () => {
        try {
          const id = await axios.post("/api/User/getId", {
            email,
          });
          const user_id = id.data?.id;
          setUser_id(user_id);
        } catch (error) {
          console.error("Error fetching user id: ", error);
        }
      };
      fetchUser();
    }
  }, [email]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    if (!user_id) {
      console.error("User ID not available.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post("/api/Form/createForm", {
        name,
        description,
        user_id,
      });
      if (response) {
        console.log("Create response: ", response);
        console.log("id", response?.data?.id);
        const formId = response?.data?.id;
        console.log("Form created.");

        try {
          if (!name || !description || !fields) {
            console.error("Fields not provided.");
          } else {
            const response = await axios.post("/api/AI/get", {
              name,
              description,
              no_fields: fields,
            });

            console.log("AI response: ", response);

            if (response) {
              if (formId) {
                const str = response?.data;
                let result = str.replace(/([{,])([^{:,]+):/g, '$1"$2":');
                result = result.replace(/'/g, '"'); // replace single quotes with double quotes
                const fields_arr = JSON.parse(result);
                const createdFields = await createFields(fields_arr, formId);
                console.log("AI created. field");

                if (createdFields) {
                  console.log("Fields created.");
                  router.push(`/response/${formId}`);
                } else {
                  console.error("fields not created");
                }
              } else {
                console.error("form id not provided.");
              }
            } else {
              console.error("Error creating AI. response not provided");
            }
          }
        } catch (error) {
          console.error("Error creating AI: ", error);
        }

        setForm_id(formId);
      }
    } catch (error) {
      console.error("Error creating form: ", error);
    }

    setLoading(false);
  };

  return (
    <>
      <div className="flex justify-center mt-[10%] mx-[2rem]">
        <form onSubmit={handleSubmit} className="w-full md:w-1/2 lg:w-1/3">
          <div className="mb-4">
            <h2 className="mb-10 mt-[8rem] md:[10rem] text-center text-3xl font-extrabold text-gray-900">
              Create Form using AI
            </h2>
            <label
              htmlFor="name"
              className="block text-gray-700 font-bold mb-2"
            >
              Name:
            </label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="off"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your form name eg :- Maths exam"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-gray-700 font-bold mb-2"
            >
              Description:
            </label>
            <textarea
              id="description"
              name="description"
              value={description}
              required
              onChange={(e) => setDescription(e.target.value)}
              placeholder="more description about your form eg :- Calculus test"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="fields"
              className="block text-gray-700 font-bold mb-2"
            >
              No of Fields:
            </label>
            <input
              type="number"
              id="fields"
              name="fields"
              min={2}
              required
              value={fields}
              onChange={(e) => setFields(parseInt(e.target.value))}
              placeholder="Enter number of fields"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mt-6 text-center">
            <button
              type="submit"
              className="py-3 px-6 text-lg font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              disabled={!name || !description || !fields || loading}
            >
              {loading ? "Creating..." : "Create"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

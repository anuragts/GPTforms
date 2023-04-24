import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import axios from "axios";

interface Field {
  name: string;
  description: string;
  form_id: number;
}

interface FormField {
  name: string;
  description: string;
}

export const createFields = async (
  fields: Array<{ [key: number]: string }>,
  formId: number
) => {
  const mappedFields: Array<FormField> = fields.map((field) => {
    const name = Object.values(field)[0];
    return { name, description: "", form_id: formId };
  });

  const fieldCreationPromises = mappedFields.map((field) =>
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
  const [response, setResponse] = useState<string>("");
  const [form_id, setForm_id] = useState<number | null>(null);

  const { user } = useUser();
  const email: string = user?.primaryEmailAddress?.emailAddress as string;

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
        console.log('id' ,response?.data?.id)
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
              console.log('fid',formId)
              if (formId) {
                const str = response?.data
                const result:[] = str.replace(/^"|"$/g, '');
                console.log(result)
                console.log(typeof result)
                const fields_arr = JSON.parse(response?.data);
                const createdFields = await createFields(fields_arr, formId);
                console.log("AI created. field");
    
                if (createdFields) {
                  console.log("Fields created.");
                } else {
                  console.error("fields not created");
                }
              } else {
                console.error("form id not provided.");
              }
            } else {
              console.log("Error creating AI. response not provided");
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
      <div className="text-center my-[5rem] text-2xl font-semibold">
        Create AI
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <h2 className="mb-10 text-center text-3xl font-extrabold text-gray-900">
            Create Form
          </h2>
          <label
            htmlFor="name"
            className="block text
-center font-medium text-gray-700"
          >
            Form Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter form name"
            className="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-center font-medium text-gray-700"
          >
            Form Description
          </label>
          <textarea
            id="description"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter form description"
            className="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="fields"
            className="block text-center font-medium text-gray-700"
          >
            Number of Fields
          </label>
          <input
            type="number"
            id="fields"
            name="fields"
            min={0}
            value={fields}
            onChange={(e) => setFields(parseInt(e.target.value))}
            placeholder="Enter number of fields"
            className="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
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

        {/* {response && (
      <div className="mt-6 text-center text-green-600">
        AI created with fields:{" "}
        {response.map((field) => field.name).join(", ")}
      </div>
    )} */}
      </form>
    </>
  );
}

// " [ {1:'What is the derivative of x^2 ?'}, {2:'Evaluate the integral of sin x dx'}, {3:'What is the graph of y = x^2 ?'} ]"

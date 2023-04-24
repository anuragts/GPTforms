import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import axios from "axios";

export default function CreateAI() {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [fields, setFields] = useState<number>(0);
  const [user_id, setUser_id] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [response, setResponse] = useState<string>("");

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
        console.log("Form created.");
      }
    } catch (error) {
      console.error("Error creating form: ", error);
    }

    try {
      if (!name || !description || !fields) {
        console.error("Fields not provided.");
      } else {
        const response = await axios.post("/api/AI/get", {
          name,
          description,
          no_fields: fields,
        });
        if (response) {
          console.log("AI created.");
          setResponse(response.data);
        } else {
          console.log("Error creating AI.");
        }
      }
    } catch (error) {
      console.error("Error creating AI: ", error);
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
          <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
            Name:
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your form name example - Maths exam form."
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
          <input
            id="description"
            type="text"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add more description. Example - Calculus Exam"
            className="shadow appearance-none border-rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="fields"
            className="block text-gray-700 font-bold mb-2"
          >
            Number of Fields:
          </label>
          <input
            id="fields"
            type="number"
            name="fields"
            min={0}
            value={fields}
            onChange={(e) => setFields(Number(e.target.value))}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            disabled={loading}
          >
            {loading ? "Creating..." : "Create"}
          </button>
        </div>
      </form>
      <div>
        {response}
      </div>
    </>
  );
}

// [ {1:'What is the derivative of x^2?'}, {2:'What is the integral of 5x+2 ?'} ]


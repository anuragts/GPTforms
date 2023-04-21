import { useState } from "react";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

interface FormProps {
  email: string;
}

export default function Form({ email }: FormProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  interface Props {
    email?: string;
    name?: string;
    description?: string;
  }

  const CreateForm = async (props: Props) => {
    const email = props?.email;
    const name = props?.name;
    const description = props?.description;

    const data = await axios.post("/api/User/getId", {
      email,
    });

    const user_id = data.data?.id;

    const response = await axios.post("/api/Form/createForm", {
      name,
      description,
      user_id,
    });

    if (response.status === 201) {
      return response.data;
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const form = await CreateForm({ name, description, email });

      if (form) {
        toast.success("Created form successfully!");
        router.push(`/form/${form?.id}`);
      } else {
        toast.error("Failed to create form.");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred.");
    }

    setLoading(false);
  };

  return (
    <div className="flex justify-center mt-[10%]">
      <form onSubmit={handleSubmit} className="w-full md:w-1/2 lg:w-1/3">
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
            placeholder="Enter your form name"
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
            onChange={(e) => setDescription(e.target.value)}
            placeholder="optional"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            {loading ? "Loading..." : "Create Form"}
          </button>
        </div>

        <ToastContainer />
      </form>
    </div>
  );
}

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
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name:</label>
      <input
        id="name"
        name="name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <label htmlFor="description">Description:</label>
      <textarea
        id="description"
        name="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />

      <button type="submit" disabled={loading}>
        {loading ? "Loading..." : "Create Form"}
      </button>

      <ToastContainer />
    </form>
  );
}

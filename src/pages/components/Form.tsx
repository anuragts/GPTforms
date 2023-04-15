import { useState } from "react";
import CreateForm from "@/pages/components/buttons/CreateForm";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface FormProps {
  email: string;
}

export default function Form({ email }: FormProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const success = await CreateForm({ name, email, description });

      if (success) {
        toast.success("Created form successfully!");
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

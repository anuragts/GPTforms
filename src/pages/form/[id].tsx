import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface FormProps {
  formId: string;
}

interface Field {
  name: string;
  description: string;
}

export default function FieldForm({ formId }: FormProps) {
  const router = useRouter();
  const { id } = router.query;
  const [fields, setFields] = useState<Field[]>([
    { name: "", description: "" },
  ]);
  const [loading, setLoading] = useState(false);

  const handleAddField = () => {
    setFields([...fields, { name: "", description: "" }]);
  };

  const handleFieldChange = (
    index: number,
    key: keyof Field,
    value: string
  ) => {
    setFields((prevFields) =>
      prevFields.map((field, i) =>
        i === index ? { ...field, [key]: value } : field
      )
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      await Promise.all(
        fields.map((field) =>
          axios.post("/api/Form/createFields", {
            name: field.name,
            description: field.description,
            form_id: id,
          })
        )
      );
      setFields([{ name: "", description: "" }]);
      toast.success("Field created successfully!");
    } catch (error) {
      console.error(error);
      toast.error("An error occurred.");
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      {fields.map((field, index) => (
        <div key={index}>
          <label htmlFor={`name-${index}`}>Name:</label>
          <input
            id={`name-${index}`}
            name={`name-${index}`}
            type="text"
            value={field.name}
            onChange={(e) => handleFieldChange(index, "name", e.target.value)}
            required
          />

          <label htmlFor={`description-${index}`}>Description:</label>
          <textarea
            id={`description-${index}`}
            name={`description-${index}`}
            value={field.description}
            onChange={(e) =>
              handleFieldChange(index, "description", e.target.value)
            }
          />
        </div>
      ))}

      <button type="submit" disabled={loading}>
        {loading ? "Loading..." : "Create Fields"}
      </button>

      <button type="button" onClick={handleAddField}>
        +
      </button>
    </form>
  );
}

import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import axios from "axios";

interface FormField {
  name: string;
  description: string;
}

interface FormData {
  [key: string]: string;
}

export default function FormResponse() {
  const router = useRouter();
  const { id } = router.query;
  const [formFields, setFormFields] = useState<FormField[]>([]);
  const [formData, setFormData] = useState<FormData>({});
  const [loading, setLoading] = useState(false);

  // Fetch form fields data from API
  useEffect(() => {
    if (id) {
      const fetchFormFields = async () => {
        const response = await axios.post("/api/Form/getData", { id });
        setFormFields(response.data);
      };
      fetchFormFields();
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Send form data to API
      const response = await axios.post("/api/Form/submitForm", {
        form_id: id,
        formData,
      });
      if (response.data == true) {
        console.log("Form submitted successfully");
      }
    } catch (error) {
      console.error(error);
      console.log("Failed to submit form");
    }
    setLoading(false);
  };

  return (
    <div>
      {formFields.map((field) => (
        <div key={field.name}>
          <label>{field.name}</label>
          <input
            type="text"
            name={field.name}
            value={formData[field.name] || ""}
            onChange={handleChange}
            required
          />
          <p>{field.description}</p>
        </div>
      ))}
      <button type="submit" disabled={loading} onClick={handleSubmit}>
        {loading ? "Loading..." : "Submit"}
      </button>
    </div>
  );
}

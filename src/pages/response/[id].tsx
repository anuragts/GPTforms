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
    <div className="flex flex-col items-center max-w-md mx-auto">
      {formFields.map((field) => (
        <div key={field.name} className="my-4">
          <label className="block font-bold mb-2">{field.name}</label>
          <input
            type="text"
            name={field.name}
            value={formData[field.name] || ""}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 rounded border border-gray-300 text-gray-800 focus:outline-none focus:border-blue-500"
          />
          <p className="text-gray-500 text-sm mt-1">{field.description}</p>
        </div>
      ))}
      <button
        type="submit"
        disabled={loading}
        onClick={handleSubmit}
        className="bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-blue-600 transition duration-300"
      >
        {loading ? "Loading..." : "Submit"}
      </button>
    </div>
  );
}

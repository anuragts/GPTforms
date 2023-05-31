import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useEffect } from "react";

type Field = {
  name: string;
  description: string;
}

export default function FieldForm() {
  const router = useRouter();
  const { id } = router.query;
  const [fields, setFields] = useState<Field[]>([
    { name: "", description: "" },
  ]);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [link, setLink] = useState("");

  useEffect(() => {
    if (id) {
      setLink(window.location.origin + "/response/" + id);
    }
  }, [id]);

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
      router.push("/response/" + id)
    } catch (error) {
      console.error(error);
      toast.error("An error occurred.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create Field
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form onSubmit={handleSubmit}>
            {fields.map((field, index) => (
              <div key={index}>
                <label
                  htmlFor={`name-${index}`}
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <div className="mt-1">
                  <input
                    id={`name-${index}`}
                    name={`name-${index}`}
                    type="text"
                    value={field.name}
                    onChange={(e) =>
                      handleFieldChange(index, "name", e.target.value)
                    }
                    required
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>

                <label
                  htmlFor={`description-${index}`}
                  className="block text-sm font-medium text-gray-700 mt-4"
                >
                  Description
                </label>
                <div className="mt-1">
                  <textarea
                    id={`description-${index}`}
                    name={`description-${index}`}
                    value={field.description}
                    onChange={(e) =>
                      handleFieldChange(index, "description", e.target.value)
                    }
                    rows={3}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>
            ))}
            <div className="flex justify-between items-center mt-4">
              <button
                type="button"
                onClick={handleAddField}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Add Field
              </button>

              {id && (
                <div className="flex items-center">
                  <p className="mr-2">Form link:</p>
                  <span className="bg-gray-100 px-2 py-1 rounded">{link}</span>
                  <CopyToClipboard text={link} onCopy={() => setCopied(true)}>
                    <button
                      type="button"
                      className="inline-flex items-center ml-2 px-3 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      {copied ? "Copied!" : "Copy"}
                    </button>
                  </CopyToClipboard>
                </div>
              )}
            </div>
            <div className="mt-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {loading ? "Creating..." : "Create"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

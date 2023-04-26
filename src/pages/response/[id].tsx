import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "@/components/Spinner";
import { toast } from "react-toastify";
import { RiShareBoxFill } from "react-icons/ri";
import "react-toastify/dist/ReactToastify.css";

interface FormField {
  name: string;
  description: string;
}

interface FormData {
  [key: string]: string;
}

interface FormDetails {
  name: string;
  description: string;
}

export default function FormResponse() {
  const router = useRouter();
  const { id } = router.query;
  const [formFields, setFormFields] = useState<FormField[]>([]);
  const [formData, setFormData] = useState<FormData>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [formDetails, setFormDetails] = useState<FormDetails>({
    name: "",
    description: "",
  });
  const [fetching, setFetching] = useState<boolean>(true);

  // Fetch form fields data from API
  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        try {
          setLoading(true);
          const [formFieldsRes, formDetailsRes] = await Promise.all([
            axios.post("/api/Form/getData", { id }),
            axios.post("/api/Form/currentForm", {
              formId: id,
            }),
          ]);
          setFormFields(formFieldsRes.data);
          setFormDetails(formDetailsRes.data[0]);
          setFetching(false);
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchData();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Send form data to API
      const response = await axios.post("/api/Form/submitForm", {
        form_id: id,
        formData,
      });
      if (response.data) {
        console.log("Form submitted successfully");
        toast.success("Form submitted successfully!");
        router.push(`/form/success`);
      }
    } catch (error) {
      console.error(error);
      console.log("Failed to submit form");
      toast.error("Failed to submit form");
    }
    setLoading(false);
  };

  const copy = () => {
    navigator.clipboard.writeText(window.location.href);
    window.alert("Link copied to clipboard!");
  }

  if (fetching) {
    return (
      <div className="flex justify-center mt-[30vh]">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center max-w-md mx-auto">
      <h2 className="text-4xl  mb-[1rem] mt-[8rem] md:[10rem] font-semibold">
        {formDetails.name}
      </h2>
      {/* <p className="text-gray-600">{formDetails.description}</p> */}
      <form onSubmit={handleSubmit} className="mt-[5rem]">
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
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-blue-600 transition duration-300"
        >
          {loading ? "Loading..." : "Submit"}
        </button>
        <br />
        <div onClick={copy} className="bg-indigo-500 cursor-pointer my-[2rem] w-[6rem] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-indigo-600 transition duration-300">
          <div className="flex">
            <div className="mr-2">Share</div>
            <div className="">
              <RiShareBoxFill />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

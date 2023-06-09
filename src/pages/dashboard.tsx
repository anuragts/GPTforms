import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import Spinner from "@/components/Spinner";
import { AiOutlineLink } from "react-icons/ai";

type Form = {
  id: number;
  name: string;
  description: string;
}

export default function FormsDashboard() {
  const [forms, setForms] = useState<Form[]>([]);
  const [userId, setUserId] = useState<number>();
  const [isLoading, setIsLoading] = useState<boolean>(true); // Add a loading state

  useEffect(() => {
    const email = localStorage.getItem("email");
    const fetchUserId = async () => {
      try {
        const response = await axios.post("/api/User/getId", { email: email });
        setUserId(response.data.id);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserId();
  }, []);

  useEffect(() => {
    if (userId) {
      const fetchForms = async () => {
        try {
          const response = await axios.post("/api/User/allForms", { userId });
          setForms(response.data);
          setIsLoading(false); // Set loading to false when the forms are loaded
        } catch (error) {
          console.error(error);
        }
      };

      fetchForms();
    }
  }, [userId]);

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold mb-8 text-center mt-[8rem] md:[10rem]">
        My Forms
      </h1>
      {isLoading ? ( // Render a loading spinner while the forms are being loaded
        <div className="flex justify-center items-center h-32">
          <Spinner />
        </div>
      ) : (
        forms.map((form) => (
          <div
            key={form.id}
            className="bg-white rounded-lg shadow-md p-4 mb-4 flex flex-col justify-between sm:flex-row sm:items-center"
          >
            <div className="sm:mr-4 mb-4 sm:mb-0">
              <h2 className="text-lg font-bold">{form.name}</h2>
              <p className="text-gray-500">{form.description}</p>
            </div>
            <div className="flex flex-row ">
              <div className="bg-indigo-500 mx-5 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">
                <Link href={`/response/${form.id}`}>
                <AiOutlineLink />
                </Link>
              </div>
              <div className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                <Link href={`/form/responses/${form.id}`}>Responses</Link>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

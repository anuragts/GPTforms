import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Spinner from "@/components/Spinner";

interface FormField {
  id: number;
  field_name: string;
  field_value: string;
  response_id: number;
}

interface FormResponse {
  id: number;
  createdAt: string;
  form_id: number;
  form_field: FormField[];
}

export default function FormResponses() {
  const [responses, setResponses] = useState<FormResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { id } = router.query;

  const formId = id;

  useEffect(() => {
    const fetchResponses = async () => {
      try {
        const response = await axios.post("/api/Form/allResponses",{formId});
        setResponses(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);   
      }
    };
    if (formId) {
      fetchResponses();
    }
  }, [formId]);

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl mt-[8rem] md:[10rem] font-bold mb-8">Form Responses</h1>
      {loading ? (
        <div className="flex justify-center items-center h-48">
            <Spinner/>
        </div>
      ) : (
        <>
          {responses.length === 0 ? (
            <p>No responses found for this form.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="table-auto border-collapse w-full">
                <thead>
                  <tr>
                    <th className="border border-gray-400 px-4 py-2">Response ID</th>
                    <th className="border border-gray-400 px-4 py-2">Created At</th>
                    {/* <th className="border border-gray-400 px-4 py-2">Field Name</th> */}
                    {responses[0].form_field.map((field) => (
                      <th key={field.id} className="border border-gray-400 px-4 py-2">
                        {field.field_name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {responses.map((response) => (
                    <tr key={response.id}>
                      <td className="border border-gray-400 px-4 py-2">{response.id}</td>
                      <td className="border border-gray-400 px-4 py-2">{response.createdAt}</td>
                      {response.form_field.map((field) => (
                        <td key={field.id} className="border border-gray-400 px-4 py-2">
                          {field.field_value}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  );
}

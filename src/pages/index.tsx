import { useAuth, useUser } from "@clerk/nextjs";
import { SignInButton } from "@clerk/nextjs";
import { useEffect } from "react";
import axios from "axios";
import Link from "next/link";

export default function Home() {
  const { isLoaded, userId } = useAuth();
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      const storedEmail = localStorage.getItem("email");
      if (storedEmail == user?.primaryEmailAddress?.emailAddress) {
      } else {
        const fetchUser = async () => {
          const response = await axios.post("/api/User/ifExists", {
            email: user?.primaryEmailAddress?.emailAddress,
          });
          if (response.data == false) {
            const createResponse = await axios.post("/api/User/createUser", {
              email: user?.primaryEmailAddress?.emailAddress,
              name: user?.fullName,
            });
          }
          localStorage.setItem(
            "email",
            user?.primaryEmailAddress?.emailAddress || ""
          );
        };
        fetchUser();
      }
    }
  }, [user]);

  if (!isLoaded) return <div>Loading...</div>;
  else {
    return (
      <main className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Forms with touch of AI</h1>
          {userId ? (
            <div className="bg-blue-500 text-white font-bold py-2 px-4 rounded">
            <Link href={"/form/create"}>Try Now.</Link>
            </div>
          ) : (
            <SignInButton />
          )}
        </div>
      </main>
    );
  }
}

import { useAuth, useUser } from "@clerk/nextjs";
import { SignInButton } from "@clerk/nextjs";
import { useEffect,FC } from "react";
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
          <h1 className="text-4xl font-bold mb-4"> Summarize Forms With <br />
          <span className="orange_gradient">GPTforms</span></h1>
          {userId ? (
            <div className="bg-blue-500 text-white font-bold py-2 px-4 rounded">
            <Link href={"/form/create"}>Try Now.</Link>
            </div>
          ) : (
            <SignInButton mode="modal">
            <button className="text-xl my-[2rem] text-blue-500 border-2 border-blue-500 rounded-xl py-4 px-8 hover:bg-blue-500 hover:text-white">Sign In to get Access.</button>
            </SignInButton>
          )}
        </div>
      </main>
    );
  }
}

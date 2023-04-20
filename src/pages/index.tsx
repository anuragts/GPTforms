import { SignInButton, SignOutButton } from "@clerk/nextjs";
import { useAuth, useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import axios from "axios";
import Form from "../components/Form";

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
              name :user?.fullName,
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
  else if (!userId) {
    return <SignInButton />;
  } else {
    return (
      <main className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Hello World from GPTforms</h1>
            <p className="text-xl mb-8">
              User: {user?.primaryEmailAddress?.emailAddress}
              </p>
              <Form email={`${user?.primaryEmailAddress?.emailAddress}`} />
            </div>
           <SignOutButton className="mt-8" />
      </main>
    );
  }
}

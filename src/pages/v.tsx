import { useEffect } from "react";
import { SignInButton, SignOutButton } from "@clerk/nextjs";
import { useAuth, useUser } from "@clerk/nextjs";
import { useSetLocal } from "@/utils/setLocal";

export default function Home() {
  const { isLoaded, userId, sessionId, getToken } = useAuth();
  const { user } = useUser();

  const saveEmailToLocal = (email: string) => {
    useSetLocal(email);
  };

  const exists = async (user: any) => {
    const response = await fetch("/api/User/ifExists", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: user?.primaryEmailAddress?.emailAddress as string,
      }),
    });
    const data = await response.json();
    return data;
  };

  useEffect(() => {
    // Check local storage for email
    const email = localStorage.getItem("email");
    if (email) {
      exists({ primaryEmailAddress: { emailAddress: email } }).then(
        (data) => {
          if (!data.exists) {
            // If email does not exist in DB, add it
            fetch("/api/User/create", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email,
              }),
            }).then(() => {
              console.log(`Email ${email} added to DB.`);
            });
          }
        }
      );
    }
  }, []);

  if (!isLoaded) return <div>Loading...</div>;
  else if (!userId) {
    return <SignInButton />;
  } else {
    const userEmail = user?.primaryEmailAddress?.emailAddress as string;
    saveEmailToLocal(userEmail);
    exists(user).then((data) => {
      if (!data.exists) {
        // If email does not exist in DB, add it
        fetch("/api/User/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: userEmail,
          }),
        }).then(() => {
          console.log(`Email ${userEmail} added to DB.`);
        });
      }
    });

    return (
      <>
        <main className="text-4xl flex justify-center mt-[40vh]">
          <div className="fon t-semibold">
            Hello World from GPTforms. User: {userEmail}
          </div>
          <SignOutButton />
        </main>
      </>
    );
  }
}

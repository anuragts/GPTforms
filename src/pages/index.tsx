// import Image from 'next/image'
// import styles from '../styles/Home.module.css'
import { SignInButton, SignOutButton } from "@clerk/nextjs";
import { useAuth, useUser } from "@clerk/nextjs";
import ifExists from "@/utils/ifExists";
import { setLocal } from "@/utils/setLocal";

export default async function Home() {
  const { isLoaded, userId, sessionId, getToken } = useAuth();
  const { user } = useUser();

  // const a:string = user?.primaryEmailAddress?.emailAddress

  // if()

  const mail = ifExists(user?.primaryEmailAddress?.emailAddress as string);
  if (!user) {
    return null;
  } else if ((await mail) == false) {
    const addProfile = async (user: any) => {
      const response = await fetch("/api/User/createUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: user?.fullName as string,
          email: user?.primaryEmailAddress?.emailAddress as string,
        }),
      });
    };
    addProfile(user);
    setLocal(user?.primaryEmailAddress?.emailAddress as string);

  }

  // console.log(user?.primaryEmailAddress?.emailAddress);

  if (!isLoaded) return <div>Loading...</div>;
  else if (!userId) {
    return <SignInButton />;
  } else {
    return (
      <>
        <main className="text-4xl flex justify-center mt-[40vh]">
          <div className="font-semibold">Hello World from GPTforms.</div>
          <SignOutButton />
        </main>
      </>
    );
  }
}

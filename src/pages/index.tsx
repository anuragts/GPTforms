// import Image from 'next/image'
// import styles from '../styles/Home.module.css'
import { SignInButton, SignOutButton } from "@clerk/nextjs";
import { useAuth, useUser } from "@clerk/nextjs";
import { setLocal } from "@/utils/setLocal";

export default   function Home() {
  const { isLoaded, userId, sessionId, getToken } = useAuth();
  const { user } = useUser();

  // const a:string = user?.primaryEmailAddress?.emailAddress

  // const exists = async (user:any) => {
  //   const response = await fetch("/api/User/ifExists", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       email: user?.primaryEmailAddress?.emailAddress as string,
  //     }),
  //   });
  //   const data = await response.json();
  //   return data;
  // }

  // const mail = exists(user);

  if (!isLoaded) return <div>Loading...</div>;
  else if (!userId) {
    return <SignInButton />;
  } else {
    return (
      <>
        <main className="text-4xl flex justify-center mt-[40vh]">
          <div className="fon t-semibold">Hello World from GPTforms.</div>
          <SignOutButton />
        </main>
      </>
    );
  }
}

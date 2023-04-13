// import Image from 'next/image'
// import styles from '../styles/Home.module.css'
import { SignInButton,SignOutButton } from "@clerk/nextjs";
import { useAuth } from "@clerk/nextjs";

export default function Home() {
  const { isLoaded, userId, sessionId, getToken } = useAuth();

  if (!isLoaded) return <div>Loading...</div>;
  else if (!userId) {
    return <SignInButton />;
  } else {
    return ( <>
      <main className="text-4xl flex justify-center mt-[40vh]">
        <div className="font-semibold">Hello World from GPTforms.</div>
        <SignOutButton/>
      </main>
    </>
    );
  }
}

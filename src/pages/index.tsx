import { SignInButton, SignOutButton } from "@clerk/nextjs";
import { useAuth, useUser } from "@clerk/nextjs";
import Form from "../components/Form";

export default function Home() {
  const { isLoaded, userId } = useAuth();
  const { user } = useUser();

  const userEmail = user?.primaryEmailAddress?.emailAddress as string;
  if (!isLoaded) return <div>Loading...</div>;
  else if (!userId) {
    return <SignInButton />;
  } else {
    return (
      <>
        <main className="text-4xl flex justify-center mt-[40vh]">
          <div className="fon t-semibold">
            Hello World from GPTforms. User: {userEmail}
            <Form email={`${userEmail}`} />
          </div>
          <SignOutButton />
        </main>
      </>
    );
  }
}
import Link from "next/link";
import { useAuth, useUser } from "@clerk/nextjs";
import { SignInButton, SignOutButton } from "@clerk/nextjs";
import Head from "next/head";

const Header = () => {
  const { isLoaded, userId } = useAuth();
  const { user } = useUser();
  return (
    <>
      <Head>
        <title>GPTforms</title>
        <meta name="description" content="Form with a touch of AI." />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <header className="bg-blue-500 text-white py-4 px-8 flex justify-between items-center">
        <div className="flex items-center">
          <div className="font-bold text-2xl">
            <Link href="/">GPTforms</Link>
          </div>
        </div>
        <div className="hidden md:flex items-center">
          {!!userId ? (
            <>
              <div className="mr-4 hover:text-gray-300 transition duration-300">
                <Link href="/dashboard">Dashboard</Link>
              </div>
              <div className="bg-red-600 text-white font-bold py-2 px-4 rounded-full hover:bg-red-500  transition duration-300">
                <SignOutButton />
              </div>
            </>
          ) : (
            <div className="bg-white text-blue-500 font-bold py-2 px-4 rounded-full hover:bg-blue-700 hover:text-white transition duration-300">
              <SignInButton />
            </div>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;

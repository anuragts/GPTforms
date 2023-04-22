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
              <div className="mx-8 hover:text-gray-300 transition duration-300 ">
                <Link href="/dashboard">
                  <div className="flex items-center">
                    <span className="mr-2 text-xl">Dashboard</span>
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                        />
                      </svg>
                    </span>
                  </div>
                </Link>
              </div>

              <div className=" text-xl bg-red-600 text-white font-bold py-2 px-4 rounded-full hover:bg-red-500  transition duration-300">
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

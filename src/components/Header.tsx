import Link from "next/link";
import { useAuth, useUser } from "@clerk/nextjs";
import { SignInButton, SignOutButton } from "@clerk/nextjs";
import Head from "next/head";
import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const navigation = [{ name: "Dashboard", href: "/dashboard" }];

const Header = () => {
  const { isLoaded, userId } = useAuth();
  const { user } = useUser();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <Head>
        <title>GPTforms</title>
        <meta name="description" content="Form with a touch of AI." />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      {/*  */}

      <header className="absolute inset-x-0 top-0  mb-[5rem]">
        <nav
          className="flex items-center justify-between p-6 lg:px-8"
          aria-label="Global"
        >
          <div className="flex lg:flex-1">
            <a href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">GPT forms</span>
              <img
                className="h-8 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt=""
              />
            </a>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          {!!userId ? (
            <div className="hidden lg:flex lg:gap-x-12">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-xl font-semibold leading-6 text-gray-900"
                >
                  {item.name}
                </a>
              ))}
            </div>
          ) : null}
          {!!userId ? (
            <div className="hidden lg:flex lg:flex-1 lg:justify-end">
              <div className="text-xl font-semibold cursor-pointer leading-6 text-red-600">
                <SignOutButton />
                <span aria-hidden="true">&rarr;</span>
              </div>
            </div>
          ) : (
            <div className="hidden lg:flex lg:flex-1 lg:justify-end">
              <SignInButton mode="modal">
                <div className="text-xl font-semibold leading-6 cursor-pointer text-gray-900">
                  Log in <span aria-hidden="true">&rarr;</span>
                </div>
              </SignInButton>
            </div>
          )}
        </nav>
        <Dialog
          as="div"
          className="lg:hidden"
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
        >
          <div className="fixed inset-0 z-50" />
          <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">GPT forms</span>
                <img
                  className="h-8 w-auto"
                  src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                  alt=""
                />
              </a>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                {!!userId ? (
                  <div className="space-y-2 py-6">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                ) : null}
                {!!userId ? (
                  <div className="py-6">
                    <div className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-red-600 hover:bg-gray-50">
                      <SignOutButton />
                    </div>
                  </div>
                ) : (
                  <div className="py-6">
                    <SignInButton mode="modal">
                      <div className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                        Log in
                      </div>
                    </SignInButton>
                  </div>
                )}
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </header>
    </>
  );
};

export default Header;

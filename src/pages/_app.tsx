import '@/styles/globals.css'
import type { AppProps } from "next/app";
import { Analytics } from "@vercel/analytics/react";
import { ClerkProvider } from "@clerk/nextjs";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <ClerkProvider {...pageProps}>
        <Component {...pageProps} />
      </ClerkProvider>
      <Analytics />
    </>
  );
}

export default MyApp;

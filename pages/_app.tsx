import { ClerkProvider, SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import type { AppProps } from "next/app";
import "../styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ClerkProvider >
      <div className="min-h-screen bg-[#F8F5F2]">
        <SignedIn>
          <header className="bg-[#213D34] text-white py-4 px-6">
            <div className="container mx-auto flex justify-between items-center">
              <h1 className="text-2xl font-serif font-bold">Chef's Master Recipes</h1>
              <UserButton afterSignOutUrl="/" />
            </div>
          </header>
        </SignedIn>

        <SignedOut>
          <header className="bg-[#213D34] text-white py-4 px-6 text-center">
            <h1 className="text-2xl font-serif font-bold">Chef's Master Recipes</h1>
          </header>
        </SignedOut>

        <main>
          <Component {...pageProps} />
        </main>
      </div>
    </ClerkProvider>
  );
}

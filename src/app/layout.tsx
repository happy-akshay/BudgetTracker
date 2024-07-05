import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import Provider from "@/lib/Provider";
import { Toaster } from "@/components/ui/sonner";
import Header from "@/components/Header/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Budget Tracker",
  description: "code with akki",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <Provider>
            {/* <SignedOut>
      <SignInButton />
    </SignedOut>
    <SignedIn>
      <UserButton />
    </SignedIn> */}

            <div className="bg-[#004DD7] h-full w-full">
              {children}
              <Toaster />
            </div>
          </Provider>
        </body>
      </html>
    </ClerkProvider>
  );
}

// <ClerkProvider publishableKey="pk_test_dmlhYmxlLWxlZWNoLTU2LmNsZXJrLmFjY291bnRzLmRldiQ">
// <html lang="en">
//   <body className={inter.className}>
//     <div className="bg-[#004DD7] h-screen w-full">
//     {children}
//     </div>
//     </body>
// </html>
// </ClerkProvider>

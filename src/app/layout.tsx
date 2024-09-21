import "@/styles/globals.css";
import { Analytics } from '@vercel/analytics/react';

import { headers } from "next/headers";

import { TRPCReactProvider } from "@/trpc/react";
import { exo2, inter } from "@/styles/fonts";

import DefaultBackground from "./_components/DefaultBackgroundComponent";
import BreakpointLayout from "@/hooks/useBreakpointLayout";
import IsNotDesktopComponent from "./_components/isnotdesktop/IsNotDesktopComponent";
import { auth } from "@/server/auth";


export const metadata = {
  title: "OSU HUB ",
  description: "OSU HUB - for the huge pp",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function RootLayout({
  children,

}: {
  children: React.ReactNode;
}) {

  const session = await auth();

  return (

    <html lang="en">
      <link
        rel="icon"
        href="/icon?<generated>"
        type="image/<generated>"
        sizes="<generated>"
      />
      <body
        className={`relative font-sans ${exo2.variable}${inter.variable} flex h-screen w-screen flex-row bg-slate-800 -z-20 overflow-hidden `}      >
        <DefaultBackground />
        <TRPCReactProvider headers={headers()}>
          <BreakpointLayout breakpoint={1000} breakpointComponent={<IsNotDesktopComponent username={session?.user.name} />}>
            {children}
          </BreakpointLayout>
        </TRPCReactProvider>
        <Analytics />
      </body>
    </html>
  );
}

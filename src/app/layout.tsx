import "@/styles/globals.css";
import { Analytics } from '@vercel/analytics/react';

import { headers } from "next/headers";

import { TRPCReactProvider } from "@/trpc/react";
import { exo2, inter } from "@/styles/fonts";

import DefaultBackground from "./_components/DefaultBackgroundComponent";
import BreakpointLayout from "@/hooks/useBreakpointLayout";
import IsNotDesktopComponent from "./_components/isnotdesktop/IsNotDesktopComponent";
import { auth } from "@/server/auth";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: 'OSU HUB - for the huge pp - Discover Anime Connections & Filter Beatmapsets by PP Score',
  description: 'Explore anime song connections on osu! through Osu Hub. Track individual scores, get personalized beatmap recommendations, filter beatmapsets by performance points (pp), and discover AniList references!',
  keywords: ['osu!', 'anime beatmap', 'AniList connections', 'personalized beatmap recommendations', 'osu hub', 'performance points tracking', 'anime songs osu', 'filter beatmapsets by pp', 'pp score filter osu'],
  openGraph: {
    title: 'Osu Hub - Discover Anime Connections & Filter Beatmapsets by PP Score',
    description: 'Filter osu! beatmapsets by performance points (pp), track your scores, get custom beatmap recommendations, and discover your favorite anime songs with AniList references on Osu Hub!',
    url: 'https://osu-hub.com',
    images: [
      {
        url: 'https://osu-hub.com/assets/og-image.png', // Replace with your actual image URL
        alt: 'Osu Hub - Filter beatmapsets by pp score',
      },
    ],
  },
  twitter: {
    title: 'Discover Anime Connections & Filter Beatmapsets by PP Score on Osu Hub!',
    description: 'Filter osu! beatmapsets by performance points (pp), track your scores, and explore anime connections with AniList references on Osu Hub.',
    card: 'summary_large_image',
    images: [
      {
        url: 'https://osu-hub.com/assets/twitter-image.png', // Replace with your actual image URL
        alt: 'Osu Hub - Twitter share image for pp filtering feature',
      },
    ],
  },
}
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

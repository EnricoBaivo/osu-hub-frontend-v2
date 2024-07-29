
import { UserRole, linksData } from "@/static-data/linkData";
import Sidebar from "@/app/_components/SidebarT/SidebarT";
import { auth } from "@/server/auth";
import AudioProvider from "@/hooks/useAudio";
import { env } from "@/env.mjs";
import { redirect } from "next/navigation";



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
  return (<>
    {session && ((session.user.is_admin ?? false) || (session.user.is_alpha_tester ?? false) || (session.user.is_alpha_tester ?? false)) &&
      <Sidebar userRole={session.user.is_admin ? UserRole.admin : UserRole.user} userData={session.user} linksData={linksData} />}
    <AudioProvider >
      {children}
    </AudioProvider>
  </>

  );
}

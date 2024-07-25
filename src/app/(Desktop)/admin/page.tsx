import { env } from "@/env.mjs";
import { auth } from "@/server/auth";
import { redirect } from "next/navigation";
import Users from "./Users";
import { Headline } from "@/app/_components/UI/Typography/Headline";
import { api } from "@/trpc/server";


const AdminPage = async () => {
    const session = await auth();
    if (!session || !session.user.is_admin) return redirect(env.TO_LOGIN_PAGE);
    const toalUsers = await api.user.getTotalUsers.query();
    return (
        <div className="flex h-full flex-col w-full pl-12">
            <Headline headlineNumber={1}>Admin Page</Headline>
            <Users totalUsers={toalUsers} />
        </div>
    )
}

export default AdminPage
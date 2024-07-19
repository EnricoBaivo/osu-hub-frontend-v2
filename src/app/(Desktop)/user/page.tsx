import { redirect } from "next/navigation";

export default function DashboardLayout() {
  redirect("/user/me");
}

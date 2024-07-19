import { SiHomebridge } from "react-icons/si";
import { CgPerformance, CgSearch } from "react-icons/cg";
import { MdAdminPanelSettings } from "react-icons/md";
import { FaRankingStar } from "react-icons/fa6";
import { HiUser, HiUserGroup } from "react-icons/hi2";

export enum UserRole {
  user = "user",
  admin = "admin",
}
export interface LinkData {
  name: string;
  href: string;
  userRoles: UserRole[];
  icon: JSX.Element;
}

export const linksData = [
  {
    name: "My Profile",
    href: "/user/me",
    userRoles: [UserRole.user, UserRole.admin],
    icon: <HiUser />,
  }, {
    name: "My Friends",
    href: "/friends",
    userRoles: [UserRole.user, UserRole.admin],
    icon: <HiUserGroup />

  },
  {
    name: "My Scores",
    href: "/scores",
    userRoles: [UserRole.user, UserRole.admin],
    icon: <CgPerformance />,
  },
  {
    name: "Scores",
    href: "/ranking",
    userRoles: [UserRole.user, UserRole.admin],
    icon: <FaRankingStar />,
  },
  {
    name: "Get THE PP !",
    href: "/BeatmapRecommendations",
    userRoles: [UserRole.user, UserRole.admin],
    icon: <CgSearch />,
  },
  {
    name: "Admin",
    href: "/admin",
    userRoles: [UserRole.admin],
    icon: <MdAdminPanelSettings className="menuIcons" />,
  },
];

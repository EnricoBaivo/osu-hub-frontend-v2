"use client";
import type { User } from "next-auth";
import Image from "next/image";

import { motion } from "framer-motion";
import React, { useEffect } from "react";
import ProfileButtonWithLogout from "./ProfileButtonWithLogout";
import SideLink from "./SideLinkT";
import Link from "next/link";
import type { LinkData, UserRole } from "@/static-data/linkData";
import { usePathname } from "next/navigation";
import { useDimensions } from "@/hooks/useDimensions";

const Sidebar = ({
  userData,
  linksData,
  userRole
}: {
  userData: User;
  linksData: LinkData[];
  userRole: UserRole;
}) => {
  const [isHoveringAside, setIsHoveringAside] = React.useState(false);
  const [isTouching, setIsTouching] = React.useState(false);
  const [isHoveringOsuLogo, setIsHoveringOsuLogo] = React.useState(false);


  useEffect(() => {
    if (isTouching) {
      setIsHoveringAside(true);
    } else setIsHoveringAside(false);
  }, [isTouching]);


  return (
    <motion.aside
      className="relative h-full w-[112px]  text-white "
      onMouseEnter={() => setIsHoveringAside(true)}
      onMouseLeave={() => !isTouching && setIsHoveringAside(false)}
      onTouchStart={() => setIsTouching(!isTouching)}
    >
      <motion.div
        animate={{
          width: isHoveringAside ? 600 : 112,
          transition: { duration: 0.7 },
        }} className="flex z-50 font-exo flex-col absolute h-full w-full justify-between ring-offset-osuhub-dark-ice-grey backdrop-blur-3xl border-r-2 border-slate-700 drop-shadow-md p-4">
        <Link
          onMouseEnter={() => setIsHoveringOsuLogo(true)}
          onMouseLeave={() => !isTouching && setIsHoveringOsuLogo(false)}
          href={"/"} about="Home" className="flex w-full flex-row items-center justify-start gap-4 text-slate-50">
          <Image
            unoptimized
            src="https://osu.ppy.sh/assets/images/osu-logo-white.59d385da.svg"
            alt="Osu Logo"
            width={80}
            height={80}
          />
          {isHoveringAside && !isHoveringOsuLogo && (
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, x: isHoveringOsuLogo ? "-200%" : 0 }}
              className="text-2xl "
            >
              OsuHub
            </motion.h1>

          )}
          {isHoveringAside && isHoveringOsuLogo && < motion.h1
            initial={{ opacity: 0, x: "200%" }}
            animate={{ opacity: 1, x: isHoveringOsuLogo ? 0 : "-200%" }}
            className="text-xl  "
          >
            Back to Home

          </motion.h1>}
        </Link>
        <div className="flex flex-col items-start justify-evenly gap-4">
          {linksData.map((link) => (
            link.userRoles.includes(userRole) && <SideLink parentHover={isHoveringAside} key={link.href} data={link} />
          ))}
        </div>


        {/* Profile Button BUTTON */}
        <ProfileButtonWithLogout
          parentHover={isHoveringAside}
          name={userData.name}
          image={userData.image}
        />
      </motion.div>
    </motion.aside >
  );
};
export default Sidebar;

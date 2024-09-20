"use client";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { AiOutlineLogout } from "react-icons/ai";
import { signOut } from "next-auth/react"
import Link from "next/link";
import { FaDiscord } from "react-icons/fa6";
import { env } from "@/env.mjs";
import KofiWidget from "../UI/Kofi/KofiWidget";
import GithubLink from "../UI/Github/GithubLink";
const MotionLink = motion(Link);
const MotionImage = motion(Image);
const ProfileButtonWithLogout = ({
  name,
  image,
  parentHover,
}: {
  name: string | null | undefined;
  image: string | null | undefined;
  parentHover: boolean;
}) => {
  const [ishoveringAvatar, setHoveringAvatar] = React.useState(false);
  return (
    <motion.div className="row container flex h-fit  max-w-full items-center text-white ">
      <AnimatePresence >
        {parentHover &&
          <motion.div initial={{ display: "none", width: "0%", opacity: 0 }} animate={{ width: "100%", display: "flex", transition: { delay: 0.25 }, opacity: 1 }} exit={{ width: "0%", opacity: 0 }} className="flex w-full flex-row items-end justify-between">
            <div className="flex flex-col w-full gap-4 ">
            <KofiWidget />
            <GithubLink />

              <div className="flex h-full w-full items-center justify-between ">
                <MotionLink animate={{ transition: { delay: 0.4 }, opacity: parentHover ? 1 : 0 }} target="_blank" className="w-72 h-20 gap-1 uppercase font-black my-2 hover:scale-110 transition-all flex flex-row items-center justify-around px-4 py-2 text-indigo-500 hover:text-yellow-500 bg-osuhub-dark-ice-blue border rounded-md backdrop-blur-2xl " href={env.NEXT_PUBLIC_DISCORD_INVITE_LINK}>
                  <span className="text-4xl">
                    <FaDiscord />
                  </span>
                  <div className="flex flex-col ">
                    <span className="text-white">{name}</span>
                    <span className="text-osuhub-yellow text-2xl" >Improve us</span>
                  </div>

                </MotionLink>
                {/* Profile Picture */}
                <div onMouseEnter={() => setHoveringAvatar(true)} onMouseLeave={() => setHoveringAvatar(false)} className="w-20 h-20 flex items-center justify-center rounded-full hover:border hover:border-osuhub-gray overflow-hidden ">
                  <MotionImage
                    animate={ishoveringAvatar ? { scale: 0.95, opacity: 0.5 } : { scale: 1, opacity: 1 }}
                    alt={"OsuHub " + name + " image"}
                    src={image ?? "/vercel.svg"}
                    className="rounded-full absolute "
                    width={80}
                    height={80}
                    priority
                  />
                  {ishoveringAvatar &&
                    <button type="button" className="flex items-center justify-around bg-osuhub-dark-ice-blue z-40 w-full h-full"
                      onClick={() => signOut()}
                    >
                      <AiOutlineLogout className="text-3xl" />
                    </button>}

                </div>
              </div>

            </div>
          </motion.div>

        }


      </AnimatePresence>
    </motion.div >
  );
};
export default ProfileButtonWithLogout;

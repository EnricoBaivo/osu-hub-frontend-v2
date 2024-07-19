import Link from "next/link";
import { motion } from "framer-motion";
import clsx from "clsx";
export interface LinkData {
  name: string;
  href: string;
  icon: React.ReactNode;
}
const SideLink = ({
  data,
  parentHover,
}: {
  data: LinkData;
  parentHover: boolean;
}) => {
  return (
    <Link
      href={data.href}
      className="relative flex w-full items-center rounded-full backdrop-blur-3xl bg-osuhub-dark-ice-grey transition-colors  hover:bg-osuhub-dark-ice-blue hover:border hover:border-slate-700"
    >
      <div className={clsx(
        { "grow": parentHover },
        { "shrink": !parentHover },
        "xl:w-min-20 md:w-min-12 flex  flex-row  items-center justify-center md:h-12 xl:h-12")}>
        <div className="flex w-20 h-20 text-4xl items-center justify-center  md:h-12 md:w-12 xl:h-20  xl:w-20">
          {data.icon}
        </div>
        {parentHover && (
          <motion.div initial={{ opacity: 0 }} animate={{
            opacity: 1, transition: {
              delay: 0.2
            }
          }} exit={{ opacity: 0 }} className=" flex w-full h-10 text-2xl tracking-wider font-exo font-semibold  items-center pl-8">
            {data.name}

          </motion.div>)}
      </div>
    </Link>
  );
};

export default SideLink;

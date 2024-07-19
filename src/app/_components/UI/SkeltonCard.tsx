import clsx from "clsx";

export const SkeletonCard = ({ isLoading = true, info }: {
  info?: {
    headline?: string | React.ReactNode;
    subheadline?: string | React.ReactNode;
    link?: string | React.ReactNode;
    image?: string | React.ReactNode;
  }, isLoading?: boolean
}) => (
  <div
    className={clsx(" font-exo w-[900px] h-[550px] rounded-2xl bg-slate-950 p-4", {
      " relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.5s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent":
        isLoading,
    })}
  >
    <div className="space-y-3">
      <div className={clsx(" rounded-lg bg-slate-700",
        info?.headline ? "py-2 px-4" : "h-14"
      )
      } >
        {info?.headline}
      </div>
      <div className={clsx("w-11/12 rounded-lg bg-slate-700", info && info.link ? "py-2 px-4" : "h-3 ")
      } >
        {info?.subheadline}
      </div>
      <div className={clsx("w-8/12 rounded-lg bg-slate-700", info && info.link ? "hover:tracking-wider hover:scale-105 transition-all origin-left py-2 px-4 text-indigo-500" : "h-3")
      } >
        {info?.link}
      </div>
    </div >
  </div >

);

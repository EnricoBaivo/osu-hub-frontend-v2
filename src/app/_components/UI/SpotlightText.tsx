import clsx from "clsx";

interface SpotlightTextProps {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  className?: string;
}

const SpotlightLightText = ({ title, subtitle, className ="text-2xl" }: SpotlightTextProps) => {
  return (
    <div className="font-exo flex flex-col items-start justify-center">
      <span className={clsx("flex items-center text-center  font-black uppercase text-yellow-400",className)}>
        {title}
      </span>
      {subtitle && <div className="text-base text-center font-semibold uppercase text-white">
        {subtitle}
      </div>}
    </div>
  );
};

export default SpotlightLightText;

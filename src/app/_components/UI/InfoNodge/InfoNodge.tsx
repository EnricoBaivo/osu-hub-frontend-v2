interface Props {
  children: React.ReactNode;
}

const InfoNodge = ({ children }: Props) => {
  return (
    <div
      className={`font-exo flex w-fit	flex-col items-center justify-center rounded-4xl bg-osuhub-dark-ice-blue backdrop-blur-lg px-6 py-1.5  text-base font-extrabold uppercase tracking-wider text-white  shadow transition-transform hover:scale-110  `}
    >
      {children}
    </div>
  );
};

export default InfoNodge;

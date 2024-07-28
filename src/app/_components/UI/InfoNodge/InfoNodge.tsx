interface Props {
  children: React.ReactNode;
}

const InfoNodge = ({ children }: Props) => {
  return (
    <div
      className={`font-exo flex w-fit	flex-col items-center justify-center rounded-3xl bg-osuhub-dark-ice-blue backdrop-blur-lg px-4 py-1.5  text-sm font-extrabold uppercase tracking-wider text-white shadow transition-transform hover:scale-110`}
    >
      {children}
    </div>
  );
};

export default InfoNodge;

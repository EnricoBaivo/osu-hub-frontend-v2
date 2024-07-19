import Link from "next/link";

interface Props {
    title: string;
}
const Footer = ({ title }: Props) => {
    return (
        <footer
            className="font-exo mt-24 p-4 text-center bg-osuhub-dark-ice-grey lg:text-left w-full">
            <div className=" text-center text-gray-400">
                © 2023 Made By Dr.Sins, welcome to new contributor <Link href="https://osu.ppy.sh/users/29912986">Deceit</Link>
            </div>
            <a
                className="text-gray-400"
                href="https://osu.ppy.sh/home"
            > osu!HUB is not affiliated or sponsored by osu! or ppy
            </a>
        </footer>
    );
};

export default Footer;

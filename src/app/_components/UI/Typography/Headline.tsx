import clsx from "clsx";
import type { ReactNode } from "react"


export const Headline = ({ headlineNumber = 1, classNames= "", children }: { headlineNumber?: number, classNames?: string, children: ReactNode }) => {
    const TagName = `h${headlineNumber}` as keyof JSX.IntrinsicElements;
    let ngClass = "";
    switch (headlineNumber) {
        case (1):
            ngClass = "text-6xl  font-bold text-white pt-12";
            break;
        case (2):
            ngClass = "text-3xl font-bold text-yellow-500  pt-8";
            break;
        case (3):
            ngClass = "text-2xl font-bold text-gray-950  pt-6";
            break;
        case (4):
            ngClass = "text-xl font-bold text-gray-950  pt-4";
            break;
    }

    return (<TagName className={clsx(ngClass, classNames)}>
        {children}
    </TagName>)
}
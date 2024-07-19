"use client";

import clsx from "clsx";
import React from "react";


interface ButtonNodgeProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children?: React.ReactNode;
    className?: string;
    isActive?: boolean;
}
const ButtonNodge = React.forwardRef<HTMLButtonElement, ButtonNodgeProps>(
    ({
        children,
        className = "",
        isActive = false,
        ...rest
    }, ref) => {


        return (
            <button
                ref={ref}
                className={clsx(
                    `font-exo text-xl shadow-2xl border hover:border-slate-500  border-slate-700    uppercase bg-osuhub-dark-ice-blue backdrop-blur-3xl hover:bg-slate-700 text-white text-center align-middle font-semibold py-2 px-4 rounded-xl `,
                    className,
                    { "bg-osuhub-gray hover:border-slate-500 ": isActive }

                )}
                {...rest}

            >
                {children}
            </button >
        );
    },
);


ButtonNodge.displayName = "ButtonNodge";
export default ButtonNodge;


"use client";
import React from 'react';



const HoverContext = React.createContext<boolean>(false);
// new line custom hook
export const useContainerIsHovered = () => React.useContext(HoverContext)

export default function HoverContainerProvider({ children, className }: { children: React.ReactNode, className: string }) {
    const [containerIsHovered, setContainerIsHovered] = React.useState<boolean>(false)


    return <HoverContext.Provider value={containerIsHovered}>
        <div className={className} onMouseEnter={() => setContainerIsHovered(true)} onMouseLeave={() => setContainerIsHovered(false)} >
            {children}
        </div>

    </HoverContext.Provider >
}

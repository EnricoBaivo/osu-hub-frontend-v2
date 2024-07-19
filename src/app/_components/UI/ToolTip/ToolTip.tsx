import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';

interface ToolTipProps {
    title: string;
    margin?: number;
    description?: string;
    children: React.ReactNode;
}

const ToolTip: React.FC<ToolTipProps> = ({ title, margin = 10, description, children }) => {
    const [above, setAbove] = useState(1);
    const [isHovering, setIsHovering] = useState(false);
    const [shouldAnimate, setShouldAnimate] = useState(false);
    const [moveTo, setMoveTo] = useState(0);
    const toolTipRef = useRef<HTMLDivElement | null>(null);
    const hoverRef = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        let hoverTimeout: NodeJS.Timeout | null = null;
        if (isHovering) {
            hoverTimeout = setTimeout(() => {
                setShouldAnimate(true);
            }, 1000); // 2000 milliseconds = 2 seconds
        } else {
            if (hoverTimeout)
                clearTimeout(hoverTimeout);
            setShouldAnimate(false);
        }


        return () => {
            if (hoverTimeout)
                clearTimeout(hoverTimeout);

        };
    }, [isHovering]);

    useEffect(() => {
        const handleResize = () => {
            if (!hoverRef.current || !toolTipRef.current)
                return;
            const hoverElementBounding = hoverRef.current.getBoundingClientRect()
            const toolTipRefBounding = toolTipRef.current.getBoundingClientRect()
            const distanceFromTop = hoverElementBounding.top;
            if (distanceFromTop > hoverElementBounding.height + margin) {
                setAbove(-1);
            }
            setMoveTo((above * toolTipRefBounding.height) + (above * margin));
        };
        // Add a window resize event listener
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        }

    }, [hoverRef, shouldAnimate, margin, above]);


    return (
        <>
            <AnimatePresence>
                {isHovering && (
                    <motion.div
                        ref={toolTipRef}
                        initial={{
                            position: "absolute",
                            transformOrigin: "top",
                            x: 0,
                            y: 0,
                            opacity: 0,

                        }}
                        animate={shouldAnimate ? {
                            opacity: 1, y: moveTo,


                        } : {}}

                        exit={{
                            opacity: 0,

                        }}
                        transition={{
                            type: "spring",
                            damping: 10,
                            stiffness: 100,
                            mass: 0.5,
                            bounce: 0.5,
                            duration: 0.5,
                        }}
                        className=" bg-white border border-gray-300 p-4"
                    >

                        <div className="font-exo text-md font-bold ">{title}</div>
                        {description && <p>{description} {moveTo}</p>}
                        <div className={
                            clsx("absolute w-3 h-3 bg-white transform rotate-45  left-1/2 translate-x-[-50%]",
                                { "bottom-[-5px]": above < 0 },
                                { "top-[-5px]": above > 0 })}></div>

                    </motion.div>
                )}
            </AnimatePresence>
            <div
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                ref={hoverRef}
            >
                {children}
            </div>
        </>
    );
};

export default ToolTip;

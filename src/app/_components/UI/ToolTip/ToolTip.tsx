import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';
import { useDimensions } from '@/hooks/useDimensions';

interface ToolTipProps {

    margin?: number;
    children: React.ReactNode;
    DisplayElement: React.ReactNode;
}

const ToolTip: React.FC<ToolTipProps> = ({ DisplayElement, margin = 10, children }) => {
    const [above, setAbove] = useState(true);
    const [isHovering, setIsHovering] = useState(false);
    const [shouldAnimate, setShouldAnimate] = useState(false);
    const [moveTo, setMoveTo] = useState({ x: 0, y: 0 });
    const toolTipRef = useRef<HTMLDivElement | null>(null);
    const hoverRef = useRef<HTMLDivElement | null>(null);
    const { width } = useDimensions();
    useEffect(() => {
        let hoverTimeout: NodeJS.Timeout | null = null;
        if (isHovering) {
            hoverTimeout = setTimeout(() => {
                setShouldAnimate(true);
            }, 1000);
        } else {
            if (hoverTimeout) clearTimeout(hoverTimeout);
            setShouldAnimate(false);
        }
        return () => {
            if (hoverTimeout) clearTimeout(hoverTimeout);
        };
    }, [isHovering]);

    useEffect(() => {

        if (!hoverRef.current || !toolTipRef.current) return;

        const hoverElementBounding = hoverRef.current.getBoundingClientRect();
        const toolTipRefBounding = toolTipRef.current.getBoundingClientRect();
        const distanceFromTop = hoverElementBounding.top;
        const distanceFromLeft = hoverElementBounding.left;
        const widthOfToolTipElement = toolTipRefBounding.width;
        const widthOfHoverElement = hoverElementBounding.width;

        if (distanceFromTop > hoverElementBounding.height + margin) {
            setAbove(false);
        } else {
            setAbove(true);
        }
        const offsetY = above ? (hoverElementBounding.height + margin) : -toolTipRefBounding.height - 5 - margin;

        const offsetX = ((widthOfHoverElement / 2 - widthOfToolTipElement / 2));
        const move = { x: offsetX, y: offsetY };
        setMoveTo({ ...move });

    }, [width, margin, above, isHovering]);

    return (<>
        <div
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            ref={hoverRef}
            className='relative'
        >
            {DisplayElement}
            <AnimatePresence>
                {isHovering && (
                    <motion.div
                        ref={toolTipRef}
                        initial={{
                            position: "absolute",
                            transformOrigin: "center",
                            opacity: 0,

                        }}
                        animate={shouldAnimate ? { opacity: 1 } : {}}
                        style={{ transform: `translate(${(moveTo.x)}px, ${moveTo.y}px)` }}
                        exit={{ opacity: 0 }}
                        transition={{
                            type: "spring",
                            damping: 10,
                            stiffness: 100,
                            mass: 0.5,
                            bounce: 0.5,
                            duration: 0.5,
                        }}
                        className="bg-osuhub-dark-ice-blue border backdrop-blur-3xl border-gray-300 p-4 w-56 top-0 left-0 rounded-xl z-50"
                    >

                        {children}

                        <div
                            className={clsx(
                                "absolute w-3 h-3 bg-white transform rotate-45 left-1/2 translate-x-[-50%]",
                                {
                                    "bottom-[-5px]": !above,
                                    "top-[-5px]": above,
                                }
                            )}
                        ></div>
                    </motion.div>
                )}
            </AnimatePresence>

        </div>

    </>
    );
};

export default ToolTip;

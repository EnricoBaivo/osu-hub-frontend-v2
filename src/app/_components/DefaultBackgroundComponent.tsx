"use client"
import Image from 'next/image'
import React, { useEffect } from 'react'
import { motion, transform, useMotionValue, useSpring, useVelocity } from 'framer-motion'


export default function DefaultBackground() {
    const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });
    const x = useMotionValue<number>(0)
    const xs = useSpring(x, { stiffness: 30, damping: 9 })
    const y = useMotionValue<number>(0)
    const ys = useSpring(y, { stiffness: 30, damping: 9 })



    const container = React.useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!container.current) return;
        const handleMouseMove = (e: MouseEvent) => {

            setMousePosition({ x: e.clientX, y: e.clientY });

        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [container]);

    useEffect(() => {

        if (container.current) {
            const rect = container.current.getBoundingClientRect();
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const offsetX = (mousePosition.x - rect.left - centerX) * 0.04;
            const offsetY = (mousePosition.y - rect.top - centerY) * 0.04;

            x.set(offsetX);
            y.set(offsetY);
        }
    }, [container, mousePosition])
    return <div className='absolute w-full h-full overflow-hidden -z-10'>
        <motion.div ref={container} style={{
            x: xs,
            y: ys,
        }} className='absolute osu-pattern top-0 left-0 w-[105%] h-[105%] -z-10' />
    </div>
}

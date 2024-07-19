"use client";
import { motion } from "framer-motion";
import ButtonNodge from "./ButtonNodge";
import React from "react";
export default function TestButtonNodge() {
    const MotionComponent = motion(ButtonNodge)
    const handleClick = () => {
        console.log("click")
    }
    return <div className="flex flex-col space-y-4">
        <MotionComponent onClick={handleClick} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}  >
            <div>test</div>
        </MotionComponent>
    </div>;
}


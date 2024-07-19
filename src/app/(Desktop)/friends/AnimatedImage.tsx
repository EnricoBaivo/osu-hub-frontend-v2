"use client"
import { motion } from 'framer-motion'
import Image, { ImageProps } from 'next/image'
import React from 'react'

export default function AnimatedImage(props: ImageProps) {
    const MotionImage = motion(Image)
    return (
        <MotionImage
            whileHover={{ scale: 0.8 }}
            src={props.src}
            alt={props.alt}
            className={props.className}
            width={props.width}
            height={props.height}
        />
    )
}

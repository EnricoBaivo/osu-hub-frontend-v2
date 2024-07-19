
"use client"
import Image from "next/image";
import backgrounds_list from "@/static-data/backgroundOsuHubImages.json";
import { useEffect, useState } from "react";
import { motion, useAnimate } from "framer-motion";


function shuffleArray<T>(arr: T[]): T[] {
    const shuffledArray = [...arr];

    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));

        // Swap elements at i and j
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j] as T, shuffledArray[i] as T];
    }

    return shuffledArray;
}

const RandomOsuHubBackground = () => {
    const backgroundList = shuffleArray(backgrounds_list)
    const [randomBackground, setRandomBackgroundState] = useState({ prev: backgroundList[0] as string, next: backgroundList[1] as string })

    const [scope, animate] = useAnimate()
    const [image, setImage] = useState<string>(backgroundList[0] as string)
    useEffect(() => {
        if (!scope.current) return
        console.log(randomBackground)
        animate("img", { opacity: 0 }, { duration: 0.65 }).then(() => {
            setImage(randomBackground?.prev)
        }).then(() => {
            animate("img", { opacity: 1 }, { delay: 0.25, duration: 0.45 })
        })

    }, [randomBackground])

    useEffect(() => {
        console.log(image)
    }, [image])
    useEffect(() => {
        function handleRandomBackgroundChange() {
            setRandomBackgroundState({ prev: randomBackground?.next, next: backgroundList[Math.floor(Math.random() * backgroundList.length)] as string })
        }
        const interval = setInterval(handleRandomBackgroundChange, 10000)
        return () => clearInterval(interval)
    }, [backgroundList, randomBackground])

    function handleImageChange() {
        setRandomBackgroundState({ prev: randomBackground?.next, next: backgroundList[Math.floor(Math.random() * backgroundList.length)] as string })

    }
    return (
        <motion.button
            className="flex absolute w-full h-full overflow-hidden z-0"
            onClick={handleImageChange}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            ref={scope}

        >
            {image && <Image

                alt={image}
                // placeholder="data:image/png;base64,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"
                src={image}
                objectFit={"cover"}
                objectPosition={"center"}
                fill
                quality={100}
            />}

        </motion.button>)

}

export default RandomOsuHubBackground;
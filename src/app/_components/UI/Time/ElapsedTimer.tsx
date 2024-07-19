"use client"
import React from "react";
import { Headline } from "../Typography/Headline";
import { secondsToMinutesAndSecondsString } from "@/utils/time";



const ElapsedTimer = ({ start }: { start: number }) => {
    const [timestamp, setTimestamp] = React.useState(0);
    React.useEffect(() => {
        //  intervall to update the timer
        const interval = setInterval(() => {
            setTimestamp(new Date().getTime())
        }, 1000);
        return () => clearInterval(interval);
    }, []);
    return <Headline headlineNumber={2}>
        {secondsToMinutesAndSecondsString(Math.ceil((start - timestamp) / 1000) < 0 ? Math.ceil((timestamp - start) / 1000) : 0, true)
        }sec
    </Headline>
}
export default ElapsedTimer;
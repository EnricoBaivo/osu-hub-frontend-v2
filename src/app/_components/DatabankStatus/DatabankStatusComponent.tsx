"use client"
import { api } from "@/trpc/react";
import { time } from "console";
import { useEffect } from "react";



export default function DatabankStatusComponent() {



    return (
        <div className="w-full h-full flex items-center justify-center">
            <div className="w-96 h-96 text-white px-4 py-2">
                <h2>Database is starting for you</h2>
            </div>
        </div>
    );

}
"use client"
import React, { useEffect, useState, useMemo, useContext } from 'react';
// Define the MedalInterface
export interface MedalInterface {
    MedalID: number;
    Name: string;
    Link: string;
    Description: string;
    Restriction: string | null;
    Grouping: string;
    Instructions: string;
    SolutionFound: number;
    Solution: string;
    Mods: string;
    Locked: number;
    Video: string;
    Date: string;
    PackID: string;
    FirstAchievedDate: string | null;
    FirstAchievedBy: string | null;
    Lazer: number;
    ModeOrder: number;
    Ordering: number;
    Rarity: number;
    HasVoted: number;
}
// Define the context and its default value
const MedalContext = React.createContext<{
    medals: MedalInterface[];
    loading: boolean;
    error: string | null;
    fetchMedals: () => Promise<void>;
}>({
    medals: [],
    loading: false,
    error: null,
    fetchMedals: async () => { }
});



export default function MedalProvider({ children }: { children: React.ReactNode }) {
    const [medals, setMedals] = useState<MedalInterface[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchMedals = async () => {
        setLoading(true);
        setError(null);
        console.log('fetching medals');
        try {
            const response = await fetch("/api/medals", {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const medalList: MedalInterface[] = await response.json();
            console.log('medalList', medalList);
            setMedals(medalList);
        } catch (err) {
            setError(err.message);
            setMedals([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        console.log('fetching medals');
        const fetchMedalss = async () => {
            fetchMedals();
        }

        fetchMedalss();
    }, []);

    // const value = useMemo(
    //     () => ({ medals, fetchMedals, loading, error }),
    //     [medals, loading, error, fetchMedals]
    // );
    const value = { medals, fetchMedals, loading, error };
    return (
        <MedalContext.Provider value={value}>
            {children}
        </MedalContext.Provider>
    );
}

// Custom hook to use the MedalContext
export const useFetchMedals = () => {
    const context = useContext(MedalContext);
    if (!context) {
        throw new Error('useMedals must be used within a MedalProvider');
    }
    return context;
};

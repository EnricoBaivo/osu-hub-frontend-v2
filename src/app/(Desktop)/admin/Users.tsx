"use client"

import TableWithSelect from "@/app/_components/UI/Table/TableWithSelect"
import { api } from "@/trpc/react";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { Headline } from "@/app/_components/UI/Typography/Headline";
import ButtonNodge from "@/app/_components/UI/Button/ButtonNodge";
import { updateUser } from "@/actions";

export interface SortOptions {
    // isNew?: boolean;
    // isAdmin?: boolean;
    // isBetaTester?: boolean;
    // isAlphaTester?: boolean;
    lastLogin: "none" | "ascending" | "descending" | "other" | undefined
    createdAt: "none" | "ascending" | "descending" | "other" | undefined
    updatedAt: "none" | "ascending" | "descending" | "other" | undefined
    osuUserId: "none" | "ascending" | "descending" | "other" | undefined
    isNew: "none" | "ascending" | "descending" | "other" | undefined
    isAdmin: "none" | "ascending" | "descending" | "other" | undefined
    name: "none" | "ascending" | "descending" | "other" | undefined
    isBetaTester: "none" | "ascending" | "descending" | "other" | undefined
    isAlphaTester: "none" | "ascending" | "descending" | "other" | undefined
}

const Users = () => {
    const [sortOptions, setSortOptions] = useState<SortOptions>({
        lastLogin: "none",
        createdAt: "none",
        updatedAt: "none",
        osuUserId: "none",
        isNew: "none",
        isAdmin: "none",
        name: "none",
        isBetaTester: "none",
        isAlphaTester: "none",
    });

    const [showOnlyNewUsers, setShowOnlyNewUsers] = useState(true);
    const users = api.user.getNewUsers.useQuery();
    const [usersdata, setUsersData] = useState<typeof users.data>();

    const sortedData = useMemo(() => {
        if (!users.data) return null;
        const dataToSort = [...users.data];
        dataToSort.sort((a, b) => {
            if (!b.osu_user_id || !a.osu_user_id) return 0;

            for (const [key, value] of Object.entries(sortOptions)) {
                if (value === "none") continue;

                const aValue = a[key as keyof typeof a];
                const bValue = b[key as keyof typeof b];

                if (aValue !== null && bValue !== null) {
                    if (value === "ascending") {
                        if (aValue < bValue) return -1;
                        if (aValue > bValue) return 1;
                    } else if (value === "descending") {
                        if (aValue > bValue) return -1;
                        if (aValue < bValue) return 1;
                    }
                }
            }

            return 0; // If all comparisons are equal or values are null, return 0 to maintain the original order
        });
        if (showOnlyNewUsers)
            return dataToSort.filter((user) => user.is_new === true);
        return dataToSort;
    }, [users, sortOptions, showOnlyNewUsers]);

    useEffect(() => {
        if (users.data && !usersdata) {
            setUsersData(users.data);
        }
    }, [users, usersdata])




    const handleSortClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        const target = e.target as HTMLButtonElement;
        const targetValue = target.value as keyof SortOptions;
        const newSortOptions = { ...sortOptions };
        if (sortOptions[targetValue] === "none") {
            newSortOptions[targetValue] = "descending";
        } else if (sortOptions[targetValue] === "descending") {

            newSortOptions[targetValue] = "ascending";
        } else if (sortOptions[targetValue] === "ascending") {
            newSortOptions[targetValue] = "none";
        }
        setSortOptions(newSortOptions);
    }

    const mutation = api.user.grandAlphaTester.useMutation();
    const ref = useRef(null);
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (!ref.current) return;
        const newFormData = new FormData(ref.current);
        const userIds = newFormData.getAll("c1") as string[];
        userIds.map(id => updateUser(id, true));
        mutation.mutate({ userIds });
    }

    return sortedData ? <>
        <div className="flex flex-col w-full">
            <Headline headlineNumber={2}  >New Users</Headline>
            <p className="text-lg text-gray-500">Users who have not yet been assigned a role</p>
            <p className="text-xl text-gray-200"> Users: {sortedData.length}</p>
            <div>
                <ButtonNodge type="button" onClick={() => {
                    setSortOptions({
                        lastLogin: "none",
                        createdAt: "none",
                        updatedAt: "none",
                        osuUserId: "none",
                        isNew: "none",
                        isAdmin: "none",
                        name: "none",
                        isBetaTester: "none",
                        isAlphaTester: "none",
                    });
                }}>
                    Reset Sorting
                </ButtonNodge>
                <ButtonNodge type="button" onClick={() => {
                    setShowOnlyNewUsers(!showOnlyNewUsers);
                }}>
                    {showOnlyNewUsers ? "Show all Users" : "Show only new Users"}
                </ButtonNodge>
                <ButtonNodge
                    form="f"
                    type="submit"
                >
                    Submit
                </ButtonNodge>
            </div>
        </div>
        <TableWithSelect
            ref={ref}
            handleSubmit={handleSubmit}

            handleSort={handleSortClick}
            sortOptions={sortOptions}
            header={[
                { title: "Nr." },
                { title: "Avatar" },
                { title: "Name", filterKey: "name" },
                { title: "Osu Id", filterKey: "osuUserId" },
                { title: "New", filterKey: "isNew" },
                { title: "Admin", filterKey: "isAdmin" },
                { title: "Alpha Tester", filterKey: "isAlphaTester" },
                { title: "Beta Tester", filterKey: "isBetaTester" },
                { title: "Last Login", filterKey: "lastLogin" },
                { title: "Created At", filterKey: "createdAt" },
                { title: "Updated At", filterKey: "updatedAt" },
                { title: "grand alpha" },
            ]}
            tr={sortedData.map((user, i) => {
                return {
                    userId: String(user.osu_user_id),
                    td: [
                        <div key={"rowId-" + i} className="flex w-full h-full items-center justify-center">{i + 1}</div>,
                        <Image unoptimized width={60} height={60} key={"img" + user.id} className=" rounded-full" src={user.image ?? "https://osu.ppy.sh/images/flags/XX.png"} alt="" />,
                        user.name ?? "??",
                        user.osu_user_id?.toString() ?? "??",
                        user.is_new ? <strong>Yes</strong> : "No",
                        user.is_admin ? "Yes" : "No",
                        user.is_alpha_tester ? "Yes" : "No",
                        user.is_beta_tester ? "Yes" : "No",
                        user.updatedAt.toLocaleDateString() ?? "??",
                        user.createdAt.toLocaleDateString() ?? "??",
                        user.updatedAt.toLocaleDateString() ?? "??",
                    ]
                }
            })}
        />
    </> : <div>loading</div>


}

export default Users
"use client"
import React, { forwardRef, LegacyRef, type ReactNode } from "react";
import * as Checkbox from '@radix-ui/react-checkbox';
import { CheckIcon } from '@radix-ui/react-icons';
import { api } from "@/trpc/react";
import type { SortOptions } from "@/app/admin/Users";
import clsx from "clsx";
interface TableProps {
    header: {
        filterKey?: keyof SortOptions;
        title: string
    }[];
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    tr: { td: (ReactNode | string)[], userId: string }[];
    handleSort: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    sortOptions: SortOptions;
}
const Row = ({ data, i }: { data: { td: (ReactNode | string)[], userId: string }, i: number }) => {
    const [isHovered, setIsHovered] = React.useState(false);
    return <div
        onMouseOver={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        role="row"
        aria-rowindex={2 + i}
        className="contents"
    >

        {
            data.td ? data.td.map((r, ie) => (
                <div role="gridcell" key={"a" + data.userId + ie.toString()}
                    className={clsx("flex items-center h-24 pl-2 pr-2 border border-slate-800  transition-colors",

                        isHovered ? "bg-osuhub-gray" : i % 2 == 0 ? "bg-osuhub-dark-ice-blue" : "bg-osuhub-dark-ice-grey")}>
                    {r}
                </div>
            ))
                : null
        }
        < div
            role="gridcell"
            className={
                clsx("flex justify-center items-center h-24 pl-2 pr-2 border border-slate-800 transition-colors",
                    isHovered ? "bg-osuhub-gray" : i % 2 == 0 ? "bg-osuhub-dark-ice-blue" : "bg-osuhub-dark-ice-grey")}>

            <Checkbox.Root
                className=
                {"flex text-gray-950 disabled:bg-slate-800 shadow-blackA4  h-[20px] w-[20px] appearance-none items-center justify-center rounded-[4px] bg-white shadow-[0_2px_10px] outline-none focus:shadow-[0_0_0_2px_black]"}
                id="c1"
                name={"c1"}
                disabled={data.userId === "04785ba7-69de-4f6f-b494-7a9de1fc9ec8"}
                value={data.userId}
            >
                <Checkbox.Indicator className="text-violet11">
                    <CheckIcon />
                </Checkbox.Indicator>
            </Checkbox.Root>
        </div >
    </div >
}



const TableWithSelect = forwardRef(function TableWithSelect({ header, tr, sortOptions, handleSort, handleSubmit }: TableProps, ref: LegacyRef<HTMLFormElement>) {
    if (!tr || !header) return null;

    return (
        <form className="relative flex justify-center overflow-auto h-11/12 text-base text-white" id="f" ref={ref} onSubmit={handleSubmit}>
            <div role="grid" className={clsx(" grid fill-grid w-11/12")}
                style={{ height: (tr.length + 1) * 100, gridTemplateColumns: `90px repeat(${header.length - 1}, 1fr)`, gridTemplateRows: `repeat(${(tr.length + 1)}, 92px)` }} aria-rowcount={(tr.length + 1)} aria-colcount={header.length}>
                <div role="row"
                    aria-rowindex={1}
                    className="contents border rounded-md"
                >
                    {header.map((data, i) => {
                        if (data.filterKey) {
                            return <button type="button"
                                value={data.filterKey}
                                aria-sort={data.filterKey && sortOptions[data.filterKey]}
                                onClick={(e) =>
                                    data.filterKey && handleSort(e)
                                }
                                key={data.title + i} role="columnheader" style={{ gridArea: ` 1 / ${i + 1} / 2 / ${i + 2} ` }}
                                className="border first:rounded-l-md last:rounded-l-md sticky top-0 z-30 backdrop-blur-sm  even:bg-osuhub-dark-ice-grey odd:bg-osuhub-dark-ice-grey  transition-colors hover:bg-osuhub-gray  border-slate-800 h-24 pl-2 pr-2 text-start"
                            >
                                {data.title}<br />
                                {data.filterKey && sortOptions[data.filterKey]}
                            </button>
                        } else {
                            return <div
                                key={data.title + i} role="columnheader" style={{ gridArea: ` 1 / ${i + 1} / 2 / ${i + 2} ` }}
                                className="border first:rounded-l-md last:rounded-l-md sticky top-0 z-30 backdrop-blur-sm  even:bg-osuhub-dark-ice-grey odd:bg-osuhub-dark-ice-grey  transition-colors hover:bg-osuhub-gray border-slate-800 h-24 pl-2 pr-2 text-start flex items-center justify-center"
                            >
                                {data.title}
                            </div>
                        }
                    }
                    )}
                </div>

                {tr.map((data, i) => {
                    return (<Row data={data} i={i} key={"data-select" + data.userId.toString()} />

                    );
                })}


            </div>
        </form >)
})
export default TableWithSelect;
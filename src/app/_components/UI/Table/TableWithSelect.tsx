"use client";
import React, { forwardRef, LegacyRef, ReactNode, useRef, useEffect, useState } from "react";
import * as Checkbox from '@radix-ui/react-checkbox';
import { CheckIcon } from '@radix-ui/react-icons';
import clsx from "clsx";
import { SortOptions } from "@/app/(Desktop)/admin/Users";

interface HeaderProps {
    filterKey?: keyof SortOptions;
    title: string;
}

interface DataRow {
    td: (React.ReactNode | string)[];
    userId: string;
}

interface Handlers {
    fetchNextPage?: () => void;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    handleSort: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

interface SortOptionsProps {
    sortOptions: SortOptions;
}

interface TableProps extends Handlers, SortOptionsProps {
    header: HeaderProps[];
    tr: DataRow[];
}

interface RowProps {
    data: DataRow;
    i: number;
}

const Row = forwardRef<HTMLDivElement, RowProps>(({ data, i }, ref) => {
    const [isHovered, setIsHovered] = useState(false);

    const rowClass = clsx(
        "flex items-center h-24 pl-2 pr-2 border border-slate-800 transition-colors",
        isHovered ? "bg-osuhub-gray" : i % 2 === 0 ? "bg-osuhub-dark-ice-blue" : "bg-osuhub-dark-ice-grey"
    );

    return (
        <div
            ref={ref}
            onMouseOver={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            role="row"
            aria-rowindex={2 + i}
            className="contents"
        >
            {data.td.map((r, ie) => (
                <div
                    role="gridcell"
                    key={`a${data.userId}${ie}`}
                    className={rowClass}
                >
                    {r}
                </div>
            ))}
            <div role="gridcell" className={rowClass}>
                <Checkbox.Root
                    className="flex text-gray-950 disabled:bg-slate-800 shadow-blackA4 h-[20px] w-[20px] appearance-none items-center justify-center rounded-[4px] bg-white shadow-[0_2px_10px] outline-none focus:shadow-[0_0_0_2px_black]"
                    id="c1"
                    name="c1"
                    disabled={data.userId === "04785ba7-69de-4f6f-b494-7a9de1fc9ec8"}
                    value={data.userId}
                >
                    <Checkbox.Indicator className="text-violet11">
                        <CheckIcon />
                    </Checkbox.Indicator>
                </Checkbox.Root>
            </div>
        </div>
    );
});

const TableWithSelect = forwardRef<HTMLFormElement, TableProps>(function TableWithSelect({ header, tr, sortOptions, handleSort, handleSubmit, fetchNextPage }, ref) {
    if (!tr || !header) return null;

    const observerRef = useRef<IntersectionObserver | null>(null);
    const gridRef = useRef<HTMLDivElement | null>(null);
    const lastElementRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!gridRef.current || !lastElementRef.current) return;

        observerRef.current = new IntersectionObserver(() => {
            fetchNextPage && fetchNextPage();
        }, {
            rootMargin: "0px",
            threshold: 1.0
        });

        observerRef.current.observe(lastElementRef.current);

        return () => {
            observerRef.current?.disconnect();
        };
    }, [fetchNextPage, gridRef]);

    return (
        <form className="relative flex justify-center overflow-auto grow text-base text-white" id="f" ref={ref} onSubmit={handleSubmit}>
            <div
                ref={gridRef}
                role="grid"
                className={clsx("grid fill-grid w-11/12")}
                style={{ height: (tr.length + 1) * 100, gridTemplateColumns: `90px repeat(${header.length - 1}, 1fr)`, gridTemplateRows: `repeat(${(tr.length + 1)}, 92px)` }}
                aria-rowcount={tr.length + 1}
                aria-colcount={header.length}
            >
                <div role="row" aria-rowindex={1} className="contents border rounded-md">
                    {header.map((data, i) => (
                        data.filterKey ? (
                            <button
                                type="button"
                                value={data.filterKey}
                                aria-sort={data.filterKey && sortOptions[data.filterKey]}
                                onClick={(e) => data.filterKey && handleSort(e)}
                                key={data.title + i}
                                role="columnheader"
                                style={{ gridArea: `1 / ${i + 1} / 2 / ${i + 2}` }}
                                className="border first:rounded-l-md last:rounded-l-md sticky top-0 z-30 backdrop-blur-sm even:bg-osuhub-dark-ice-grey odd:bg-osuhub-dark-ice-grey transition-colors hover:bg-osuhub-gray border-slate-800 h-24 pl-2 pr-2 text-start"
                            >
                                {data.title}
                                <br />
                                {data.filterKey && sortOptions[data.filterKey]}
                            </button>
                        ) : (
                            <div
                                key={data.title + i}
                                role="columnheader"
                                style={{ gridArea: `1 / ${i + 1} / 2 / ${i + 2}` }}
                                className="border first:rounded-l-md last:rounded-l-md sticky top-0 z-30 backdrop-blur-sm even:bg-osuhub-dark-ice-grey odd:bg-osuhub-dark-ice-grey transition-colors hover:bg-osuhub-gray border-slate-800 h-24 pl-2 pr-2 text-start flex items-center justify-center"
                            >
                                {data.title}
                            </div>
                        )
                    ))}
                </div>
                {tr.map((data, i) => (
                    <Row data={data} i={i} key={`data-select${data.userId}`} />
                ))}
                <div className="bg-transparent h-1 w-full" ref={lastElementRef} ></div>
            </div>
        </form>
    );
});

export default TableWithSelect;

"use client"
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useCallback } from "react";

export default function useQueryParams() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams);
            if (value === "unset") {
                // eslint-disable-next-line no-use-before-define
                params.delete(name);
                return params.toString();
            }
            params.set(name, value);

            return params.toString();
        },
        [searchParams],
    );

    const createQueryListString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams);
            const currentParams = searchParams.getAll(name);

            toggleValueInList(currentParams, value);

            // Clear the existing "score_type" parameters
            // eslint-disable-next-line no-use-before-define
            params.delete(name);
            // Re-add the modified values
            currentParams.forEach((element) => params.append(name, element));

            return params.toString();
        },
        [searchParams],
    );

    const setQueryParam = (queryName: string, value: string) => {
        router.push(`${pathname}?${createQueryString(queryName, value)}`)
    };
    const setQueryListParam = (queryName: string, value: string) => {
        router.push(`${pathname}?${createQueryListString(queryName, value)}`)
    };

    return { queryParams: searchParams, createQueryString, setQueryParam, setQueryListParam };
}

function toggleValueInList(list: string[], value: string) {
    const index = list.indexOf(value);
    if (index !== -1) {
        // Value is already in the list, so remove it
        list.splice(index, 1);
    } else {
        // Value is not in the list, so add it

        list.push(value);
    }
}
"use client"

import useQueryParams from "@/hooks/useQueryParams";

import { motion } from "framer-motion";
import QueryButton from "./QueryButton";
import ButtonNodge from "@/app/_components/UI/Button/ButtonNodge";

const QuerySearchParamsUpdate = () => {
    const { queryParams, setQueryParam, setQueryListParam } = useQueryParams();
    const MotionComponent = motion(ButtonNodge)
    function handleChange(param: string, value: string | number) {
        setQueryListParam(param, value.toString());
    }


    return <div className="flex gap-3 p-4 w-full">
        <MotionComponent
            isActive={queryParams.getAll("score_type").includes("score_best_osu")}
            onClick={() => handleChange("score_type", "score_best_osu")} >
            best scores
        </MotionComponent>
        <MotionComponent
            isActive={queryParams.getAll("score_type").includes("score_osu")}
            onClick={() => handleChange("score_type", "score_osu")} >
            standard scores
        </MotionComponent>

        <QueryButton options={[
            { label: "passed scores", value: "1" },
            { label: "not passed scores", value: "0" },
            { label: "passed & failed", value: "unset" }]}
            setQueryParam={setQueryParam}
            queryParams={queryParams} queryparam_name="is_passed" />
        <QueryButton options={[
            { label: "perfect scores", value: "1" },
            { label: "not perfect scores", value: "0" },
            { label: "perfect & not perfect", value: "unset" }]}
            setQueryParam={setQueryParam}
            queryParams={queryParams} queryparam_name="is_perfect" />

    </div >

}

export default QuerySearchParamsUpdate
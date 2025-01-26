"use client";

import JobsContext from "@/repositories/jobsContext";
import classes from "@/utils/classes";
import { useContext } from "react";

export default function Tag({ tag }: { tag: string }) {
    const { selectedTag, setSelectedTag } = useContext(JobsContext);

    return (
        <div className={classes("p-[8px] rounded-[4px] font-bold text-[16px] w-full whitespace-nowrap", selectedTag == tag ? "bg-blue-400 text-white-100" : "bg-blue-100 text-blue-400")} onClick={() => setSelectedTag(tag)}>
            {tag}
        </div>
    )
}
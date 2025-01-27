"use client";

import JobsContext from "@/repositories/jobsContext";
import { useContext } from "react";

export default function JobsSearch() {
    const { setSearchText } = useContext(JobsContext);

    return (
        <input
            placeholder="Search"
            id="SearchBar"
            className="flex-grow p-[16px] rounded-tr-[8px] rounded-br-[8px] focus:outline-none"
            onInput={((e) => setSearchText((e.target as HTMLInputElement).value))}
        />
    )
}
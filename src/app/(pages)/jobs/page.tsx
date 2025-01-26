
"use client";

import withProtection from "@/components/protected";
import classes from "@/utils/classes";
import { MagnifyingGlass } from "@phosphor-icons/react/dist/ssr";
import JobsSearch from "./JobsSearch";
import Tag from "./SelectionTag";
import JobCards from "./JobCards";
import Filters from "./Filters";
export default function Jobs() {
    return (
        <div className="px-[60px]">
            {/* Search Bar */}
            <div
                className={
                    classes(
                        "flex flex-row font-inter items-stretch bg-white-100 outline outline-1 outline-white-500", "rounded-[8px] focus-within:outline-black"
                    )
                }
            >
                <div className="pl-[16px] self-center justify-self-center">
                    <MagnifyingGlass size={20} />
                </div>
                <JobsSearch />
            </div>

            {/* Tags */}
            <div className="flex flex-row gap-[10px] mt-[16px] overflow-x-auto">
                {["All", "UI/UX Design", "Architecture", "Engineering", "Graphic Design", "Product Management", "Data Science", "Marketing", "Finance", "Human Resources"].map((tag, index) => <Tag key={index} tag={tag} />)}
            </div>

            <div className="flex flex-row gap-[16px] mt-[16px]">
                {/* Filters */}
                <Filters />
                {/* JobCards */}
                <JobCards />
            </div>
        </div>
    )
}
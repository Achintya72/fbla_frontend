
"use client";

import withProtection from "@/components/protected";
import classes from "@/utils/classes";
import { MagnifyingGlass } from "@/utils/icons";

function Jobs() {
    return (
        <div className="px-[60px]">
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
                <input
                    placeholder="Search"
                    id="SearchBar"
                    className="flex-grow p-[16px] rounded-tr-[8px] rounded-br-[8px] focus:outline-none"
                />
            </div>
        </div>
    )
}

export default withProtection(Jobs, { auth: true });
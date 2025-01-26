import classes from "@/utils/classes";
import { MagnifyingGlass } from "@phosphor-icons/react/dist/ssr";

export default function Jobs() {
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
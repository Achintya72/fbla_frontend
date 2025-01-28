"use client";

import withProtection from "@/components/protected"
import { useLoginContext } from "@/services/login";

function Dashboard() {
    const { name, role } = useLoginContext();

    return (
        <main className="px-[60px] flex flex-row gap-[20px]">
            <div className="flex-grow">

            </div>
            <div className="flex flex-col gap-[16px] min-w-[350px]">
                <div className="border-white-500 flex flex-col gap-[10px] rounded-[8px] bg-white-100 p-[16px]">
                    <h5 className="text-white-700">Hello,</h5>
                    <h1 className="text-[40px] font-inter tracking-normal mt-[-10px]">{name}</h1>
                    <div className="flex flex-row font-bold text-[14px] gap-[10px]">
                        <div className="p-[6px] bg-blue-100 text-blue-400 rounded-[5px] max-w-fit">
                            {role.charAt(0).toUpperCase() + role.slice(1)}
                        </div>
                        <div className="p-[6px] bg-green-100 text-green-700 rounded-[5px]">
                            Tesla STEM High School
                        </div>
                    </div>
                </div>
                <div>
                    <h5>In Progress Applications</h5>
                </div>
            </div>
        </main>
    )
}

const protectedComponent = withProtection(Dashboard, { auth: true, role: ["student"] });

export default protectedComponent;
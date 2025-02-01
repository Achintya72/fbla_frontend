"use client";

import withProtection from "@/components/protected"
import { useLoginContext } from "@/services/login.service";
import { useEffect } from "react";
import { redirect } from "next/navigation";
import Loader from "@/components/Loader"

function Dashboard() {
    const context = useLoginContext();

    useEffect(() => {
        if (context.authUser) {
            redirect(`/dashboard/${context.role}`);
        }
    }, [context.authUser, context.role])

    return (
        <div className="px-[20px] md:px-[60px] flex flex-row h-full w-full justify-center items-center">
            <div className="flex flex-col gap-[10px] items-center">
                <Loader />
                Loading your dashboard ...
            </div>
        </div>
    )
}

const protectedComponent = withProtection(Dashboard, { auth: true });

export default protectedComponent;
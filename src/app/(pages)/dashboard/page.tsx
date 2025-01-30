"use client";

import withProtection from "@/components/protected"
import { useLoginContext } from "@/services/login";
import { useEffect } from "react";
import { redirect } from "next/navigation";

function Dashboard() {
    const context = useLoginContext();
    console.log(context.role);
    console.log(context.authUser);
    console.log(context.name);

    useEffect(() => {
        if (context.authUser) {
            redirect(`/dashboard/${context.role}`);
        }
    }, [context.authUser, context.role])

    return (
        <main className="px-[60px] flex flex-col gap-[40px]">
            <h3>Loading...</h3>
        </main>
    )
}

const protectedComponent = withProtection(Dashboard, { auth: true });

export default protectedComponent;
"use client";

import withProtection from "@/components/protected"

function Dashboard() {
    return (
        <main className="px-[60px] flex flex-col gap-[40px]">
            <h2>Dashboard</h2>
        </main>
    )
}

const protectedComponent = withProtection(Dashboard, { auth: true });

export default protectedComponent;
"use client";

import withProtection from "@/components/protected"

function Dashboard() {
    return (
        <main className="px-[60px] flex flex-col gap-[40px]">
            <h2>Counselor Dashboard</h2>
        </main>
    )
}

const protectedComponent = withProtection(Dashboard, { auth: true, role: ["counselor"] });

export default protectedComponent;
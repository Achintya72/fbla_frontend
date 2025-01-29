"use client";

import Button from "@/components/button";
import CondensedJobCard from "@/components/CondensedJobCard";
import withProtection from "@/components/protected"
import { useUserDataContext } from "@/repositories/userDataContext";
import { useLoginContext } from "@/services/login";
import Link from "next/link";
import { useContext } from "react";
import JobsContext from "@/repositories/jobsContext";

function Dashboard() {
    const { recruiterData } = useUserDataContext();
    const { name, role } = useLoginContext();
    const { jobs } = useContext(JobsContext);

    const { company, jobReferences } = recruiterData ?? {company: {name: ""}, jobReferences: []};

    const livePostings = jobReferences.filter((value) => value.status == "pending");
    const completed = jobReferences.filter((value) => ["accepted", "rejected"].includes(value.status));
    const inProgress = jobReferences.filter((value) => value.status == "in-progress");

    return (
        <main className="px-[60px] flex flex-row gap-[20px] flex-wrap-reverse">
            <div className="grow-[3]">
                <h4 className="mb-[8px]">Live Postings</h4>
                <div className="flex flex-col gap-[16px] min-w-[350px] mb-[32px]">
                    {livePostings.length > 0 && livePostings.map((value, index) => {
                        const job = jobs.find((job) => job.id === value.id);
                        return job ? <CondensedJobCard key={index} job={job} status={"pending"} /> : null;
                    })}
                    {livePostings.length == 0 && <div className="text-white-700">No applications in progress. <Link className="underline" href="/jobs">Add some?</Link></div>}
                </div>
                <h4 className="mb-[8px]">Previous Postings</h4>
                <div className="flex flex-col gap-[16px] min-w-[350px] mb-[32px]">
                    {completed.length > 0 && completed.map((value, index) => {
                        const job = jobs.find((job) => job.id === value.id);
                        return job ? <CondensedJobCard key={index} job={job} status={value.status} /> : null;
                    })}
                    {completed.length == 0 && <div className="text-white-700">No completed applications. <Link className="underline" href="/jobs">Add some?</Link></div>}
                </div>
            </div>
            <div className="flex flex-col gap-[16px] min-w-[350px] grow">
                <div className="border-white-500 flex flex-col gap-[10px] rounded-[8px] bg-white-100 p-[16px]">
                    <h5 className="text-white-700">Hello,</h5>
                    <h1 className="text-[30px] font-inter tracking-normal mt-[-10px]">{name}</h1>
                    <div className="flex flex-row font-bold text-[14px] gap-[10px]">
                        <div className="p-[6px] bg-blue-100 text-blue-400 rounded-[5px] max-w-fit">
                            {role.charAt(0).toUpperCase() + role.slice(1)}
                        </div>
                        <div className="p-[6px] bg-green-100 text-green-700 rounded-[5px]">
                            {company.name}
                        </div>
                    </div>
                    <div className="flex flex-row gap-[10px]">
                        <Button size={'small'}>Edit Profile</Button>
                    </div>
                </div>
                <div className="flex flex-col gap-[16px] min-w-[350px]">
                    <h4 className="mb-[8px]">In Progress</h4>
                    {inProgress.length > 0 && inProgress.map((value, index) => {
                        const job = jobs.find((job) => job.id === value.id);
                        return job ? <CondensedJobCard key={index} job={job} showButtons buttons={[
                            {text: "Edit", href: `/jobs/${job.id}/edit`}
                        ]} /> : null;
                    })}
                    {inProgress.length == 0 && <div className="text-white-700">No bookmarks. <Link className="underline" href="/jobs">Add some?</Link></div>}
                </div>
            </div>
        </main>
    )
}

const protectedComponent = withProtection(Dashboard, { auth: true, role: ["recruiter"] });

export default protectedComponent;
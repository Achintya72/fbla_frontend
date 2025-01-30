"use client";

import Button from "@/components/button";
import CondensedJobCard from "@/components/CondensedJobCard";
import Loader from "@/components/Loader";
import withProtection from "@/components/protected"
import JobsContext from "@/serviceProviders/jobsContext";
import { useUserDataContext } from "@/serviceProviders/userDataContext";
import { useLoginContext } from "@/services/login.service";
import Link from "next/link";
import { useContext } from "react";

function Dashboard() {
    const { name, role } = useLoginContext();
    const { studentData } = useUserDataContext();
    const { jobs } = useContext(JobsContext);

    if (studentData == undefined) {
        return <Loader />
    }

    const jobReferences = studentData.jobReferences || [];
    const inProgress = jobReferences.filter(ref => ref.status === "in-progress");
    const completed = jobReferences.filter((value) => ["accepted", "rejected", "pending"].includes(value.status));
    const bookmarked = jobReferences.filter((value) => value.status == "bookmarked");


    return (
        <main className="px-[60px] flex flex-row gap-[20px] flex-wrap-reverse">
            <div className="grow-[3]">
                <h4 className="mb-[8px]">In Progress</h4>
                <div className="flex flex-col gap-[16px] min-w-[350px] mb-[32px]">
                    {inProgress.length > 0 && inProgress.map((value, index) => {
                        const job = jobs.find((job) => job.id === value.id);
                        return job ? <CondensedJobCard key={index} job={job} /> : null;
                    })}
                    {inProgress.length == 0 && <div className="text-white-700">No applications in progress. <Link className="underline" href="/jobs">Add some?</Link></div>}
                </div>
                <h4 className="mb-[8px]">Completed</h4>
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
                            Tesla STEM High School
                        </div>
                    </div>
                    <div className="flex flex-row gap-[10px]">
                        <Link href={`/student/${studentData?.id}/edit`}>
                            <Button size={'small'}>Edit Profile</Button>
                        </Link>
                        <Link href={`/student/${studentData?.id}`}>
                            <Button size="small" variant="secondary">Preview</Button>
                        </Link>
                    </div>
                </div>
                <div className="flex flex-col gap-[16px] min-w-[350px]">
                    <h4 className="mb-[8px]">Bookmarks</h4>
                    {bookmarked.length > 0 && bookmarked.map((value, index) => {
                        const job = jobs.find((job) => job.id === value.id);
                        return job ? <CondensedJobCard key={index} job={job} showButtons /> : null;
                    })}
                    {bookmarked.length == 0 && <div className="text-white-700">No bookmarks. <Link className="underline" href="/jobs">Add some?</Link></div>}
                </div>
            </div>
        </main>
    )
}

const protectedComponent = withProtection(Dashboard, { auth: true, role: ["student"] });

export default protectedComponent;
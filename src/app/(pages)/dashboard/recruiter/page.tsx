"use client";

import Button from "@/components/button";
import CondensedJobCard from "@/components/CondensedJobCard";
import withProtection from "@/components/protected"
import { useUserDataContext } from "@/serviceProviders/userDataContext";
import { useLoginContext } from "@/services/login.service";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRecruiterQueries } from "@/repositories/recruiter.repository";
import Loader from "@/components/Loader";
import { Job } from "@/models/jobs";
import { RecruiterApplication } from "@/models/application";

function Dashboard() {
    const { recruiterData } = useUserDataContext();
    const { name, role } = useLoginContext();
    const [recruiterJobs, setRecruiterJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const { getRecruiterJobs, getApplicationsForJob } = useRecruiterQueries();

    const { company, id } = recruiterData ?? { company: { name: "" } };

    useEffect(() => {
        if (id == undefined) return;
        const fetchData = async () => {
            try {
                const temp = await getRecruiterJobs(id);
                const tempJ = await Promise.all(temp.map(async (value) => {
                    const applications: RecruiterApplication[] = await getApplicationsForJob(value.id);
                    return {
                        ...value, studentFound: applications.some((v) => {
                            return v.recruiterClassification == "accepted"
                        })
                    }
                }));
                setRecruiterJobs(tempJ);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, [id, getRecruiterJobs, getApplicationsForJob])

    if (id == undefined || loading) {
        return <Loader />
    }

    const livePostings: Job[] = recruiterJobs.filter((value) => value.published && value.closeDate >= new Date());
    const completed: Job[] = recruiterJobs.filter((value) => value.published && value.closeDate < new Date());
    const inProgress: Job[] = recruiterJobs.filter((value) => !value.published);

    return (
        <main className="px-[60px] flex flex-row gap-[20px] flex-wrap-reverse">
            <div className="grow-[3]">
                <h4 className="mb-[8px]">Live Postings</h4>
                <div className="flex flex-col gap-[16px] min-w-[350px] mb-[32px]">
                    {livePostings.length > 0 && livePostings.map((value, index) => {
                        return value ? <CondensedJobCard key={index} job={value} status={"pending"} /> : null;
                    })}
                    {livePostings.length == 0 && <div className="text-white-700">No live postings. <Link className="underline" href="/jobs">Create one?</Link></div>}
                </div>
                <h4 className="mb-[8px]">Previous Postings</h4>
                <div className="flex flex-col gap-[16px] min-w-[350px] mb-[32px]">
                    {completed.length > 0 && completed.map((value, index) => {
                        return value ? <CondensedJobCard key={index} job={value} status={value.studentFound ? "student Found" : "completed"} /> : null;
                    })}
                    {completed.length == 0 && <div className="text-white-700">No completed postings. <Link className="underline" href="/jobs">Create one?</Link></div>}
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
                        <Link href='/jobs/create'><Button size={'small'}>Create Job</Button></Link>
                    </div>
                </div>
                <div className="flex flex-col gap-[16px] min-w-[350px]">
                    <h4 className="mb-[8px]">Waiting for Approval</h4>
                    {inProgress.length > 0 && inProgress.map((value, index) => {
                        return value ? <CondensedJobCard key={index} job={value} showButtons buttons={[
                            { text: "Edit", href: `/jobs/${value.id}/edit` }
                        ]} /> : null;
                    })}
                    {inProgress.length == 0 && <div className="text-white-700">No postings waiting for approval. <Link className="underline" href="/jobs">Create one?</Link></div>}
                </div>
            </div>
        </main>
    )
}

const protectedComponent = withProtection(Dashboard, { auth: true, role: ["recruiter"] });

export default protectedComponent;
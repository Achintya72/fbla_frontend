"use client";

import Button from "@/components/button";
import { Job } from "@/models/jobs"
import JobsContext from "@/repositories/jobsContext";
import { BookmarkSimple } from "@phosphor-icons/react";
import { useContext } from "react";

function JobCard({ job }: { job: Job }) {
    return (
        <div className="border-white-500 flex flex-col gap-[10px] rounded-[8px] bg-white-100 p-[16px]">
            <div className="flex flex-row justify-between">
                <div className="flex flex-row gap-[5px]">
                    <div className="bg-white-200 rounded-full h-[51px] w-[51px] flex items-center justify-center">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={job.company.logo} alt={job.company.name} className="w-[40px] h-[40px] rounded-full object-contain" />
                    </div>
                    <div>
                        <div className="font-bold">{job.title}</div>
                        <div className="text-white-700 text-[14px]">{job.company.name}</div>
                    </div>
                </div>
                <div className="self-center justify-self-center  text-white-700">
                    <BookmarkSimple size={24} />
                </div>
            </div>
            <div className="flex flex-row font-bold text-[14px] gap-[10px]">
                <div className="p-[6px] bg-blue-100 text-blue-400 rounded-[5px]">
                    {job.level.charAt(0).toUpperCase() + job.level.slice(1)}
                </div>
                <div className="p-[6px] bg-green-100 text-green-700 rounded-[5px]">
                    {job.location.charAt(0).toUpperCase() + job.location.slice(1)}
                </div>
                <div className="p-[6px] bg-yellow-100 text-yellow-700 rounded-[5px]">
                    {job.commitment.charAt(0).toUpperCase() + job.commitment.slice(1)}
                </div>
            </div>
            <div>
                {job.description}
            </div>
            <div className="text-white-700 text-[14px]">
                {job.closeDate.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: new Date(job.closeDate).getFullYear() === new Date().getFullYear() ? undefined : 'numeric' })} • {job.applications.length} Applicant{job.applications.length > 1 ? "s" : ""}
            </div>
            <div className="flex flex-row justify-between">
                <div className="font-semibold">
                    ${job.salary.toLocaleString()}
                    <span className="text-white-700">/mo</span>
                </div>
                <div className="flex flex-row gap-[10px]">
                    <Button size="small" variant="secondary">View</Button>
                    <Button size="small">Apply</Button>
                </div>
            </div>
        </div >
    );
}

export default function JobCards() {
    const { jobs, populated, searchText, selectedTag, compensationRange, locations, commitments } = useContext(JobsContext);

    const filteredJobs = jobs.filter(job => job.title.includes(searchText) && (job.tags.includes(selectedTag) || selectedTag == "All") && job.salary >= compensationRange[0] && job.salary <= compensationRange[1] && (locations.length == 0 || locations.includes(job.location)) && (commitments.length == 0 || commitments.includes(job.commitment)));

    return (
        <div className="grid grid-cols-3 gap-[16px] flex-1">
            {!populated && <div>Loading...</div>}
            {populated && (filteredJobs.length > 0 ? filteredJobs.map((job, index) => <JobCard key={index} job={job} />) : <div>No jobs found</div>)}
        </div>
    )
}
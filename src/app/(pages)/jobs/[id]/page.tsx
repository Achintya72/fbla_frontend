"use client";

import Button from '@/components/button';
import JobsContext from '@/serviceProviders/jobsContext';
import { useParams, redirect } from 'next/navigation';
import React, { useContext } from 'react';
import CondensedJobCard from '../../../../components/CondensedJobCard';
import Bookmark from '@/components/bookmark';
import Link from 'next/link';
import { useLoginContext } from '@/services/login.service';

export default function Posting() {
    const { jobs, populated } = useContext(JobsContext);
    const { role } = useLoginContext();
    const params = useParams();

    const job = jobs.find((job) => job.id === params.id);


    if (!populated) {
        return (
            <div className="px-[20px] md:px-[60px]">
                <h3>Loading...</h3>
            </div>
        );
    }
    else if (job != undefined) {
        const similarJobs = jobs.filter((j) => j.id != job.id && j.tags.some((tag) => job.tags.includes(tag)));

        return (
            <div className="px-[20px] md:px-[60px] flex flex-col md:flex-row gap-[24px] mb-[20px] ">
                <div className="flex flex-col gap-[16px] flex-[2]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img className="w-full aspect-[8/1] rounded-[8px] object-cover" alt={"Cover Image "} src={job.coverImage} />
                    <div className="flex flex-row justify-between flex-wrap">
                        <h1 className="text-[40px] font-inter tracking-normal">{job.title}</h1>
                        <div className="flex flex-row gap-[10px]">
                            <Bookmark job={job} className="bg-white-400 rounded-[8px] p-[12px]" />
                            {role == "student" && new Date() < job.closeDate && <Link href={`/jobs/${job.id}/apply`}>
                                <Button>Apply (Closes {job.closeDate.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: new Date(job.closeDate).getFullYear() === new Date().getFullYear() ? undefined : 'numeric' })})</Button>
                            </Link>}

                        </div>
                    </div>
                    <div className="flex flex-col gap-[16px] md:flex-row justify-between">
                        <div className="flex flex-col gap-[5px]">
                            <h5 className="font-semibold">
                                ${job.salary.toLocaleString()}
                                <span className="text-white-700">/mo</span>
                            </h5>
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
                        </div>
                        <div className="flex flex-row gap-[5px]">
                            <div className="flex flex-col gap-[5px] md:text-right">
                                <h5>Google</h5>
                                <div className="text-white-700 text-[14px]">
                                    {job.company.tags.join(" • ")}
                                </div>
                            </div>
                            <div className="flex flex-row h-full items-center justify-center">
                                <div className="bg-white-400 rounded-full h-[51px] w-[51px] flex items-center justify-center">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src={job.company.logo} alt={job.company.name} className="w-[40px] h-[40px] rounded-full object-contain" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="font-bold">Description</div>
                        <div className="text-white-700">{job.longDescription}</div>
                    </div>
                    <div>
                        <div className="font-bold">Responsibilities</div>
                        <ul className="text-white-700">{job.responsibilities.map((value, index) => <li key={index}>• {value}</li>)}</ul>
                    </div>
                    <div>
                        <div className="font-bold">Skills</div>
                        <ul className="text-white-700">{job.skills.map((value, index) => <li key={index}>• {value}</li>)}</ul>
                    </div>
                </div>
                <div>
                    <h5 className="text-white-800">Similar Jobs</h5>
                    <div className="flex flex-col gap-[16px] mt-[8px] flex-1">
                        {similarJobs.length > 0 ? similarJobs.map((job, index) => <CondensedJobCard key={index} job={job} />) : <div>No similar jobs found</div>}
                    </div>
                </div>
            </div>
        )
    }
    else {
        setTimeout(() => {
            redirect('/jobs');
        }, 5000)
        return (
            <div className="px-[20px] md:px-[60px]">
                <h3>Job not found. Redirecting...</h3>
            </div>
        );
    }
}
"use client";

import JobsContext from '@/repositories/jobsContext';
import { useParams, redirect } from 'next/navigation';
import React, { useContext } from 'react';

export default function Posting() {
    const { jobs, populated } = useContext(JobsContext);
    const params = useParams();

    const job = jobs.find((job) => job.id === params.id);

    console.log("Job:", job?.id);

    if (!populated) {
        return (
            <div className="px-[60px]">
                <h3>Loading...</h3>
            </div>
        );
    }
    else if (job != undefined) {
        return (
            <div className="px-[60px]">
                {/* TODO: Add posting image*/}
                <h1 className="text-[40px] font-inter tracking-normal">{job.title}</h1>
            </div>
        )
    }
    else {
        setTimeout(() => {
            redirect('/jobs');
        }, 5000)
        return (
            <div className="px-[60px]">
                <h3>Job not found. Redirecting...</h3>
            </div>
        );
    }
}
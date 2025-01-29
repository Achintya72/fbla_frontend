"use client";

import { JobForm } from "@/app/(pages)/jobs/[id]/edit/page";
import { Job } from "@/models/jobs";
import JobsContext from "@/repositories/jobsContext";
import { mockJobs } from "@/repositories/mockData";
import delay from "@/utils/delay";
import { FirebaseError } from "firebase/app";
import { Dispatch, SetStateAction, useContext } from "react";

export const fetchJobs: () => Promise<Job[] | undefined> = async (
    setError?: Dispatch<SetStateAction<string>>,
    setLoading?: Dispatch<SetStateAction<boolean>>,
) => {
    try {
        setLoading?.(true);
        await delay(1000);
        return mockJobs;
    } catch (e) {
        if (e instanceof FirebaseError) {
            setError?.(e.message);
        }
        setError?.("An unknown error occurred.");
        return undefined;
    } finally {
        setLoading?.(false);
    }
};

export const useEditJob = () => {
    const { jobs, setJobs } = useContext(JobsContext);

    const editJob = (id: string, data: JobForm) => {
        const job = jobs.find((job) => job.id === id);
        if (job == undefined) {
            return;
        }
        const copy = jobs.slice();

        const index = jobs.indexOf(job);
        const date = typeof data.closeDate === 'string' ? new Date(data.closeDate) : data.closeDate;
        date.setHours(date.getHours() + 12);

        copy[index] = {
            ...job,
            ...data,
            closeDate: date
        };

        setJobs(copy);
    }

    return editJob;
}
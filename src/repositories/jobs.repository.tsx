"use client";
// Methods responsible for interacting with jobs in API

import { Job } from "@/models/jobs"
import { useMockData } from "@/serviceProviders/mockDataContext";
import delay from "@/utils/delay";


export const useJobQueries = () => {
    const { jobs } = useMockData();
    /**
     * @returns List of approved jobs
     */
    const getJobs: () => Promise<Job[]> = async () => {
        await delay(100);
        return jobs.filter(j => j.published);
    }

    return { getJobs };
}
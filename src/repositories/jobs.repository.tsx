"use client";
// Methods responsible for interacting with jobs in API

import { Job } from "@/models/jobs"
import { useMockData } from "@/serviceProviders/mockDataContext";
import delay from "@/utils/delay";


export const useJobRepo = () => {
    const { jobs } = useMockData();
    /**
     * @returns List of approved jobs
     */
    const getJobsRepo: () => Promise<Job[]> = async () => {
        await delay(100);
        return jobs;
    }

    return { getJobsRepo };
}
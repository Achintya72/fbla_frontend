"use client";
// Methods responsible for interacting with jobs in API

import { Job } from "@/models/jobs"
import { useMockData } from "@/serviceProviders/mockDataContext";
import delay from "@/utils/delay";

/**
 * @returns List of approved jobs
 */
export const getJobs: () => Promise<Job[]> = async () => {
    const { jobs } = useMockData();
    await delay(100);
    return jobs.filter(j => j.published);
}
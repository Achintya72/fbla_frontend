"use client";

import { useJobRepo } from "@/repositories/jobs.repository";
import { handleError, ServiceHandlers } from "./handlers";

export const useJobServices = () => {
    const { getJobsRepo } = useJobRepo();

    const getJobsService = async ({ setLoading, setError }: ServiceHandlers) => {
        try {
            setLoading?.(true);
            const response = await getJobsRepo();
            return response;
        } catch (e) {
            handleError(e, setError);
            return [];
        } finally {
            setLoading?.(false);
        }
    }

    return { getJobsService };
}
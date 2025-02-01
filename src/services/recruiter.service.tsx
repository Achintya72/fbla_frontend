"use client";

import { useRecruiterRepo } from "@/repositories/recruiter.repository";
import { handleError, ServiceHandlers } from "./handlers";
import { Job } from "@/models/jobs";
import { Comment, Progress } from "@/models/application";
import { useJobContext } from "@/serviceProviders/jobsContext";


export const useRecruiterService = () => {
    const { jobs, setJobs } = useJobContext();
    const {
        getRecruiterByIdRepo,
        createJobPostingRepo,
        updateJobPostingRepo,
        deleteJobPostingRepo,
        getRecruiterJobsRepo,
        getApplicationsForJobRepo,
        recruiterCommentOnApplicationRepo,
        changeApplicationStatusRepo,
        publishJobResultsRepo
    } = useRecruiterRepo();

    const getRecruiterService = async (id: string, { setError, setLoading }: ServiceHandlers) => {
        try {
            setLoading?.(true);
            const response = await getRecruiterByIdRepo(id);
            return response;
        } catch (e) {
            handleError(e, setError);
            return undefined;
        } finally {
            setLoading?.(false);
        }
    }

    const createJobService = async (job: Job, { setError, setLoading }: ServiceHandlers) => {
        try {
            setLoading?.(true);
            const response = await createJobPostingRepo(job);
            const newJobs = [...jobs, response];
            setJobs([...newJobs]);
            return response;
        } catch (e) {
            handleError(e, setError);
            return undefined;
        } finally {
            setLoading?.(false);
        }
    }

    const updateJobService = async (job: Job, { setError, setLoading }: ServiceHandlers) => {
        try {
            setLoading?.(true);
            const response = await updateJobPostingRepo(job);
            const jobIndex = jobs.findIndex(j => j.id === job.id);
            const newJobs = [...jobs];
            newJobs[jobIndex] = job;
            setJobs([...newJobs]);
            return response;
        } catch (e) {
            handleError(e, setError);
            return undefined;
        } finally {
            setLoading?.(false);
        }
    }

    const deleteJobService = async (job: Job, { setError, setLoading }: ServiceHandlers) => {
        try {
            setLoading?.(true);
            const response = await deleteJobPostingRepo(job);
            setJobs(prev => [...prev.filter(j => j.id !== job.id)]);
            return response;
        } catch (e) {
            handleError(e, setError);
            return undefined;
        } finally {
            setLoading?.(false);
        }
    }

    const getRecruiterJobsService = async (id: string, { setError, setLoading }: ServiceHandlers) => {
        try {
            setLoading?.(true);
            return await getRecruiterJobsRepo(id);
        } catch (e) {
            handleError(e, setError);
            return [];
        } finally {
            setLoading?.(false);
        }
    }

    const getApplicationsForJobService = async (id: string, { setError, setLoading }: ServiceHandlers) => {
        try {
            setLoading?.(true);
            return await getApplicationsForJobRepo(id);
        } catch (e) {
            handleError(e, setError);
            return [];
        } finally {
            setLoading?.(false);
        }
    }

    const recruiterCommentService = async (id: string, comment: Comment, { setError, setLoading }: ServiceHandlers) => {
        try {
            setLoading?.(true);
            return await recruiterCommentOnApplicationRepo(id, comment);
        } catch(e) {
            handleError(e, setError);
            return [];
        } finally {
            setLoading?.(false);
        }
    }

    const changeApplicationStatusService = async (id: string, status: Progress, { setError, setLoading }: ServiceHandlers) => {
        try {
            setLoading?.(true);
            await changeApplicationStatusRepo(id, status);
            return true;
        } catch(e) {
            handleError(e, setError);
            return false;
        } finally {
            setLoading?.(false);
        }
    }

    const publishJobResultsService = async (id: string, { setError, setLoading }: ServiceHandlers ) => {
        try {
            setLoading?.(true);
            await publishJobResultsRepo(id);
            const jobIndex = jobs.findIndex(j => j.id === id);
            if(jobIndex >= 0) {
                const newJob = {...jobs[jobIndex], studentFound: true};
                setJobs(prev => {
                    prev[jobIndex] = newJob;
                    return [...prev];
                })
            }
            return;
        } catch(e) {
            handleError(e, setError);
            return;
        } finally {
            setLoading?.(false);
        }
    } 

    return {
        getRecruiterService,
        createJobService,
        updateJobService,
        deleteJobService,
        getRecruiterJobsService,
        getApplicationsForJobService,
        recruiterCommentService,
        changeApplicationStatusService,
        publishJobResultsService
    };
}
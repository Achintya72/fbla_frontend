"use client";
// Collection of methods interacting with API for Recruiters

import { Application, Comment, Progress, RecruiterApplication } from "@/models/application";
import { Job } from "@/models/jobs";
import { RecruiterData } from "@/models/recruiter";
import { useMockData } from "@/serviceProviders/mockDataContext";
import delay from "@/utils/delay";

export const useRecruiterQueries = () => {
    const { recruiters, jobs, setJobs, applications, setApplications } = useMockData();

    /**
     * @returns RecruiterData or null
     */
    const getRecruiterById: (id: string) => Promise<RecruiterData> = async (id) => {
        await delay(1000);
        const found = recruiters.find(r => r.id === id);
        if (found) {
            return found;
        }
        throw new Error("Recruiter not found");
    }

    /**
     * Creates a new job posting
     * @returns Created Job Posting or null
     */
    const createJobPosting: (job: Job) => Promise<Job> = async (job) => {
        await delay(1000);
        const newJobs = [...jobs, job];
        setJobs([...newJobs]);
        return job;

    }

    /**
     * Updates specific job posting
     * @returns Updating Job posting
     */
    const updateJobPosting: (job: Job) => Promise<Job> = async (job) => {
        await delay(1000);
        const foundIndex = jobs.findIndex(j => j.id === job.id);
        if (foundIndex >= 0) {
            setJobs(prev => {
                prev[foundIndex] = job;
                return [...prev];
            });
            return job;
        }
        throw new Error("Job not found");
    }

    /**
     * Deletes a job posting
     */
    const deleteJobPosting: (job: Job) => Promise<void> = async (job) => {
        await delay(1000);
        const foundIndex = jobs.findIndex(j => j.id === job.id);
        if (foundIndex >= 0) {
            setJobs(prev => {
                return [...prev.filter(j => j.id !== job.id)];
            });
            return;
        }
        throw new Error("Job not found");

    }

    /**
     * @returns List of Jobs created by Recruiter
     */
    const getRecruiterJobs: (recruiterId: string) => Promise<Job[]> = async (id) => {
        await delay(1000);
        const foundRecruiter = recruiters.find(r => r.id === id);
        if (foundRecruiter) {
            return jobs.filter(job => job.recruiterId === id);
        }
        throw new Error("Recruiter not found");
    }

    /**
     * @returns List of Submitted Applications for Job
     */
    const getApplicationsForJob: (jobId: string) => Promise<RecruiterApplication[]> = async (id) => {
        await delay(1000);
        const job = jobs.find(j => j.id === id);
        if (job) {
            return applications.filter(a => a.job === id && a.submitted).map(a => a as RecruiterApplication);
        }
        throw new Error("Job not found");
    }

    /**
     * Adds comment to a specific application
     * @returns Updated list of recruiterComments
     */
    const recruiterCommentOnApplication: (applicationId: string, comment: Comment) => Promise<Comment[]> = async (appId, comment) => {
        await delay(1000);
        const foundIndex = applications.findIndex(a => a.id === appId);
        if (foundIndex >= 0) {
            const newComments = [...applications[foundIndex].recruiterComments, comment];
            setApplications(prev => {
                prev[foundIndex].recruiterComments = newComments;
                return prev;
            })
            return newComments;
        }
        throw new Error("Application not found");
    }

    /**
     * Changes student's application status (rejected, accepted, not-decided)
     */
    const changeApplicationStatus: (applicationId: string, status: Progress) => Promise<void> = async (appId, status) => {
        await delay(1000);
        const foundIndex = applications.findIndex(a => a.id === appId);
        if (foundIndex >= 0) {
            setApplications(prev => {
                prev[foundIndex].status = status;
                return [...prev];
            });
            return;
        }
        throw new Error("Application not found");
    }

    /**
     * Sets Applications' status to recruiter status for all submitted applications
     */
    const publishJobResults: (jobId: string) => Promise<void> = async (id) => {
        await delay(1000);
        const jobIndex = jobs.findIndex(j => j.id === id);
        if (jobIndex >= 0) {
            const newApplications: Application[] = applications.map(a => ({
                ...a,
                status: a.recruiterClassification
            }));
            setApplications([...newApplications]);
            return;
        }
        throw new Error("Job not found");
    }

    return {
        getRecruiterById,
        createJobPosting,
        updateJobPosting,
        deleteJobPosting,
        getRecruiterJobs,
        getApplicationsForJob,
        recruiterCommentOnApplication,
        changeApplicationStatus,
        publishJobResults
    };
}
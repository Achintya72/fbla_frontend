"use client";
// Collection of methods interacting with API for Recruiters

import { Application, Comment, Progress, RecruiterApplication } from "@/models/application";
import { Job } from "@/models/jobs";
import { RecruiterData } from "@/models/recruiter";
import { useMockData } from "@/serviceProviders/mockDataContext";
import delay from "@/utils/delay";
import { applications } from "../utils/mockDB";

/**
 * @returns RecruiterData or null
 */
export const getRecruiterById: (id: string) => Promise<RecruiterData> = async (id) => {
    const { recruiters } = useMockData();
    await delay(1000);
    const found = recruiters.find(r => r.id === id);
    if(found) {
        return found;
    }
    throw new Error("Recruiter not found");
} 

/**
 * Creates a new job posting
 * @returns Created Job Posting or null
 */
export const createJobPosting: (job: Job) => Promise<Job> = async (job) => {
    const { jobs, setJobs } = useMockData();
    await delay(1000);
    const newJobs = [...jobs, job];
    setJobs([...newJobs]);
    return job;

}

/**
 * Updates specific job posting
 * @returns Updating Job posting
 */
export const updateJobPosting: (job: Job) => Promise<Job> = async (job) => {
    const { setJobs, jobs } = useMockData();
    await delay(1000);
    const foundIndex = jobs.findIndex(j => j.id === job.id);
    if(foundIndex >= 0) {
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
export const deleteJobPosting: (job: Job) => Promise<void> = async (job) => {
    const { jobs, setJobs } = useMockData();
    await delay(1000);
    const foundIndex = jobs.findIndex(j => j.id === job.id);
    if(foundIndex >= 0) {
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
export const getRecruiterJobs: (recruiterId: string) => Promise<Job[]> = async (id) => {
    const { recruiters, jobs } = useMockData();
    await delay(1000);
    const foundRecruiter = recruiters.find(r => r.id === id);
    if(foundRecruiter) {
        return jobs.filter(job => job.recruiterId === id);
    }
    throw new Error("Recruiter not found");
}

/**
 * @returns List of Submitted Applications for Job
 */
export const getApplicationsForJob: (jobId: string) => Promise<RecruiterApplication[]> = async (id) => {
    const { jobs, applications } = useMockData();
    await delay(1000);
    const job = jobs.find(j => j.id === id);
    if(job) {
        return applications.filter(a => a.job === id && a.submitted).map(a => a as RecruiterApplication);
    }
    throw new Error("Job not found");
}

/**
 * Adds comment to a specific application
 * @returns Updated list of recruiterComments
 */
export const recruiterCommentOnApplication: (applicationId: string, comment: Comment) => Promise<Comment[]> = async (appId, comment) => {
    const { applications, setApplications } = useMockData();
    await delay(1000);
    const foundIndex = applications.findIndex(a => a.id === appId);
    if(foundIndex >= 0) {
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
export const changeApplicationStatus: (applicationId: string, status: Progress) => Promise<void> = async (appId, status) => {
    const { applications, setApplications } = useMockData();
    await delay(1000);
    const foundIndex = applications.findIndex(a => a.id === appId);
    if(foundIndex >= 0) {
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
export const publishJobResults: (jobId: string) => Promise<void> = async (id) => {
    const { jobs, applications, setApplications } = useMockData();
    await delay(1000);
    const jobIndex = jobs.findIndex(j => j.id === id);
    if(jobIndex >= 0) {
        const newApplications: Application[] = applications.map(a => ({
            ...a,
            status: a.recruiterClassification
        }));
        setApplications([...newApplications]);
        return;
    }
    throw new Error("Job not found");
}


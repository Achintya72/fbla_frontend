// Collection of methods interacting with API for Recruiters

import { Comment, RecruiterApplication } from "@/models/application";
import { Job } from "@/models/jobs";
import { RecruiterData } from "@/models/recruiter";

/**
 * @returns RecruiterData or null
 */
export const getRecruiterById: (id: string) => Promise<RecruiterData | null> = async () => {
    return null;
} 

/**
 * Creates a new job posting
 * @returns Created Job Posting or null
 */
export const createJobPosting: (job: Job) => Promise<Job | null> = async () => {
    return null;
}

/**
 * Updates specific job posting
 * @returns Updating Job posting
 */
export const updateJobPosting: (job: Job) => Promise<Job | null> = async () => {
    return null;
}

/**
 * Deletes a job posting
 */
export const deleteJobPosting: (job: Job) => Promise<void> = async () => {
    
}

/**
 * @returns List of Jobs created by Recruiter
 */
export const getRecruiterJobs: (recruiterId: string) => Promise<Job[]> = async () => {
    return []
}

/**
 * @returns List of Submitted Applications for Job
 */
export const getApplicationsForJob: (jobId: string) => Promise<RecruiterApplication[]> = async () => {
    return [];
}

/**
 * Adds comment to a specific application
 * @returns Updated list of recruiterComments
 */
export const commentOnApplication: (applicationId: string) => Promise<Comment[]> = async () => {
    return [];
}

/**
 * Changes student's application status (rejected, accepted, not-decided)
 */
export const changeApplicationStatus: (applicationId: string, status: boolean | null) => Promise<void> = async () => {
}

/**
 * Sets Applications' status to recruiter status for all submitted applications
 */
export const publishJobResults: (jobId: string) => Promise<void> = async () => {
}


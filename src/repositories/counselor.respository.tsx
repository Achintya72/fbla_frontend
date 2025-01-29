// Collection of methods responsible for handling Counselor's data with API

import { Application, Comment, CounselorApplication } from "@/models/application";
import { CounselorData } from "@/models/counselor";
import { Job } from "@/models/jobs";
import { RecruiterData } from "@/models/recruiter";

/**
 * Fetch's counselor's data
 * @returns CounselorData or null
 */
export const getCounselorById: (id: string) => Promise<CounselorData | null> = async () => {
    return null;
}

/**
 * Verifies a student
 * and removes them from endorsementRequests
 */
export const endorseStudent: (studentId: string) => Promise<void> = async () => {
}


/**
 * Removes endorsement request
 */
export const denyEndorsement: (studentId: string) => Promise<void> = async () => {
}

/**
 * @returns List of Recruiters who are unverified
 */
export const getUnVerifiedRecruiters: () => Promise<RecruiterData[]> = async () => {
    return [];
}

/**
 * Sets verified to true in Recruiter Doc
 * @returns Returns remaining list of unverified recruiters
 */
export const verifyRecruiter: (id: string) => Promise<RecruiterData[]> = async () => {
    return [];    
}


/**
 * @returns List of un-approved Job Postings
 */
export const getUnverifiedPostings: () => Promise<Job[]> = async () => {
    return []
}

/**
 * Verifies Job
 * @returns Remaining list of un-approved Job Postings
 */
export const approvePosting: (id: string) => Promise<Job[]> = async () => {
    return []
}

/**
 * Deletes a Job Posting
 */
export const deletePosting: (id: string) => Promise<void> = async () => {

}

/**
 * Add counselor's comments to student's application
 */
export const commentOnApplication: (applicationId: string, comment: Comment) => Promise<void> = async () => {

}

/**
 * @returns List of applications that requested counselor's review
 */
export const getApplicationsForReview: (counselorId: string) => Promise<CounselorApplication[]> = async () => {
    return []
}

/**
 * Removes given application from counselor's application review list
 * @returns Remaining list of un-approved applications
 */
export const completeApplicationReview: (applicationId: string, counselorId: string) => Promise<CounselorApplication[]> = async () => {
    return [];
}

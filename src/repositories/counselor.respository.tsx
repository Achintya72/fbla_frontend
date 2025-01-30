"use client";
// Collection of methods responsible for handling Counselor's data with API

import { Application, Comment, CounselorApplication } from "@/models/application";
import { CounselorData } from "@/models/counselor";
import { Job } from "@/models/jobs";
import { RecruiterData } from "@/models/recruiter";
import { useMockData } from "@/serviceProviders/mockDataContext";
import delay from "@/utils/delay";
import { cp } from "fs";
import { counselor } from "./mockData";

/**
 * Fetch's counselor's data
 * @returns CounselorData or null
 */
export const getCounselorById: (id: string) => Promise<CounselorData> = async (id) => {
    const { counselors } = useMockData();
    await delay(1000);
    const found = counselors.find(c => c.id === id);
    if(found) {
        return found;
    }
    throw new Error("Counselor not found");
}

/**
 * Verifies a student
 * and removes them from endorsementRequests
 */
export const endorseStudent: (studentId: string) => Promise<void> = async (id) => {
    const { setStudents, students, counselors, setCounselors} = useMockData();
    await delay(1000);
    const student = students.find(s => s.id === id);
    const studentIndex = students.findIndex(s => s.id === id);
    if(student) {
        const counselorIndex = counselors.findIndex(c => c.id === student.counselor);
        if(counselorIndex >= 0) {
            setStudents(prev => {
                prev[studentIndex].verified = true;
                return [...prev];
            });
            setCounselors(prev => {
                prev[counselorIndex].endorsementRequests = prev[counselorIndex].endorsementRequests.filter(s => s !== id);
                return [...prev];
            });
            return;
        }
        throw new Error("Counselor not found");
    }
    throw new Error("Student not found");
}


/**
 * Removes endorsement request
 */
export const denyEndorsement: (studentId: string) => Promise<void> = async (id) => {
    const { students, counselors, setCounselors } = useMockData();
    await delay(1000);
    const student = students.find(s => s.id === id);
    if(student) {
        const counselorIndex = counselors.findIndex(c => c.id === student.counselor);
        if(counselorIndex >= 0) {
            setCounselors(prev => {
                prev[counselorIndex].endorsementRequests = prev[counselorIndex].endorsementRequests.filter(r => r !== id);
                return [...prev];
            });
            return;
        }
        throw new Error("Counselor not found");
    }
    throw new Error("Student not found");
}

/**
 * @returns List of Recruiters who are unverified
 */
export const getUnVerifiedRecruiters: () => Promise<RecruiterData[]> = async () => {
    const { recruiters } = useMockData();
    await delay(1000);
    return recruiters.filter(r => !r.verified);
}

/**
 * Sets verified to true in Recruiter Doc
 * @returns Returns remaining list of unverified recruiters
 */
export const verifyRecruiter: (id: string) => Promise<RecruiterData[]> = async (id) => {
    const { recruiters, setRecruiters } = useMockData();
    await delay(1000);
    const recruiterIndex = recruiters.findIndex(r => r.id === id);
    if(recruiterIndex >= 0) {
        setRecruiters(prev => {
            prev[recruiterIndex].verified = true;
            return [...prev];
        });
        return recruiters.filter(r => !r.verified && r.id !== id);
    }
    throw new Error("Recruiter not found");
}


/**
 * @returns List of un-approved Job Postings
 */
export const getUnverifiedPostings: () => Promise<Job[]> = async () => {
    const { jobs } = useMockData();
    await delay(1000);
    return jobs.filter(job => !job.published);
}

/**
 * Verifies Job
 * @returns Remaining list of un-approved Job Postings
 */
export const approvePosting: (id: string) => Promise<Job[]> = async (id) => {
    const { jobs, setJobs } = useMockData();
    await delay(1000);
    const jobIndex = jobs.findIndex(j => j.id === id);
    if(jobIndex >= 0) {
        setJobs(prev => {
            prev[jobIndex].published = true;
            return [...prev];
        });
        return jobs.filter(j => j.id !== id && !j.published);
    }
    throw new Error("Job not found");
}

/**
 * Deletes a Job Posting
 */
export const deletePosting: (id: string) => Promise<void> = async (id) => {
    const { jobs, setJobs } = useMockData();
    await delay(1000);
    const jobsIndex = jobs.findIndex(j => j.id === id);
    if(jobsIndex >= 0) {
        setJobs(prev => [...prev.filter(j => j.id !== id)]);
        return;
    }
    throw new Error("Job not found");
}

/**
 * Add counselor's comments to student's application
 */
export const counselorCommentOnApplication: (applicationId: string, comment: Comment) => Promise<void> = async (appId, comment) => {
    const { applications, setApplications } = useMockData();
    await delay(1000);
    const foundIndex = applications.findIndex(prev => prev.id == appId);
    if(foundIndex >= 0) {
        const newComments = [...applications[foundIndex].counselorComments, comment];
        setApplications(prev => {
            prev[foundIndex].counselorComments = newComments;
            return [...prev];
        });
        return;
    }
    throw new Error("Application not found");
}

/**
 * @returns List of applications that requested counselor's review
 */
export const getApplicationsForReview: (counselorId: string) => Promise<CounselorApplication[]> = async (id) => {
    const { counselors, applications, setApplications } = useMockData();
    await delay(1000);
    const counselor = counselors.find(c => c.id === id);
    if(counselor) {
        let reviewApps: CounselorApplication[] = [];
        counselor.applicationReviews.forEach(app => {
            const foundApp = applications.find(a => a.id === app);
            if(foundApp) {
                reviewApps.push(foundApp as CounselorApplication);
            } else {
                throw new Error(`Application ${app} not found`);
            }
        });
        return reviewApps;
    }
    throw new Error("Counselor not found");
}

/**
 * Removes given application from counselor's application review list
 * @returns Remaining list of un-approved applications
 */
export const completeApplicationReview: (applicationId: string) => Promise<CounselorApplication[]> = async (appId) => {
    const { counselors, applications, students, setCounselors } = useMockData();
    await delay(1000);
    const application = applications.find(a => a.id === appId);
    if(application) {
        const student = students.find(s => s.id === application.student);
        if(student) {
            const counselorIndex = counselors.findIndex(c => c.id == student.counselor);
            if(counselorIndex >= 0) {
                setCounselors(prev => {
                    prev[counselorIndex].applicationReviews = prev[counselorIndex].applicationReviews.filter(r => r !== appId);
                    return [...prev];
                })
                return counselors[counselorIndex].applicationReviews.filter(a => a !== appId).map(a => {
                    const foundApplication = applications.find(app => app.id === a);
                    if(foundApplication) {
                        return foundApplication as CounselorApplication;
                    }
                    throw new Error(`Application ${a} not found`);
                });
            }
            throw new Error("Counselor not found");
        }
        throw new Error("Student not found");
    }
    throw new Error("Application not found");
}

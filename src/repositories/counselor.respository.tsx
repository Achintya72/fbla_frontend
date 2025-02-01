"use client";
// Collection of methods responsible for handling Counselor's data with API

import { Comment, CounselorApplication } from "@/models/application";
import { CounselorData } from "@/models/counselor";
import { Job } from "@/models/jobs";
import { RecruiterData } from "@/models/recruiter";
import JobsContext from "@/serviceProviders/jobsContext";
import { useMockData } from "@/serviceProviders/mockDataContext";
import delay from "@/utils/delay";
import { useContext } from "react";

export default function useCounselorRepo() {
    const { setStudents, counselors, applications, students, setCounselors, recruiters, setRecruiters, setApplications } = useMockData();
    const { jobs, setJobs } = useContext(JobsContext);

    /**
     * Fetch's counselor's data
     * @returns CounselorData or null
     */
    const getCounselorRepo: (id: string) => Promise<CounselorData> = async (id) => {
        await delay(1000);
        const found = counselors.find(c => c.id === id);
        if (found) {
            return found;
        }
        throw new Error("Counselor not found");
    }

    /**
     * Verifies a student
     * and removes them from endorsementRequests
     */
    // TODO: return remaining endorsements
    const endorseStudentRepo: (studentId: string) => Promise<void> = async (id) => {
        await delay(1000);
        const student = students.find(s => s.id === id);
        const studentIndex = students.findIndex(s => s.id === id);
        if (student) {
            const counselorIndex = counselors.findIndex(c => c.id === student.counselor);
            if (counselorIndex >= 0) {
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
    // TODO: return remaining endorsements
    const denyEndorsementRepo: (studentId: string) => Promise<void> = async (id) => {
        await delay(1000);
        const student = students.find(s => s.id === id);
        if (student) {
            const counselorIndex = counselors.findIndex(c => c.id === student.counselor);
            if (counselorIndex >= 0) {
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
    const getUnVerifiedRecruitersRepo: () => Promise<RecruiterData[]> = async () => {
        await delay(1000);
        return recruiters.filter(r => !r.verified);
    }

    /**
     * Sets verified to true in Recruiter Doc
     * @returns Returns remaining list of unverified recruiters
     */
    const verifyRecruiterRepo: (id: string) => Promise<RecruiterData[]> = async (id) => {
        await delay(1000);
        const recruiterIndex = recruiters.findIndex(r => r.id === id);
        if (recruiterIndex >= 0) {
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
    const getUnverifiedPostingsRepo: () => Promise<Job[]> = async () => {
        await delay(1000);
        return jobs.filter(job => !job.published);
    }

    /**
     * Verifies Job
     * @returns Remaining list of un-approved Job Postings
     */
    const approvePostingRepo: (id: string) => Promise<Job[]> = async (id) => {
        await delay(1000);
        const jobIndex = jobs.findIndex(j => j.id === id);
        if (jobIndex >= 0) {
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
    const deletePostingRepo: (id: string) => Promise<void> = async (id) => {
        await delay(1000);
        const jobsIndex = jobs.findIndex(j => j.id === id);
        if (jobsIndex >= 0) {
            setJobs(prev => [...prev.filter(j => j.id !== id)]);
            return;
        }
        throw new Error("Job not found");
    }

    /**
     * Add counselor's comments to student's application
     */
    // TODO: Return new total of counselor's comments
    const counselorCommentOnApplicationRepo: (applicationId: string, comment: Comment) => Promise<void> = async (appId, comment) => {
        await delay(1000);
        const foundIndex = applications.findIndex(prev => prev.id == appId);
        if (foundIndex >= 0) {
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
    const getApplicationsForReviewRepo: (counselorId: string) => Promise<CounselorApplication[]> = async (id) => {
        await delay(1000);
        const counselor = counselors.find(c => c.id === id);
        if (counselor) {
            const reviewApps: CounselorApplication[] = [];
            counselor.applicationReviews.forEach(app => {
                const foundApp = applications.find(a => a.id === app);
                if (foundApp) {
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
    const completeApplicationReviewRepo: (applicationId: string) => Promise<CounselorApplication[]> = async (appId) => {
        await delay(1000);
        const application = applications.find(a => a.id === appId);
        if (application) {
            const student = students.find(s => s.id === application.student);
            if (student) {
                const counselorIndex = counselors.findIndex(c => c.id == student.counselor);
                if (counselorIndex >= 0) {
                    setCounselors(prev => {
                        prev[counselorIndex].applicationReviews = prev[counselorIndex].applicationReviews.filter(r => r !== appId);
                        return [...prev];
                    })
                    return counselors[counselorIndex].applicationReviews.filter(a => a !== appId).map(a => {
                        const foundApplication = applications.find(app => app.id === a);
                        if (foundApplication) {
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

    return {
        getCounselorRepo,
        endorseStudentRepo,
        denyEndorsementRepo,
        getUnVerifiedRecruitersRepo,
        verifyRecruiterRepo,
        getUnverifiedPostingsRepo,
        approvePostingRepo,
        deletePostingRepo,
        counselorCommentOnApplicationRepo,
        getApplicationsForReviewRepo,
        completeApplicationReviewRepo
    }
}
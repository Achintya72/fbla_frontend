"use client";

import { Application, StudentApplication } from "@/models/application";
import { CoverLetter, JobReference, StudentData, StudentPage } from "@/models/student";
import { useMockData } from "@/serviceProviders/mockDataContext";
import delay from "@/utils/delay";

// Collection of methods responsible for handle API calls related to the student
export const useStudentRepo = () => {
    const { applications, setApplications, students, setStudents, counselors, setCounselors, createApplicationId, setJobs, jobs } = useMockData();

    /**
     * Responsible for fetching Student from DB
     * that has the given id
     * @param id 
     * @returns StudentData or null
    */
    const getStudentByIdRepo: (id: string) => Promise<StudentData> = async (id) => {
        await delay(1000);
        const found = students.find(s => s.id === id);
        if (found) {
            return found;
        }
        throw new Error("User you're looking for cannot be found");

    }

    /**
     * Responsible for fetching Student's Profile from DB
     * @returns StudentPage or null
     */
    const getStudentPageRepo: (id: string) => Promise<StudentPage> = async (id) => {
        await delay(1000);
        const found = students.find(s => s.id === id);
        if (found) {
            return found.page;
        }
        throw new Error("User you're looking for cannot be found");

    }

    /**
     * Responsible for creating Student's Data
     * on initial login
     * @returns Create StudentData or null
    */
    const createStudentRepo: (student: StudentData) => Promise<StudentData> = async (student) => {
        await delay(1000);
        const newStudents = [...students, student];
        setStudents([...newStudents]);
        return student;
    }


    /**
     * Responsible for updating the student's data
     * @returns Updated StudentData or null
     */
    const updateStudentDataRepo: (data: StudentData) => Promise<StudentData> = async (data) => {
        await delay(1000);
        const foundIndex = students.findIndex(s => s.id === data.id);
        if (foundIndex >= 0) {
            setStudents(prev => {
                prev[foundIndex] = { ...data };
                return [...prev];
            });
            return data;
        }
        throw new Error("User you're looking for cannot be found");
    }


    /**
     * Responsible for getting a student's application
     * for a specific job.
     * @returns StudentApplication or null
    */
    const getStudentApplicationForJobRepo: (stuId: string, jobId: string) => Promise<StudentApplication> = async (stuId, jobId) => {
        await delay(1000);
        const found = applications.find(a => a.student === stuId && a.job === jobId);
        if (found) {
            return found as StudentApplication;
        }
        throw new Error(`Application for ${jobId} job by ${stuId} student`);
    }

    /**
     * Responsible for updating a student's
     * profile page
     * @returns updated StudentPage or null
     */
    const updatePageRepo: (stuId: string, page: StudentPage) => Promise<StudentPage> = async (stuId, page) => {
        await delay(1000);
        const foundIndex = students.findIndex(s => s.id === stuId);
        if (foundIndex >= 0) {
            setStudents(prev => {
                prev[foundIndex].page = page;
                return [...prev];
            })
            return page;
        }
        throw new Error("User not found");
    }

    /**
     * Responsible for a student application
     * for a specific job
     * @returns Created StudentApplication or null
    */
    const createStudentApplicationRepo: (application: StudentApplication) => Promise<StudentApplication> = async (application) => {
        await delay(1000);
        const studentIndex = students.findIndex(s => s.id === application.student);
        const jobsIndex = jobs.findIndex(j => j.id === application.job);
        if(studentIndex >= 0) {
            const id = createApplicationId();
            const newApplications = [...applications, {
                ...application,
                id,
                recruiterComments: [],
                recruiterClassification: "in-progress",
            } as Application]
            setApplications([...newApplications]);
            const newJobApplications = [...jobs[jobsIndex].applications, id];
            setJobs(prev => {
                prev[jobsIndex].applications = newJobApplications;
                return [...prev]
            });
            const newJobs: JobReference[] = [...students[studentIndex].jobReferences, { id: application.job, status: application.status }];
            setStudents(prev => {
                prev[studentIndex].jobReferences = newJobs;
                return [...prev];
            });

            return application;
        }
        throw new Error("Student not found");
    }

    /**
     * Responsible for updating a student's
     * pre-existing application
     * @returns Updated StudentApplication or null
     */
    const updateStudentApplicationRepo: (application: StudentApplication) => Promise<StudentApplication> = async (application) => {
        await delay(1000);
        const foundIndex = applications.findIndex(a => a.id === application.id);
        if (foundIndex >= 0) {
            setApplications(prev => {
                prev[foundIndex] = { ...prev[foundIndex], ...application };
                return [...prev];
            });
            return application;
        }
        throw new Error("Application not found");
    }

    /**
     * Adds user's application to counselor's application reviews list
    */
    const requestApplicationReviewRepo: (applicationId: string, counselorId: string) => Promise<void> = async (appId, counselorId) => {
        await delay(1000);
        const counselorIndex = counselors.findIndex(c => c.id === counselorId);
        const application = applications.find(a => a.id === appId);
        if (application) {
            if (counselorIndex >= 0) {
                const newApplicationReviews = [...counselors[counselorIndex].applicationReviews, appId];
                setCounselors(prev => {
                    prev[counselorIndex].applicationReviews = [...newApplicationReviews];
                    return [...prev];
                });
                return;
            }
            throw new Error("Counselor not found");
        }
        throw new Error("Application not found");
    }

    /**
     * Adds student id to counselor's endorsementRequests
    */
    const requestEndorsementRepo: (studentId: string, counselorId: string) => Promise<void> = async (sId, cId) => {
        await delay(1000);
        const counselorIndex = counselors.findIndex(c => c.id === cId);
        const student = students.find(s => s.id === sId);
        if (student) {
            if (counselorIndex >= 0) {
                const newEndorsements = [...counselors[counselorIndex].endorsementRequests, sId];
                setCounselors(prev => {
                    prev[counselorIndex].endorsementRequests = newEndorsements;
                    return [...prev];
                });
                return;
            }
            throw new Error("Counselor doesn't exist");
        }
        throw new Error("Student doesn't exist");
    }

    /**
     * Adds a cover letter to the student's profile
     */
    const addCoverLetterRepo: (studentId: string, coverLetter: CoverLetter) => Promise<boolean> = async (sId, coverLetter) => {
        await delay(1000);
        const student = students.find(s => s.id === sId);
        if(student) {
            const newCoverLetters = [...student.coverLetters, coverLetter];
            const newData = {...student, coverLetters: newCoverLetters};

            try {
                await updateStudentDataRepo(newData);
            }
            catch (e) {
                throw e;
            }

            return true;
        }
        return false;
    }

    return {
        getStudentByIdRepo,
        getStudentPageRepo,
        createStudentRepo,
        updateStudentDataRepo,
        updatePageRepo,
        getStudentApplicationForJobRepo,
        createStudentApplicationRepo,
        updateStudentApplicationRepo,
        requestApplicationReviewRepo,
        requestEndorsementRepo,
        addCoverLetterRepo
    }

}
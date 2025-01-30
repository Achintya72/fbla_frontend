"use client";

import { Application, StudentApplication } from "@/models/application";
import { StudentData, StudentPage } from "@/models/student";
import { useMockData } from "@/serviceProviders/mockDataContext";
import delay from "@/utils/delay";

// Collection of methods responsible for handle API calls related to the student

/**
 * Responsible for fetching Student from DB
 * that has the given id
 * @param id 
 * @returns StudentData or null
 */
export const getStudentById: (id: string) => Promise<StudentData> = async (id) => {
    const { students } = useMockData();
    await delay(1000);
    let found = students.find(s => s.id === id);
    if (found) {
        return found;
    }
    throw new Error("User you're looking for cannot be found");

}

/**
 * Responsible for fetching Student's Profile from DB
 * @returns StudentPage or null
 */
export const getStudentPage: (id: string) => Promise<StudentPage> = async (id) => {
    const { students } = useMockData();
    await delay(1000);
    let found = students.find(s => s.id === id);
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
export const createStudent: (student: StudentData) => Promise<StudentData> = async (student) => {
    const { students, setStudents } = useMockData();
    await delay(1000);
    const newStudents = [...students, student];
    setStudents([...newStudents]);
    return student;
}


/**
 * Responsible for updating the student's data
 * @returns Updated StudentData or null
 */
export const updateStudentData: (data: StudentData) => Promise<StudentData> = async (data) => {
    const { students, setStudents } = useMockData();
    await delay(1000);
    let foundIndex = students.findIndex(s => s.id === data.id);
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
export const getStudentApplicationForJob: (stuId: string, jobId: string) => Promise<StudentApplication> = async (stuId, jobId) => {
    const { applications } = useMockData();
    await delay(1000);
    let found = applications.find(a => a.student === stuId && a.job === jobId);
    if (found) {
        found as StudentApplication;
    }
    throw new Error(`Application for ${jobId} job by ${stuId} student`);
}

/**
 * Responsible for updating a student's
 * profile page
 * @returns updated StudentPage or null
 */
export const updatePage: (stuId: string, page: StudentPage) => Promise<StudentPage> = async (stuId, page) => {
    const { students, setStudents } = useMockData();
    await delay(1000);
    let foundIndex = students.findIndex(s => s.id === stuId);
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
export const createStudentApplication: (application: StudentApplication) => Promise<StudentApplication> = async (application) => {
    const { applications, setApplications } = useMockData();
    await delay(1000);
    const newApplications = [...applications, {
        ...application,
        recruiterComments: [],
        recruiterClassification: "in-progress",
    } as Application]
    setApplications([...newApplications]);
    return application;
}

/**
 * Responsible for updating a student's
 * pre-existing application
 * @returns Updated StudentApplication or null
 */
export const updateStudentApplication: (application: StudentApplication) => Promise<StudentApplication> = async (application) => {
    const { applications, setApplications } = useMockData();
    await delay(1000);
    let foundIndex = applications.findIndex(a => a.id === application.id);
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
export const requestApplicationReview: (applicationId: string, counselorId: string) => Promise<void> = async (appId, counselorId) => {
    const { setCounselors, applications, counselors } = useMockData();
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
export const requestEndorsement: (studentId: string, counselorId: string) => Promise<void> = async (sId, cId) => {
    const { setCounselors, counselors, students } = useMockData();
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



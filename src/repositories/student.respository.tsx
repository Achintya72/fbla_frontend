import { StudentApplication } from "@/models/application";
import { StudentData, StudentPage } from "@/models/student";

// Collection of methods responsible for handle API calls related to the student

/**
 * Responsible for fetching Student from DB
 * that has the given id
 * @param id 
 * @returns StudentData or null
 */
export const getStudentById: (id: string) => Promise<StudentData | null> = async () => {
    return null;
}

/**
 * Responsible for fetching Student's Profile from DB
 * @returns StudentPage or null
 */
export const getStudentPage: (id: string) => Promise<StudentPage | null> = async () => {
    return null;
}

/**
 * Responsible for creating Student's Data
 * on initial login
 * @returns Create StudentData or null
 */
export const createStudent: (student: StudentData) => Promise<StudentPage | null> = async () => {
    return null;
}


/**
 * Responsible for updating the student's data
 * @returns Updated StudentData or null
 */
export const updateStudentData: (data: StudentData) => Promise<StudentData | null> = async () => {
    return null;
}


/**
 * Responsible for getting a student's application
 * for a specific job.
 * @returns StudentApplication or null
 */
export const getStudentApplicationForJob: (stuId: string, jobId: string) => Promise<StudentApplication | null> = async () => {
    return null;
}

/**
 * Responsible for updating a student's
 * profile page
 * @returns updated StudentPage or null
 */
export const updatePage: (stuId: string, page: StudentPage) => Promise<StudentPage | null> = async () => {
    return null;
}

/**
 * Responsible for a student application
 * for a specific job
 * @returns Created StudentApplication or null
 */
export const createStudentApplication: (application: StudentApplication) => Promise<StudentApplication | null> = async () => {
    return null;
}

/**
 * Responsible for updating a student's
 * pre-existing application
 * @returns Updated StudentApplication or null
 */
export const updateStudentApplication: (application: StudentApplication) => Promise<StudentApplication | null> = async () => {
    return null;
}

/**
 * Adds user's application to counselor's application reviews list
 */
export const requestApplicationReview: (applicationId: string, counselorId: string) => Promise<void> = async () => {
}


/**
 * Adds student id to counselor's endorsementRequests
 */
export const requestEndorsement: (studentId: string, counselorId: string) => Promise<void> = async () => {

}



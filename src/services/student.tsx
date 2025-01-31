"use client";

import { StudentData, StudentPage } from "@/models/student";
import { Dispatch, SetStateAction } from "react";
import { useStudentQueries } from "@/repositories/student.respository";
import { student } from "@/utils/mockData";
import { StudentApplication } from "@/models/application";

export const useFetchStudentData = () => {
    const { 
        getStudentById, 
        getStudentPage, 
        createStudent, 
        updateStudentData,
        updatePage,
        getStudentApplicationForJob,
        createStudentApplication,
        updateStudentApplication,
        requestApplicationReview,
        requestEndorsement
    } = useStudentQueries();

    const fetchStudentData: (id: string) => Promise<StudentData | undefined> = async (
        id,
        setError?: Dispatch<SetStateAction<string>>,
        setLoading?: Dispatch<SetStateAction<boolean>>,
    ) => {
        try {
            setLoading?.(true);
            return await getStudentById(id);
        } catch (e) {
            if (e instanceof Error) {
                setError?.(e.message);
                console.log(e.message);
            }
            setError?.("An unknown error occurred.");
            return undefined;
        } finally {
            setLoading?.(false);
        }
    };

    const fetchStudentPage: (id: string, setError?: Dispatch<SetStateAction<string>>, setLoading?: Dispatch<SetStateAction<boolean>>,) => Promise<StudentPage | undefined> = async (
        id,
        setError,
        setLoading,
    ) => {
        try {
            setLoading?.(true);
            return await getStudentPage(id);
        } catch (e) {
            if (e instanceof Error) {
                setError?.(e.message);
                console.log(e.message);
            }
            setError?.("An unknown error occurred.");
            return undefined;
        } finally {
            setLoading?.(false);
        }
    }


    const createStudentData: (student: StudentData, setError?: Dispatch<SetStateAction<string>>, setLoading?: Dispatch<SetStateAction<boolean>>,) => Promise<StudentData | undefined> = async (
        student,
        setError,
        setLoading,
    ) => {
        try {
            setLoading?.(true);
            return await createStudent(student);
        } catch (e) {
            if (e instanceof Error) {
                setError?.(e.message);
                console.log(e.message);
            }
            setError?.("An unknown error occurred.");
            return undefined;
        } finally {
            setLoading?.(false);
        }
    }


    const setStudentData: (
        data: StudentData, 
        setError?: Dispatch<SetStateAction<string>>, 
        setLoading?: Dispatch<SetStateAction<boolean>>
    ) => Promise<StudentData | undefined> = async (
        id,
        setError,
        setLoading,
    ) => {
        try {
            setLoading?.(true);
            return await updateStudentData(id);
        } catch (e) {
            if (e instanceof Error) {
                setError?.(e.message);
                console.log(e.message);
            }
            setError?.("An unknown error occurred.");
            return undefined;
        } finally {
            setLoading?.(false);
        }
    }

    const setStudentPage: (
        id: string,
        data: StudentPage, 
        setError?: Dispatch<SetStateAction<string>>, 
        setLoading?: Dispatch<SetStateAction<boolean>>
    ) => Promise<StudentPage | undefined> = async (
        id,
        data,
        setError,
        setLoading,
    ) => {
        try {
            setLoading?.(true);
            return await updatePage(id,data);
        } catch (e) {
            if (e instanceof Error) {
                setError?.(e.message);
                console.log(e.message);
            }
            setError?.("An unknown error occurred.");
            return undefined;
        } finally {
            setLoading?.(false);
        }
    }

    const getApplication: (
        studentId: string,
        jobId: string, 
        setError?: Dispatch<SetStateAction<string>>, 
        setLoading?: Dispatch<SetStateAction<boolean>>
    ) => Promise<StudentApplication | undefined> = async (
        studentId,
        jobId,
        setError,
        setLoading,
    ) => {
        try {
            setLoading?.(true);
            return await getStudentApplicationForJob(studentId, jobId);
        } catch (e) {
            if (e instanceof Error) {
                setError?.(e.message);
                console.log(e.message);
            }
            setError?.("An unknown error occurred.");
            return undefined;
        } finally {
            setLoading?.(false);
        }
    }

    const makeStudentApplication: (
        application: StudentApplication, 
        setError?: Dispatch<SetStateAction<string>>, 
        setLoading?: Dispatch<SetStateAction<boolean>>
    ) => Promise<StudentApplication | undefined> = async (
        application,
        setError,
        setLoading,
    ) => {
        try {
            setLoading?.(true);
            return await createStudentApplication(application);
        } catch (e) {
            if (e instanceof Error) {
                setError?.(e.message);
                console.log(e.message);
            }
            setError?.("An unknown error occurred.");
            return undefined;
        } finally {
            setLoading?.(false);
        }
    }

    const setStudentApplication: (
        application: StudentApplication, 
        setError?: Dispatch<SetStateAction<string>>, 
        setLoading?: Dispatch<SetStateAction<boolean>>
    ) => Promise<StudentApplication | undefined> = async (
        application,
        setError,
        setLoading,
    ) => {
        try {
            setLoading?.(true);
            return await updateStudentApplication(application);
        } catch (e) {
            if (e instanceof Error) {
                setError?.(e.message);
                console.log(e.message);
            }
            setError?.("An unknown error occurred.");
            return undefined;
        } finally {
            setLoading?.(false);
        }
    }

    const requestReviewApplication: (
        applicationId: string,
        counselorId: string, 
        setError?: Dispatch<SetStateAction<string>>, 
        setLoading?: Dispatch<SetStateAction<boolean>>
    ) => Promise<void> = async (
        applicationId,
        counselorId,
        setError,
        setLoading,
    ) => {
        try {
            setLoading?.(true);
            return await requestApplicationReview(applicationId, counselorId);
        } catch (e) {
            if (e instanceof Error) {
                setError?.(e.message);
                console.log(e.message);
            }
            setError?.("An unknown error occurred.");
            return undefined;
        } finally {
            setLoading?.(false);
        }
    }
    
    const requestCounselorEndorsement: (
        studentId: string,
        counselorId: string,
        setError?: Dispatch<SetStateAction<string>>, 
        setLoading?: Dispatch<SetStateAction<boolean>>
    ) => Promise<void> = async (
        studentId,
        counselorId,
        setError,
        setLoading,
    ) => {
        try {
            setLoading?.(true);
            return await requestEndorsement(studentId, counselorId);
        } catch (e) {
            if (e instanceof Error) {
                setError?.(e.message);
                console.log(e.message);
            }
            setError?.("An unknown error occurred.");
            return undefined;
        } finally {
            setLoading?.(false);
        }
    }


    return { 
        fetchStudentData, 
        fetchStudentPage,
        makeStudentApplication,
        getApplication,
        setStudentPage,
        setStudentData,
        createStudentData,
        setStudentApplication,
        requestReviewApplication,
        requestCounselorEndorsement
    };

}
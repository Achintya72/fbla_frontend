"use client";

import { StudentData, StudentPage } from "@/models/student";
import { Dispatch, SetStateAction } from "react";
import { useStudentQueries } from "@/repositories/student.respository";

export const useFetchStudentData = () => {
    const { getStudentById, getStudentPage } = useStudentQueries();
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

    const fetchStudentPage: (id: string, setError?: Dispatch<SetStateAction<string>>,
        setLoading?: Dispatch<SetStateAction<boolean>>,) => Promise<StudentPage | undefined> = async (
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


    return { fetchStudentData, fetchStudentPage };

}
"use client";

import { StudentData } from "@/models/student";
import { student } from "@/repositories/mockData";
import delay from "@/utils/delay";
import { FirebaseError } from "firebase/app";
import { Dispatch, SetStateAction } from "react";

export const fetchStudentData: () => Promise<StudentData | undefined> = async (
    setError?: Dispatch<SetStateAction<string>>, 
    setLoading?: Dispatch<SetStateAction<boolean>>,
) => {
    try {
        setLoading?.(true);
        await delay(1000);
        return student;    
    } catch(e) {
        if(e instanceof FirebaseError) {
            setError?.(e.message);
        }
        setError?.("An unknown error occurred.");
        return undefined;
    } finally {
        setLoading?.(false);
    }
};
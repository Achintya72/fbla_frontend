"use client";

import { RecruiterData } from "@/models/recruiter";
import { recruiter } from "@/repositories/mockData";
import delay from "@/utils/delay";
import { FirebaseError } from "firebase/app";
import { Dispatch, SetStateAction } from "react";


export const fetchRecruiterData: () => Promise<RecruiterData | undefined> = async (
    setError?: Dispatch<SetStateAction<string>>,
    setLoading?: Dispatch<SetStateAction<boolean>>
) => {
    try {
        setLoading?.(true);
        await delay(1000);
        return recruiter;
    } catch (error) {
        if(error instanceof FirebaseError) {
            setError?.(error.message);
        }
        setError?.("An error occurred. Please try again.");
        return undefined
    } finally {
        setLoading?.(false);
    }
}
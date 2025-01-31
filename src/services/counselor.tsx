"use client";

import { CounselorData } from "@/models/counselor";
import { counselor } from "@/utils/mockData";
import delay from "@/utils/delay";
import { FirebaseError } from "firebase/app";

export const fetchCounselorData: () => Promise<CounselorData | undefined> = async (
    setError?: (error: string) => void,
    setLoading?: (loading: boolean) => void,
) => {
    try {
        setLoading?.(true);
        await delay(1000);
        return counselor;
    } catch(e) {
        if(e instanceof FirebaseError) {
            setError?.(e.message);
        }
        setError?.("An unknown error occurred.");
        return undefined;
    } finally {
        setLoading?.(false);
    }
}
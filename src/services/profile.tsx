"use client";

import { JobReference } from "@/models/userData";
import { useUserDataContext } from "@/serviceProviders/userDataContext"


export const useGetJobReferences = () => {
    const { getUserData } = useUserDataContext();
    const getJobReference = () => {
        return getUserData()?.jobReferences || [];
    }
    return getJobReference;
}

export const useAddJobReference = () => {
    const { setUserData, getUserData } = useUserDataContext();
    const addJobReference = (jobReference: JobReference) => {
    
        const userData = getUserData();
        if(userData) {
            setUserData({
                ...userData,
                jobReferences: [...userData.jobReferences, jobReference] 
            });
        }
    }
    return addJobReference;
}


export const useRemoveJobReference = () => {
    const { setUserData, getUserData } = useUserDataContext();
    const removeJobReference = (jobId: string) => {     
        const userData = getUserData();
        if(userData) {
            setUserData({
                ...userData,
                jobReferences: userData.jobReferences.filter((jobReference) => jobReference.id !== jobId)
            });
        }
    }
    return removeJobReference;
}

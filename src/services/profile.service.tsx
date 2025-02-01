"use client";

import { JobReference } from "@/models/student";
import { useUserDataContext } from "@/serviceProviders/userDataContext"


export const useGetJobReferences = () => {
    const { studentData } = useUserDataContext();
    const getJobReference = () => {
        return studentData?.jobReferences || [];
    }
    return getJobReference;
}

export const useAddJobReference = () => {
    const { setStudentData, studentData } = useUserDataContext();
    const addJobReference = (jobReference: JobReference) => {
        if(studentData) {
            setStudentData({
                ...studentData,
                jobReferences: [...studentData.jobReferences, jobReference] 
            });
        }
    }
    return addJobReference;
}


export const useRemoveJobReference = () => {
    const { setStudentData, studentData } = useUserDataContext();
    const removeJobReference = (jobId: string) => {     
        if(studentData) {
            setStudentData({
                ...studentData,
                jobReferences: studentData.jobReferences.filter((jobReference) => jobReference.id !== jobId)
            });
        }
    }
    return removeJobReference;
}

"use client";

import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";
import { UserData, JobReference } from "@/models/userData";

const UserDataContext = createContext<UserData>({
    jobReferences: [],
    setJobReferences: () => { },
    addJobReference: () => { },
    removeJobReference: () => { },
});

function UserDataContextProvider({ children }: PropsWithChildren) {
    const [jobReferences, setJobReferences] = useState<JobReference[]>([]);

    const addJobReference = (jobReference: JobReference) => {
        setJobReferences([...jobReferences, jobReference]);
    }

    const removeJobReference = (id: string) => {
        setJobReferences(jobReferences.filter((jobReference) => jobReference.id !== id));
    }

    useEffect(() => {
        // Fetch user data from the server
        setJobReferences([
            {
                id: "1",
                status: "bookmarked",
                nextSteps: [
                    { step: "Apply", completed: false },
                    { step: "Interview", completed: false },
                    { step: "Offer", completed: false },
                ],
            },
            {
                id: "2",
                status: "in-progress",
                nextSteps: [
                    { step: "Apply", completed: true },
                    { step: "Interview", completed: false },
                    { step: "Offer", completed: false },
                ],
            },
            {
                id: "3",
                status: "accepted",
                nextSteps: [
                    { step: "Apply", completed: true },
                    { step: "Interview", completed: true },
                    { step: "Offer", completed: true },
                ],
            },
        ]);
    }, []);

    const contextValue = {
        jobReferences,
        setJobReferences,
        addJobReference,
        removeJobReference
    }

    return (
        <UserDataContext.Provider value={contextValue}>
            {children}
        </UserDataContext.Provider>
    );
}

const useUserDataContext = () => {
    return useContext(UserDataContext);
}

export default UserDataContextProvider;
export { UserDataContext, useUserDataContext };
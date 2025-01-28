"use client";

import { createContext, Dispatch, PropsWithChildren, SetStateAction, useContext, useEffect, useState } from "react";
import { StudentData } from "@/models/student";
import { CounselorData } from "@/models/counselor";
import { RecruiterData } from "@/models/recruiter";
import { useLoginContext } from "@/services/login";

interface UserData {
    studentData?: StudentData;
    counselorData?: CounselorData;
    recruiterData?: RecruiterData;
    setStudentData: Dispatch<SetStateAction<StudentData | undefined>>;
    setCounselorData: Dispatch<SetStateAction<CounselorData | undefined>>;
    setRecruiterData: Dispatch<SetStateAction<RecruiterData | undefined>>;
}


const UserDataContext = createContext<UserData>({
    studentData: undefined,
    counselorData: undefined,
    recruiterData: undefined,
    setStudentData: () => { },
    setCounselorData: () => { },
    setRecruiterData: () => { },
});

function UserDataContextProvider({ children }: PropsWithChildren) {
    const { authUser, role } = useLoginContext();
    const [studentData, setStudentData] = useState<StudentData | undefined>(undefined);
    const [counselorData, setCounselorData] = useState<CounselorData | undefined>(undefined);
    const [recruiterData, setRecruiterData] = useState<RecruiterData | undefined>(undefined);



    /* const addJobReference = (jobReference: JobReference) => {
        setJobReferences([...jobReferences, jobReference]);
    }

    const removeJobReference = (id: string) => {
        setJobReferences(jobReferences.filter((jobReference) => jobReference.id !== id));
    } */

    useEffect(() => {
        if (authUser) {
            switch (role) {
                case "student":

                    break;
                case "counselor":
                    break;
                case "recruiter":
                    break;
            }
        } else {
            setStudentData(undefined);
            setCounselorData(undefined);
            setRecruiterData(undefined);
        }


        // Fetch user data from the server
        // setJobReferences([
        //     {
        //         id: "1",
        //         status: "bookmarked",
        //         nextSteps: [
        //             { step: "Apply", completed: false },
        //             { step: "Interview", completed: false },
        //             { step: "Offer", completed: false },
        //         ],
        //     },
        //     {
        //         id: "2",
        //         status: "in-progress",
        //         nextSteps: [
        //             { step: "Apply", completed: true },
        //             { step: "Interview", completed: false },
        //             { step: "Offer", completed: false },
        //         ],
        //     },
        //     {
        //         id: "3",
        //         status: "accepted",
        //         nextSteps: [
        //             { step: "Apply", completed: true },
        //             { step: "Interview", completed: true },
        //             { step: "Offer", completed: true },
        //         ],
        //     },
        // ]);
    }, [authUser, role]);

    const contextValue: UserData = {
        studentData,
        counselorData,
        recruiterData,
        setStudentData,
        setCounselorData,
        setRecruiterData,
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
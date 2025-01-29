"use client";

import { createContext, Dispatch, PropsWithChildren, SetStateAction, useContext, useEffect, useState } from "react";
import { StudentData } from "@/models/student";
import { CounselorData } from "@/models/counselor";
import { RecruiterData } from "@/models/recruiter";
import { useLoginContext } from "@/services/login";
import { fetchStudentData } from "@/services/student";
import { fetchCounselorData } from "@/services/counselor";
import { fetchRecruiterData } from "@/services/recruiter";
import Loader from "@/components/Loader";
import { student } from "../repositories/mockData";
import { JobReference, Profile } from "@/models/userData";

interface UserData {
    studentData?: StudentData;
    counselorData?: CounselorData;
    recruiterData?: RecruiterData;
    setStudentData: Dispatch<SetStateAction<StudentData | undefined>>;
    setCounselorData: Dispatch<SetStateAction<CounselorData | undefined>>;
    setRecruiterData: Dispatch<SetStateAction<RecruiterData | undefined>>;
    getUserData: () => Profile | undefined;
    setUserData: (data: Profile) => void;
}


const UserDataContext = createContext<UserData>({
    studentData: undefined,
    counselorData: undefined,
    recruiterData: undefined,
    setStudentData: () => { },
    setCounselorData: () => { },
    setRecruiterData: () => { },
    getUserData: () => undefined,
    setUserData: () => { }
});

function UserDataContextProvider({ children }: PropsWithChildren) {
    const { authUser, role } = useLoginContext();
    const [studentData, setStudentData] = useState<StudentData | undefined>(undefined);
    const [counselorData, setCounselorData] = useState<CounselorData | undefined>(undefined);
    const [recruiterData, setRecruiterData] = useState<RecruiterData | undefined>(undefined);
    const [populated, setPopulated] = useState(false);

    useEffect(() => {

        const populateStudentData = async () => {
            let data = await fetchStudentData();
            setStudentData(data);
        }

        const populateCounselorData = async () => {
            let data = await fetchCounselorData();
            setCounselorData(data);
        }

        const populateRecruiterData = async () => {
            let data = await fetchRecruiterData();
            setRecruiterData(data);
        }

        setPopulated(false);
        setStudentData(undefined);
        setCounselorData(undefined);
        setRecruiterData(undefined);
        
        if (authUser) {
            switch (role) {
                case "student":
                    populateStudentData();
                    break;
                case "counselor":
                    populateCounselorData();
                    break;
                case "recruiter":
                    populateRecruiterData();
                    break;
            }
        }
        setPopulated(true);

    }, [authUser, role]);

    const setUserData: (data: Profile) => void = (data) => {
        switch (role) {
            case "student":
                setStudentData(prev => {
                    if(prev != undefined) {
                        return {
                            ...prev,
                            ...data as Profile
                        }
                    }
                });
                break;
            case "counselor":
                setCounselorData(prev => {
                    if(prev != undefined) {
                        return {
                            ...prev,
                            ...data as Profile
                        }
                    }
                })
                break;
            case "recruiter":
                setRecruiterData(prev => {
                    if(prev != undefined) {
                        return {
                            ...prev,
                            ...data as Profile
                        }
                    }
                })
                break;
        }
    }

    const getUserData: () => Profile | undefined = () => {
        switch (role) {
            case "student":
                return studentData;
            case "counselor":
                return counselorData;
            case "recruiter":
                return recruiterData;
        }
    }

    const contextValue: UserData = {
        studentData,
        counselorData,
        recruiterData,
        setStudentData,
        setCounselorData,
        getUserData,
        setUserData,
        setRecruiterData,
    }

    if(!populated) { 
        return <div className="w-full h-screen flex justify-center items-center">
            <Loader />
        </div>
    };

    return (
        <UserDataContext.Provider value={contextValue}>
            {children}
        </UserDataContext.Provider>
    );
}

const useUserDataContext: () => UserData = () => {
    const context =  useContext(UserDataContext);
    return context;
}


export default UserDataContextProvider;
export { UserDataContext, useUserDataContext };
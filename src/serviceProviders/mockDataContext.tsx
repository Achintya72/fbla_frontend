"use client";

import { Application } from "@/models/application";
import { CounselorData } from "@/models/counselor";
import { Job } from "@/models/jobs";
import { RecruiterData } from "@/models/recruiter";
import { StudentData } from "@/models/student";
import { createContext, Dispatch, PropsWithChildren, SetStateAction, useContext, useState } from "react";
import { applications as a, counselors as c, jobs as j, recruiters as r, students as s } from "@/utils/mockDB";

interface MockDatabase {
    students: StudentData[],
    setStudents: Dispatch<SetStateAction<StudentData[]>>,
    counselors: CounselorData[],
    setCounselors: Dispatch<SetStateAction<CounselorData[]>>,
    recruiters: RecruiterData[],
    setRecruiters: Dispatch<SetStateAction<RecruiterData[]>>,
    jobs: Job[],
    setJobs: Dispatch<SetStateAction<Job[]>>,
    applications: Application[],
    setApplications: Dispatch<SetStateAction<Application[]>>,
    createApplicationId: () => string,
}

const MockDatabaseContext = createContext<MockDatabase>({
    applications: [],
    counselors: [],
    jobs: [],
    recruiters: [],
    students: [],
    setApplications: () => { },
    setCounselors: () => { },
    setJobs: () => { },
    setRecruiters: () => { },
    setStudents: () => { },
    createApplicationId: () => ""
});

const MockDatabaseProvider = ({ children }: PropsWithChildren) => {
    const [students, setStudents] = useState<StudentData[]>(s);
    const [counselors, setCounselors] = useState<CounselorData[]>(c);
    const [recruiters, setRecruiters] = useState<RecruiterData[]>(r);
    const [jobs, setJobs] = useState<Job[]>(j);
    const [applications, setApplications] = useState<Application[]>(a);

    const createApplicationId = () => {
        return `a${applications.length + 1}`;
    }

    const value: MockDatabase = {
        applications,
        createApplicationId,
        counselors,
        jobs,
        recruiters,
        setApplications,
        setCounselors,
        setJobs,
        setRecruiters,
        setStudents,
        students,
    }

    return (
        <MockDatabaseContext.Provider value={value}>{children}</MockDatabaseContext.Provider>
    )
}

const useMockData: () => MockDatabase = () => {
    return useContext(MockDatabaseContext);
}

export default MockDatabaseContext;
export { MockDatabaseProvider, useMockData };
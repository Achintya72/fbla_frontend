"use client";

import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";
import { JobContextData, Job, Location, Commitment, JobLevel } from "@/models/jobs";
import { useJobRepo } from "@/repositories/jobs.repository";

const JobsContext = createContext<JobContextData>({
    jobs: [],
    setJobs: () => { },
    populated: false,
    searchText: "",
    setSearchText: () => { },
    selectedTag: "",
    setSelectedTag: () => { },
    compensationRange: [0, 100000],
    setCompensationRange: () => { },
    locations: [],
    setLocations: () => { },
    commitments: [],
    setCommitments: () => { },
    levels: [],
    setLevels: () => { },
});

function JobsContextProvider({ children }: PropsWithChildren) {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [populated, changePopulated] = useState<boolean>(false);
    const [searchText, setSearchText] = useState<string>("");
    const [selectedTag, setSelectedTag] = useState<string>("All");
    const [compensationRange, setCompensationRange] = useState<[number, number]>([0, 100000]);
    const [locations, setLocations] = useState<Location[]>([]);
    const [commitments, setCommitments] = useState<Commitment[]>([]);
    const [levels, setLevels] = useState<JobLevel[]>([]);
    const { getJobsRepo } = useJobRepo();

    


    useEffect(() => {
        const populateJobs = async () => {
            const jobs = await getJobsRepo();
            setJobs(jobs);
            changePopulated(true);
        }
        populateJobs();
    }, [])

    const values: JobContextData = {
        jobs,
        setJobs,
        populated,
        searchText,
        setSearchText,
        selectedTag,
        setSelectedTag,
        compensationRange,
        setCompensationRange,
        locations,
        setLocations,
        commitments,
        setCommitments,
        levels,
        setLevels
    }

    return (
        <JobsContext.Provider value={values}>
            {children}
        </JobsContext.Provider>
    )
}

const useJobContext = () => {
    return useContext(JobsContext);
}

export default JobsContext;
export { JobsContextProvider, useJobContext };
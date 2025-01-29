"use client";

import { createContext, PropsWithChildren, useEffect, useState } from "react";
import { JobContextData, Job, Location, Commitment } from "@/models/jobs";
import { fetchJobs } from "@/services/jobs";

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
    setCommitments: () => { }
});

function JobsContextProvider({ children }: PropsWithChildren) {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [populated, changePopulated] = useState<boolean>(false);
    const [searchText, setSearchText] = useState<string>("");
    const [selectedTag, setSelectedTag] = useState<string>("All");
    const [compensationRange, setCompensationRange] = useState<[number, number]>([0, 100000]);
    const [locations, setLocations] = useState<Location[]>([]);
    const [commitments, setCommitments] = useState<Commitment[]>([]);

    useEffect(() => {
        changePopulated(true);

        const populateJobData = async () => {
            const data = await fetchJobs();
            setJobs(data ?? []);
        }

        changePopulated(false);
        populateJobData();
        changePopulated(true);
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
        setCommitments
    }

    return (
        <JobsContext.Provider value={values}>
            {children}
        </JobsContext.Provider>
    )
}

export default JobsContext;
export { JobsContextProvider };
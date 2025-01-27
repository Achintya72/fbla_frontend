"use client";

import { createContext, PropsWithChildren, useEffect, useState } from "react";
import { JobContextData, Job, Location, Commitment } from "@/models/jobs";

const JobsContext = createContext<JobContextData>({
    jobs: [],
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
        const mockJob: Job = {
            id: "1",
            title: "Software Engineer Intern",
            description: "A 4-month internship for all aspiring software developers with the Google Cloud team.",
            longDescription: "A 4-month internship for all aspiring software developers with the Google Cloud team. You will be working on the latest technologies and will be mentored by the best in the industry.",
            company: { name: "Google", logo: "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png", tags: ["Tech", "Cloud"] },
            commitment: "Full-time",
            location: "Remote",
            salary: 2000,
            level: "intern",
            hours: "20",
            tags: ["Engineering"],
            closeDate: new Date(2025, 1, 1),
            applications: Array.from({ length: 12 }, (_, i) => ({ id: (i + 1).toString() }))
        }
        setJobs([mockJob, mockJob, mockJob, mockJob, mockJob, mockJob]);
    }, [])

    const values: JobContextData = {
        jobs,
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
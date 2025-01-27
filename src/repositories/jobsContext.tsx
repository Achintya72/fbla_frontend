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
        const mockJobs: Job[] = [
            {
                id: "1",
                title: "Software Engineer Intern",
                description: "A 4-month internship for all aspiring software developers with the Google Cloud team.",
                longDescription: "A 4-month internship for all aspiring software developers with the Google Cloud team. You will be working on the latest technologies and will be mentored by the best in the industry.",
                company: { name: "Google", logo: "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png", tags: ["Tech", "Cloud", "Large", "CA, US"] },
                commitment: "Full-time",
                location: "Remote",
                salary: 2000,
                level: "intern",
                hours: "20",
                tags: ["Engineering"],
                closeDate: new Date(2025, 1, 1),
                applications: Array.from({ length: 12 }, (_, i) => ({ id: (i + 1).toString() })),
                responsibilities: ["Develop software solutions", "Work with the team to deliver projects", "Learn and grow"]
            },
            {
                id: "2",
                title: "Data Analyst Intern",
                description: "A 3-month internship for data enthusiasts with the Facebook Analytics team.",
                longDescription: "A 3-month internship for data enthusiasts with the Facebook Analytics team. You will analyze data trends and provide insights.",
                company: { name: "Facebook", logo: "https://www.facebook.com/images/fb_icon_325x325.png", tags: ["Tech", "Social Media", "Large", "CA, US"] },
                commitment: "Part-time",
                location: "Remote",
                salary: 1500,
                level: "intern",
                hours: "15",
                tags: ["Data", "Engineering"],
                closeDate: new Date(2025, 2, 1),
                applications: Array.from({ length: 8 }, (_, i) => ({ id: (i + 1).toString() })),
                responsibilities: ["Analyze data", "Create reports", "Collaborate with the team"]
            },
            {
                id: "3",
                title: "Product Manager Intern",
                description: "A 6-month internship for aspiring product managers with the Amazon Web Services team.",
                longDescription: "A 6-month internship for aspiring product managers with the Amazon Web Services team. You will help manage product development and strategy.",
                company: { name: "Amazon", logo: "https://www.amazon.com/favicon.ico", tags: ["Tech", "E-commerce", "Large", "WA, US"] },
                commitment: "Full-time",
                location: "Onsite",
                salary: 2500,
                level: "intern",
                hours: "40",
                tags: ["Product Management"],
                closeDate: new Date(2025, 3, 1),
                applications: Array.from({ length: 10 }, (_, i) => ({ id: (i + 1).toString() })),
                responsibilities: ["Manage product development", "Coordinate with teams", "Define product strategy"]
            },
            {
                id: "4",
                title: "Marketing Intern",
                description: "A 2-month internship for marketing enthusiasts with the Apple Marketing team.",
                longDescription: "A 2-month internship for marketing enthusiasts with the Apple Marketing team. You will assist in marketing campaigns and strategies.",
                company: { name: "Apple", logo: "https://www.apple.com/ac/structured-data/images/knowledge_graph_logo.png", tags: ["Tech", "Consumer Electronics", "Large", "CA, US"] },
                commitment: "Part-time",
                location: "Onsite",
                salary: 1800,
                level: "intern",
                hours: "20",
                tags: ["Marketing"],
                closeDate: new Date(2025, 4, 1),
                applications: Array.from({ length: 15 }, (_, i) => ({ id: (i + 1).toString() })),
                responsibilities: ["Assist in marketing campaigns", "Develop marketing strategies", "Collaborate with the team"]
            },
            {
                id: "5",
                title: "UX Designer Intern",
                description: "A 5-month internship for aspiring UX designers with the Microsoft Design team.",
                longDescription: "A 5-month internship for aspiring UX designers with the Microsoft Design team. You will work on user experience design and research.",
                company: { name: "Microsoft", logo: "https://www.microsoft.com/favicon.ico", tags: ["Tech", "Software", "Large", "WA, US"] },
                commitment: "Full-time",
                location: "Hybrid",
                salary: 2200,
                level: "intern",
                hours: "30",
                tags: ["Design"],
                closeDate: new Date(2025, 5, 1),
                applications: Array.from({ length: 20 }, (_, i) => ({ id: (i + 1).toString() })),
                responsibilities: ["Design user experiences", "Conduct user research", "Collaborate with the design team"]
            }
        ];
        setJobs(mockJobs);
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
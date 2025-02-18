import { Dispatch, SetStateAction } from "react";

type JobLevel = "intern" | "entry" | "mid" | "senior";
type Location = "Hybrid" | "Remote" | "Onsite";
type Commitment = "Full-time" | "Part-time" | "Up-To-You";

interface Company {
    name: string;
    logo: string;
    tags: string[];
}

interface Job {
    id: string;
    recruiterId: string,
    title: string;
    description: string;
    longDescription: string;
    company: Company;
    location: Location;
    commitment: Commitment;
    salary: number;
    level: JobLevel;
    hours: string;
    tags: string[];
    closeDate: Date; // ISO
    applications: string[];
    responsibilities: string[];
    coverImage: string;
    published: boolean;
    skills: string[];
    studentFound: boolean | undefined;
}

interface JobContextData {
    jobs: Job[];
    setJobs: Dispatch<SetStateAction<Job[]>>,
    populated: boolean;
    searchText: string;
    setSearchText: (text: string) => void;
    selectedTag: string;
    setSelectedTag: (tag: string) => void;
    compensationRange: [number, number];
    setCompensationRange: (range: [number, number]) => void;
    locations: Location[];
    setLocations: (locations: Location[]) => void;
    commitments: Commitment[];
    setCommitments: (commitments: Commitment[]) => void;
    levels: JobLevel[];
    setLevels: (levels: JobLevel[]) => void;
}

export type { Job, JobContextData, Company, JobLevel, Location, Commitment };
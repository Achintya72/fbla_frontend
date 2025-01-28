type JobLevel = "intern" | "entry" | "mid" | "senior";
type Location = "Hybrid" | "Remote" | "Onsite";
type Commitment = "Full-time" | "Part-time" | "Up-To-You";

interface Application {
    id: string;
}

interface Company {
    name: string;
    logo: string;
    tags: string[];
}

interface Job {
    id: string;
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
    closeDate: Date;
    applications: Application[];
    responsibilities: string[];
    coverImage: string;
}

interface JobContextData {
    jobs: Job[];
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
}

export type { Job, JobContextData, Company, JobLevel, Location, Commitment };
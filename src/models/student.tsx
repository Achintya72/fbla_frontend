import { Profile } from "./userData";

interface StudentData extends Profile {
    page: StudentPage;
    coverLetters: CoverLetter[];
    resume?: string;
    counselor: string;
    verified: boolean;
    lessons: LessonStatus[];
    jobReferences: JobReference[],
}

type JobStatus = "bookmarked" | "pending" | "accepted" | "rejected" | "in-progress"

interface JobReference {
    id: string,
    status: JobStatus,
    nextSteps?: { step: string, completed: boolean }[],
}

interface LessonStatus {
    id: string;
    completed: boolean;
}

interface CoverLetter {
    name: string;
    url: string;
}

interface StudentPage {
    bio: string;
    projects: Project[];
    employments: Employment[];
    links: Link[];
}

interface Link {
    name: string;
    url: string;
}

interface Project {
    name: string;
    description: string;
    images: string[];
    links: string[];
    startDate?: Date;
    endDate?: Date;
    skills: string[];
}

interface Employment {
    company: string;
    role: string;
    startDate: Date;
    endDate?: Date;
    description: string;
    skills: string[];
}

export type {
    StudentData,
    LessonStatus,
    CoverLetter,
    StudentPage,
    Project,
    Employment,
    Link,
    JobReference, JobStatus
};
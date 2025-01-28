import { Profile } from "./userData";

interface StudentData extends Profile {
    page: StudentPage;
    coverLetters: CoverLetter[];
    resume?: string;
    counselor: string;
    verified: boolean;
    lessons: LessonStatus[];
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
};
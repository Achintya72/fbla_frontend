import { CoverLetter, StudentPage } from "./student";

interface Application {
    id: string;
    student: string,
    job: string,
    additionalInformation: string,
    coverLetter?: CoverLetter,
    resume?: string,
    recruiterComments: Comment[],
    counselorComments: Comment[],
    recruiterClassification: boolean | null,
    submitted: boolean
}

interface StudentApplication {
    id: string,
    student: string,
    job: string,
    additionalInformation: string,
    coverLetter?: CoverLetter,
    resume?: string,
    submitted: boolean,
    counselorComments: Comment[],
    status: boolean | null
}

interface RecruiterApplication {
    id: string,
    student: string,
    job: string,
    additionalInformation: string,
    coverLetter: CoverLetter,
    resume?: string,
    page: StudentPage,
    recruiterComments: Comment[],
    recruiterClassification: boolean | null,
    submitted: boolean
}

interface CounselorApplication {
    id: string,
    student: string,
    job: string,
    additionalInformation: string
    coverLetter?: CoverLetter,
    resume?: string,
    counselorComments: Comment[],
}

interface Comment {
    section: "cover-letter" | "additional-info" | "resume" | "profile",
    text: string,
    resolved: boolean
}

export type { Application, StudentApplication, RecruiterApplication, CounselorApplication, Comment };
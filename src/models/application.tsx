import { CoverLetter, StudentPage } from "./student";
import { JobStatus } from "./student";

type Progress = "accepted" | "rejected" | "in-progress"

interface Application {
    id: string;
    student: string,
    job: string,
    additionalInformation: string,
    coverLetter?: CoverLetter,
    resume?: string,
    recruiterComments: Comment[],
    counselorComments: Comment[],
    recruiterClassification: Progress,
    submitted: boolean
    status: JobStatus,
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
    status: JobStatus
}

interface RecruiterApplication {
    id: string,
    student: string,
    job: string,
    additionalInformation: string,
    coverLetter: CoverLetter,
    resume?: string,
    recruiterComments: Comment[],
    recruiterClassification: Progress,
    submitted: boolean,
    status: JobStatus
}

interface CounselorApplication {
    id: string,
    student: string,
    job: string,
    additionalInformation: string
    coverLetter?: CoverLetter,
    resume?: string,
    page?: StudentPage,
    counselorComments: Comment[],
}

interface Comment {
    section: "cover-letter" | "additional-info" | "resume" | "profile",
    text: string,
    resolved: boolean
}

export type { Application, Progress, StudentApplication, RecruiterApplication, CounselorApplication, Comment };
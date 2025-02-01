import { StudentData, JobReference } from "@/models/student";
import { RecruiterData } from "@/models/recruiter";
import { CounselorData } from "@/models/counselor";

export const jobReferences: JobReference[] = [
    {
        id: "1",
        status: "bookmarked",
        /* nextSteps: [
            { step: "Apply", completed: false },
            { step: "Interview", completed: false },
            { step: "Offer", completed: false },
        ], */
    },
    {
        id: "2",
        status: "in-progress",
        /* nextSteps: [
            { step: "Apply", completed: true },
            { step: "Interview", completed: false },
            { step: "Offer", completed: false },
        ], */
    },
    {
        id: "3",
        status: "accepted",
        /* nextSteps: [
            { step: "Apply", completed: true },
            { step: "Interview", completed: true },
            { step: "Offer", completed: true },
        ], */
    },
    {
        id: "4",
        status: "pending",
        /* nextSteps: [
            { step: "Apply", completed: true },
            { step: "Interview", completed: true },
            { step: "Offer", completed: true },
        ], */
    },
];

export const student: StudentData = {
    id: "1",
    name: "John Doe",
    email: "1055712@lwsd.org",
    counselor: "2",
    coverLetters: [
        {
            name: "Data Analyst",
            url: "https://www.google.com",
        },
        {
            name: "UI Designer",
            url: "https://www.google.com",
        }
    ],
    resume: "https://www.rd.usda.gov/sites/default/files/pdf-sample_0.pdf",
    jobReferences: jobReferences,
    page: {
        name: "John Doe",
        bio: "I am a student at Eastlake High School and I am interested in computer science.",
        employments: [],
        projects: [],
        links: [
            { name: "GitHub", url: "https://github.com" },
            { name: "LinkedIn", url: "https://linkedin.com" },
        ]
    },
    lessons: [],
    verified: false,
};

export const recruiter: RecruiterData = {
    id: "2",
    name: "Jeff Bezos",
    email: "jeffbezos@amazon.com",
    company: {
        name: "Amazon",
        logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
        tags: ["e-commerce", "cloud computing", "artificial intelligence"],
    },
    verified: true
}

export const counselor: CounselorData = {
    id: "3",
    name: "Jane Smith",
    email: "mtouran@lwsd.org",
    students: ["1"],
    endorsementRequests: ["1"],
    applicationReviews: []
}

import { StudentData } from "@/models/student";
import { JobReference } from "@/models/userData";

export const jobReferences: JobReference[] = [
    {
        id: "1",
        status: "bookmarked",
        nextSteps: [
            { step: "Apply", completed: false },
            { step: "Interview", completed: false },
            { step: "Offer", completed: false },
        ],
    },
    {
        id: "2",
        status: "in-progress",
        nextSteps: [
            { step: "Apply", completed: true },
            { step: "Interview", completed: false },
            { step: "Offer", completed: false },
        ],
    },
    {
        id: "3",
        status: "accepted",
        nextSteps: [
            { step: "Apply", completed: true },
            { step: "Interview", completed: true },
            { step: "Offer", completed: true },
        ],
    },
];

export const student: StudentData = {
    id: "1",
    name: "John Doe",
    email: "1055712@lwsd.org",
    counselor: "2",
    coverLetters: [],
    jobReferences: jobReferences,
    page: {
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
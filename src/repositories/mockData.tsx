import { StudentData } from "@/models/student";
import { JobReference } from "@/models/userData";
import { RecruiterData } from "@/models/recruiter";
import { CounselorData } from "@/models/counselor";
import { Job } from "@/models/jobs";

export const mockJobs: Job[] = [
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
        responsibilities: ["Develop software solutions", "Work with the team to deliver projects", "Learn and grow"],
        coverImage: "https://t3.ftcdn.net/jpg/05/05/94/08/360_F_505940885_kmTN2GvEUmdY0uylOR5bAaEgTRVXUndm.jpg",
        skills: ["React", "NextJS"],
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
        responsibilities: ["Analyze data", "Create reports", "Collaborate with the team"],
        coverImage: "https://t3.ftcdn.net/jpg/05/05/94/08/360_F_505940885_kmTN2GvEUmdY0uylOR5bAaEgTRVXUndm.jpg",
        skills: ["React", "NextJS"],
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
        responsibilities: ["Manage product development", "Coordinate with teams", "Define product strategy"],
        coverImage: "https://t3.ftcdn.net/jpg/05/05/94/08/360_F_505940885_kmTN2GvEUmdY0uylOR5bAaEgTRVXUndm.jpg",
        skills: ["React", "NextJS"],
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
        responsibilities: ["Assist in marketing campaigns", "Develop marketing strategies", "Collaborate with the team"],
        coverImage: "https://t3.ftcdn.net/jpg/05/05/94/08/360_F_505940885_kmTN2GvEUmdY0uylOR5bAaEgTRVXUndm.jpg",
        skills: ["React", "NextJS"],
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
        responsibilities: ["Design user experiences", "Conduct user research", "Collaborate with the design team"],
        coverImage: "https://t3.ftcdn.net/jpg/05/05/94/08/360_F_505940885_kmTN2GvEUmdY0uylOR5bAaEgTRVXUndm.jpg",
        skills: ["React", "NextJS"],
    }
];

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
    {
        id: "4",
        status: "pending",
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
    resume: "https://www.facebook.com",
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

export const recruiter: RecruiterData = {
    id: "2",
    name: "Jeff Bezos",
    email: "jeffbezos@amazon.com",
    company: {
        name: "Amazon",
        logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
        tags: ["e-commerce", "cloud computing", "artificial intelligence"],
    },
    jobReferences: jobReferences,
    verified: true
}

export const counselor: CounselorData = {
    id: "3",
    name: "Jane Smith",
    email: "mtouran@lwsd.org",
    students: ["1"],
    endorsementRequests: ["1"],
    jobReferences: jobReferences,
    pendingRecruiters: ["2"],
}

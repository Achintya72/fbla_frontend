import { Application } from "@/models/application";
import { CounselorData } from "@/models/counselor";
import { Job } from "@/models/jobs";
import { RecruiterData } from "@/models/recruiter";
import { StudentData } from "@/models/student";

export const counselors: CounselorData[] = [
    {
        id: "c1",
        name: "Jane Smith",
        email: "mtouran@lwsd.org",
        students: ["s1"],
        endorsementRequests: ["s1"],
        jobReferences: [],
        applicationReviews: []
    },
    {
        id: "c2",
        name: "Kelsey Wescott",
        email: "kwescott@lwsd.org",
        students: ["s2"],
        endorsementRequests: ["s2"],
        jobReferences: [],
        applicationReviews: []
    }
]

export const students: StudentData[] = [
    {
        id: "s1",
        name: "Achintya Agrawal",
        counselor: "c1",
        coverLetters: [
            {
                name: "Tech Jobs",
                url: "https://www.google.com"
            }
        ],
        email: "1055712@lwsd.org",
        jobReferences: [],
        lessons: [],
        page: {
            bio: "Passionate believer in the limitless power of channelizing the power of AI through careful design",
            employments: [{
                company: "Codju",
                description: "Wrote 10,000+ lines of code designing the MVP version of RankHero: an app created to superpower exam preparation for JEE and NEET",
                role: "Software Development Intern",
                skills: ["UI/UX", "Flutter", "Dart"],
                startDate: new Date(6, 1, 2024),
                endDate: new Date(8, 31, 2024)
            }],
            links: [
                {
                    name: "Website",
                    url: "https://www.google.com"
                },
                {
                    name: "LinkedIn",
                    url: "https://www.linkedin.com"
                }
            ],
            projects: [
                {
                    name: "Unbound",
                    description: "An app created with Flutter for students to track, grow, and share their high school portfolio, while engaging with posts and learning more about prospective companies and colleges",
                    images: [
                        "https://images.squarespace-cdn.com/content/v1/626b5e07496e6707a6b22b2a/1689566985490-N3IJGQ039MUAST9TUAPJ/mockstar-facebook-advertising-mockup-template.jpg?format=1000w"
                    ],
                    links: ["https://github.com/pranavkannepalli/unbound"],
                    skills: ["UI/UX", "MVVM Architecture", "Flutter", "Figma"],
                    startDate: new Date(3, 1, 2024),
                    endDate: new Date(8, 1, 2024),
                }
            ],
        },
        verified: false,
        resume: "https://www.google.com"
    },
    {
        id: "s2",
        name: "Pranav Kannepalli",
        counselor: "c1",
        coverLetters: [],
        email: "1048636@lwsd.org",
        jobReferences: [],
        lessons: [],
        page: {
            bio: "Aspiring Mathematician and Machine Learning Engineer",
            employments: [{
                company: "Stree Shakti Prabhodini",
                description: "Wrote 10,000+ lines of code designing an e-commerce website for a womens' co-op organization based out of Maharashtra, India",
                role: "Software Development Intern",
                skills: ["UI/UX", "NextJS", "Backend"],
                startDate: new Date(6, 1, 2024),
                endDate: new Date(8, 31, 2024)
            }],
            links: [
                {
                    name: "Website",
                    url: "https://www.google.com"
                },
                {
                    name: "LinkedIn",
                    url: "https://www.linkedin.com"
                }
            ],
            projects: [
                {
                    name: "Unbound",
                    description: "An app created with Flutter for students to track, grow, and share their high school portfolio, while engaging with posts and learning more about prospective companies and colleges",
                    images: [
                        "https://images.squarespace-cdn.com/content/v1/626b5e07496e6707a6b22b2a/1689566985490-N3IJGQ039MUAST9TUAPJ/mockstar-facebook-advertising-mockup-template.jpg?format=1000w"
                    ],
                    links: ["https://github.com/pranavkannepalli/unbound"],
                    skills: ["UI/UX", "MVVM Architecture", "Flutter", "Figma"],
                    startDate: new Date(3, 1, 2024),
                    endDate: new Date(8, 1, 2024),
                }
            ],
        },
        verified: false,
        resume: "https://www.google.com"
    }
]

export const recruiters: RecruiterData[] = [
    {
        company: {
            logo: "https://images.seeklogo.com/logo-png/47/1/meta-logo-png_seeklogo-477180.png?v=1957917042401470928",
            name: "Meta",
            tags: ["Social Media", "LLM"]
        },
        email: "mzuckerberg@meta.com",
        id: "r1",
        jobReferences: [],
        name: "Mark Zuckerberg",
        verified: false
    }
]

export const jobs: Job[] = [
    {
        id: "j1",
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
        applications: [],
        responsibilities: ["Develop software solutions", "Work with the team to deliver projects", "Learn and grow"],
        coverImage: "https://t3.ftcdn.net/jpg/05/05/94/08/360_F_505940885_kmTN2GvEUmdY0uylOR5bAaEgTRVXUndm.jpg",
    },
    {
        id: "j2",
        title: "Data Analyst Intern",
        description: "A 3-month internship for data enthusiasts with the Facebook Analytics team.",
        longDescription: "A 3-month internship for data enthusiasts with the Facebook Analytics team. You will analyze data trends and provide insights.",
        company: { name: "Meta", logo: "https://www.facebook.com/images/fb_icon_325x325.png", tags: ["Tech", "Social Media", "Large", "CA, US"] },
        commitment: "Part-time",
        location: "Remote",
        salary: 1500,
        level: "intern",
        hours: "15",
        tags: ["Data", "Engineering"],
        closeDate: new Date(2025, 2, 1),
        applications: [],
        responsibilities: ["Analyze data", "Create reports", "Collaborate with the team"],
        coverImage: "https://t3.ftcdn.net/jpg/05/05/94/08/360_F_505940885_kmTN2GvEUmdY0uylOR5bAaEgTRVXUndm.jpg",
    },
    {
        id: "j3",
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
        applications: [],
        responsibilities: ["Manage product development", "Coordinate with teams", "Define product strategy"],
        coverImage: "https://t3.ftcdn.net/jpg/05/05/94/08/360_F_505940885_kmTN2GvEUmdY0uylOR5bAaEgTRVXUndm.jpg",
    },
    {
        id: "j4",
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
        applications: [],
        responsibilities: ["Assist in marketing campaigns", "Develop marketing strategies", "Collaborate with the team"],
        coverImage: "https://t3.ftcdn.net/jpg/05/05/94/08/360_F_505940885_kmTN2GvEUmdY0uylOR5bAaEgTRVXUndm.jpg",
    },
    {
        id: "j5",
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
        applications: [],
        responsibilities: ["Design user experiences", "Conduct user research", "Collaborate with the design team"],
        coverImage: "https://t3.ftcdn.net/jpg/05/05/94/08/360_F_505940885_kmTN2GvEUmdY0uylOR5bAaEgTRVXUndm.jpg",
    }
];

export const applications: Application[] = [
    {
        id: "a1",
        student: "s1",
        job: "j5",
        additionalInformation: "Hello, I'm under d wader. Pls help",
        counselorComments: [],
        recruiterComments: [],
        recruiterClassification: null,
        submitted: false,
    },
    {
        id: "a2",
        student: "s2",
        job: "j4",
        additionalInformation: "Helicopter Helicopter dkdkdkdkdk",
        counselorComments: [],
        recruiterComments: [
            {
                resolved: false,
                section: "additional-info",
                text: "What is this rubbish?"
            }
        ],
        recruiterClassification: null,
        submitted: true,
        coverLetter: {
            name: "Marketing",
            url: "https://www.linkedin.com"
        },
        resume: "https://www.linkedin.com"
    }
];
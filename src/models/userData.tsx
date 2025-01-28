
type JobStatus = "bookmarked" | "pending" | "accepted" | "rejected" | "in-progress"

interface JobReference {
    id: string,
    status: JobStatus,
    nextSteps?: { step: string, completed: boolean }[],
}

// interface UserData {
//     profile: Profile,
//     setJobReferences: (jobReferences: JobReference[]) => void,
//     addJobReference: (jobReference: JobReference) => void,
//     removeJobReference: (id: string) => void,
// }

interface Profile {
    id: string,
    name: string,
    email: string
    jobReferences: JobReference[],
}


export type { Profile, JobReference, JobStatus }
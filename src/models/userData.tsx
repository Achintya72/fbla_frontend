
type JobStatus = "bookmarked" | "pending" | "accepted" | "rejected" | "in-progress"

interface JobReference {
    id: string,
    status: JobStatus,
    nextSteps?: { step: string, completed: boolean }[],
}

interface Profile {
    id: string,
    name: string,
    email: string
    jobReferences: JobReference[],
}


export type { Profile, JobReference, JobStatus }
type JobStatus = "bookmarked" | "pending" | "accepted" | "rejected" | "in-progress"

interface JobReference {
    id: string,
    status: JobStatus,
    nextSteps?: { step: string, completed: boolean }[],
}

interface UserData {
    jobReferences: JobReference[],
    setJobReferences: (jobReferences: JobReference[]) => void,
    addJobReference: (jobReference: JobReference) => void,
    removeJobReference: (id: string) => void,
}

export type { UserData, JobReference, JobStatus }
import { Profile } from "./userData";

interface CounselorData extends Profile {
    students: string[];
    endorsementRequests: string[];
    pendingRecruiters: string[];
}

export type { CounselorData };

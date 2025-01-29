import { Profile } from "./userData";

interface CounselorData extends Profile {
    students: string[];
    endorsementRequests: string[];
    applicationReviews: string[];
}

export type { CounselorData };

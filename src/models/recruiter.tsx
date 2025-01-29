import { Company } from "./jobs";
import { Profile } from "./userData";

interface RecruiterData extends Profile {
    company: Company;
    verified: boolean | null;
}

export type { RecruiterData };
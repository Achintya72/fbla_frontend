import { Job } from "@/models/jobs";
import { redirect } from "next/navigation";
import Bookmark from "./bookmark";
import Button from "./button";

export default function CondensedJobCard({ job, showApply = false, status = null, nextSteps = [] }: { job: Job, showApply?: boolean, status?: string | null, nextSteps?: string[] }) {
    return (
        <div className="border-white-500 flex flex-col gap-[10px] rounded-[8px] bg-white-100 p-[16px] min-w-[350px] border hover:border-black cursor-pointer" onClick={() => redirect(`/jobs/${job.id}`)}>
            <div className="flex flex-row justify-between gap-[8px]">
                <div className="flex flex-row gap-[5px]">
                    <div className="bg-white-200 rounded-full h-[51px] w-[51px] flex items-center justify-center">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={job.company.logo} alt={job.company.name} className="w-[40px] h-[40px] rounded-full object-contain" />
                    </div>
                    <div>
                        <div className="font-bold">{job.title}</div>
                        <div className="text-white-700 text-[14px]">{job.company.name}</div>
                    </div>
                </div>
                {status && <div className={"status " + status}>{status.charAt(0).toUpperCase() + status.slice(1)}</div>}
                {!status && <Bookmark job={job} className="justify-self-center  text-white-700" />}
            </div>
            <div className="flex flex-row font-bold text-[14px] gap-[10px]">
                <div className="p-[6px] bg-blue-100 text-blue-400 rounded-[5px]">
                    {job.level.charAt(0).toUpperCase() + job.level.slice(1)}
                </div>
                <div className="p-[6px] bg-green-100 text-green-700 rounded-[5px]">
                    {job.location.charAt(0).toUpperCase() + job.location.slice(1)}
                </div>
                <div className="p-[6px] bg-yellow-100 text-yellow-700 rounded-[5px]">
                    {job.commitment.charAt(0).toUpperCase() + job.commitment.slice(1)}
                </div>
            </div>
            <div className="text-white-700 text-[14px]">
                {job.closeDate.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: new Date(job.closeDate).getFullYear() === new Date().getFullYear() ? undefined : 'numeric' })} • {job.applications.length} Applicant{job.applications.length > 1 ? "s" : ""}
            </div>
            {showApply && <Button size="small">Apply</Button>}
        </div>
    )
}
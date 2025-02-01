"use client";

import useCounselorServices from "@/services/counselor.service";
import withProtection from "@/components/protected"
import { RecruiterData } from "@/models/recruiter";
import { useEffect, useState } from "react";
import { Job } from "@/models/jobs";
import { CounselorApplication } from "@/models/application";
import { useUserDataContext } from "@/serviceProviders/userDataContext";
import CondensedJobCard from "@/components/CondensedJobCard";

function Dashboard() {
    const {counselorData} = useUserDataContext();
    const [, setUnverifiedRecruiters] = useState<RecruiterData[]>([]);
    const [unverifiedJobs, setUnverifiedJobs] = useState<Job[]>([]);
    const [, setApplicationsForReview] = useState<CounselorApplication[]>([]);
    
    const {getUnverifiedPostingsService, getUnVerifiedRecruitersService, getApplicationsForReviewService, approvePostingService, deletePostingService } = useCounselorServices();
    console.log(counselorData?.applicationReviews);
    useEffect(() => {
        if(counselorData) {
            const populateData = async () => {
                setUnverifiedRecruiters(await getUnVerifiedRecruitersService({}));
                setUnverifiedJobs(await getUnverifiedPostingsService({}));
                setApplicationsForReview(await getApplicationsForReviewService(counselorData.id, {}));
            }
            populateData();
        }
    }, [counselorData])

    return (
       <main className="px-[60px] flex flex-row gap-[20px] flex-wrap-reverse">
            <div className="grow-[3]">
                <h4 className="mb-[8px]">Jobs for Review</h4>
                <div className="flex flex-col gap-[16px] min-w-[350px] mb-[32px]">
                    {unverifiedJobs.length > 0 && unverifiedJobs.map((value, index) => {
                        return <CondensedJobCard status={"pending"} key={index} job={value} showButtons buttons={[
                            {
                                action: async () => {
                                    const temp = await approvePostingService(value.id, {});
                                    setUnverifiedJobs(temp);
                                },
                                text: "Accept"
                            },
                            {
                                action: async () => {
                                    await deletePostingService(value.id, {});
                                    setUnverifiedJobs(prev => prev.filter((j) => j.id != value.id));
                                },
                                text: "Deny",
                            }
                        ]}/>;
                    })}
                    {unverifiedJobs.length == 0 && <div className="text-white-700">No jobs to review.</div>}
                </div>
                <h4 className="mb-[8px]">Completed</h4>
                <div className="flex flex-col gap-[16px] min-w-[350px] mb-[32px]">
                </div>
            </div>
            <div className="flex flex-col gap-[16px] min-w-[350px] grow">
                <div className="border-white-500 flex flex-col gap-[10px] rounded-[8px] bg-white-100 p-[16px]">
                    <h5 className="text-white-700">Hello,</h5>
                    <h1 className="text-[30px] font-inter tracking-normal mt-[-10px]">{counselorData?.name}</h1>
                    <div className="flex flex-row font-bold text-[14px] gap-[10px]">
                        <div className="p-[6px] bg-blue-100 text-blue-400 rounded-[5px] max-w-fit">
                            Counselor
                        </div>
                        <div className="p-[6px] bg-green-100 text-green-700 rounded-[5px]">
                            Tesla STEM High School
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-[16px] min-w-[350px]">
                    <h4 className="mb-[8px]">Bookmarks</h4>
                </div>
            </div>
        </main>
    )
}

const protectedComponent = withProtection(Dashboard, { auth: true, role: ["counselor"] });

export default protectedComponent;
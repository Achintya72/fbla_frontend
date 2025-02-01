"use client";

import useCounselorServices from "@/services/counselor.service";
import withProtection from "@/components/protected"
import { RecruiterData } from "@/models/recruiter";
import { useEffect, useState } from "react";
import { Job } from "@/models/jobs";
import { CounselorApplication } from "@/models/application";
import { useUserDataContext } from "@/serviceProviders/userDataContext";
import CondensedJobCard from "@/components/CondensedJobCard";
import { useStudentDataService } from "@/services/student.service";
import { StudentPage } from "@/models/student";
import { useJobContext } from "@/serviceProviders/jobsContext";
import Button from "@/components/button";

function Dashboard() {
    const { counselorData } = useUserDataContext();
    const { jobs } = useJobContext();
    const [, setRecruiters] = useState<RecruiterData[]>([]);
    const [unverifiedJobs, setUnverifiedJobs] = useState<Job[]>([]);
    const [applicationsForReview, setApplicationsForReview] = useState<CounselorApplication[]>([]);
    const [unverifiedRecruiters, setUnverifiedRecruiters] = useState<RecruiterData[]>([]);


    const { getStudentPageService } = useStudentDataService();
    const { getUnverifiedPostingsService, verifyRecruiterService, getUnVerifiedRecruitersService, getApplicationsForReviewService, approvePostingService, deletePostingService } = useCounselorServices();
    console.log(counselorData?.applicationReviews);
    useEffect(() => {
        if (counselorData) {
            const populateData = async () => {
                setUnverifiedRecruiters(await getUnVerifiedRecruitersService({}));
                setUnverifiedJobs(await getUnverifiedPostingsService({}));
                setUnverifiedRecruiters(await getUnVerifiedRecruitersService({}));
                let applications = await getApplicationsForReviewService(counselorData.id, {});
                applications = await Promise.all(applications.map(async (app) => {
                    const page = await getStudentPageService(app.student, {});
                    if (page) {
                        return { ...app, page };
                    }
                    return app;
                }))
                setApplicationsForReview(applications);
            }
            populateData();
        }
    }, [counselorData])

    return (
        <main className="px-[20px] md:px-[60px] flex flex-row gap-[20px] flex-wrap-reverse">
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
                        ]} />;
                    })}
                    {unverifiedJobs.length == 0 && <div className="text-white-700">No jobs to review.</div>}
                </div>
                <h4 className="mb-[8px]">Recruiters to Approve</h4>
                <div className="flex flex-col gap-[16px] min-w-[350px] mb-[32px]">
                    {unverifiedRecruiters.length > 0 ?
                        unverifiedRecruiters.map(recruiter => (
                            <div key={recruiter.id} className="p-[16px] flex items-end justify-between rounded-[8px] bg-white-100 border border-white-500">
                                <div className="flex flex-col gap-[10px]">
                                    <h4>{recruiter.name}</h4>
                                    <div className="flex items-center gap-[10px]">
                                        <img src={recruiter.company.logo} alt={recruiter.company.name} className="w-[40px] h-[40px] rounded-full object-contain" />
                                        <strong>{recruiter.company.name}</strong>
                                    </div>
                                </div>
                                <Button onClick={() => {
                                    console.log("Clicked!!");
                                    const response = verifyRecruiterService(recruiter.id, {});
                                    setUnverifiedRecruiters(prev => [...prev.filter(r => r.id !== recruiter.id)]);
                                }} size="small">Approve</Button>
                            </div>
                        ))
                        :
                        <div className="text-white-700">No recruiters to review.</div>}
                </div>
                <h4 className="mb-[8px]">Application Review Requests</h4>
                <div className="flex flex-col gap-[16px] min-w-[350px] mb-[32px]">
                    {applicationsForReview.map((app, i) => (
                        <div key={i} className="flex gap-[10px] items-center  p-[16px] rounded-[8px] bg-white-100 border border-white-500">
                            <div className="flex flex-1 flex-col">
                                <h4>{app?.page?.name}</h4>
                                <p key={app.id}>{jobs.find(j => j.id === app.job)?.title}</p>
                            </div>
                            <Button size="small" variant="secondary">Comments</Button>
                            <Button size="small">Done</Button>
                        </div>
                    ))}
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
                    <h4 className="mb-[8px]">Endorsement Requests</h4>
                </div>
            </div>
        </main>
    )
}

const protectedComponent = withProtection(Dashboard, { auth: true, role: ["counselor"] });

export default protectedComponent;
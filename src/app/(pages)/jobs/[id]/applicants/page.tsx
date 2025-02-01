"use client";

import Button from "@/components/button";
import Loader from "@/components/Loader";
import withProtection from "@/components/protected"
import { RecruiterApplication } from "@/models/application";
import { useJobContext } from "@/serviceProviders/jobsContext";
import { useRecruiterService } from "@/services/recruiter.service";
import { useStudentDataService } from "@/services/student.service";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import ApplicationModal from "../../ApplicationModal";

function ViewApplicants() {
    const [applications, setApplications] = useState<RecruiterApplication[]>([]);
    const [currentApp, setCurrentApp] = useState<RecruiterApplication | undefined>();

    const { id } = useParams();
    const { jobs } = useJobContext();
    const { getStudentPageService } = useStudentDataService();
    const { getApplicationsForJobService, publishJobResultsService, changeApplicationStatusService } = useRecruiterService();
    const job = jobs.find(j => j.id === id);

    useEffect(() => {
        const fetch = async () => {
            if (typeof id === "string") {
                const response = await getApplicationsForJobService(id, {});
                setApplications(await Promise.all(response.map(async (app) => {
                    const page = await getStudentPageService(app.student, {});
                    return { ...app, page } as RecruiterApplication;
                })));
            }
        };

        fetch();
    }, [])

    if (job == undefined) {
        return <Loader />
    }

    const rejected = applications.filter(app => app.recruiterClassification === "rejected");
    const progress = applications.filter(app => app.recruiterClassification === "in-progress");
    const accepted = applications.filter(app => app.recruiterClassification === "accepted");


    const accept = async (id: string) => {
        const response = await changeApplicationStatusService(id, "accepted", {});
        if (response) {
            setApplications(prev => {
                const index = prev.findIndex(a => a.id === id);
                if (index > -1) {
                    prev[index].recruiterClassification = "accepted";
                }
                return [...prev];
            });
        }
    }

    const reject = async (id: string) => {
        const response = await changeApplicationStatusService(id, "rejected", {});
        if (response) {
            setApplications(prev => {
                const index = prev.findIndex(a => a.id === id);
                if (index > -1) {
                    prev[index].recruiterClassification = "rejected";
                }
                return [...prev];
            });
        }
    }

    const inProgress = async (id: string) => {
        const response = await changeApplicationStatusService(id, "in-progress", {});
        if (response) {
            setApplications(prev => {
                const index = prev.findIndex(a => a.id === id);
                if (index > -1) {
                    prev[index].recruiterClassification = "in-progress";
                }
                return [...prev];
            });
        }
    }

    return (
        <>
            <main className="px-[60px]">
                <div>
                    <div className="bg-white-200 flex justify-between items-center py-[10px] sticky top-0">
                        <h5>{job.title}</h5>
                        <Button onClick={() => {
                            publishJobResultsService(job.id, {});
                        }}>Publish</Button>
                    </div>
                    <div className="grid grid-cols-3 gap-[10px]">
                        <div>
                            <h6 className="mb-[10px]">Rejected</h6>
                            {rejected.map(app => (
                                <div key={app.id} className="mb-[10px] p-[16px] flex flex-col gap-[10px] rounded-[8px] bg-white-100 border border-white-500">
                                    <h5>{app.page.name}</h5>
                                    <div className="flex *:flex-1 gap-[10px]">
                                        <Button size="small" variant="secondary" onClick={(e) => {
                                            e.stopPropagation();
                                            inProgress(app.id)
                                        }}>In-Progress</Button>
                                        <Button size="small" onClick={(e) => {
                                            e.stopPropagation();
                                            accept(app.id)
                                        }} >Accept</Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div>
                            <h6 className="mb-[10px]">In-Progress</h6>
                            {progress.map(app => (
                                <div key={app.id} onClick={() => setCurrentApp(app)} className="mb-[10px] p-[16px] flex flex-col gap-[10px] rounded-[8px] bg-white-100 border border-white-500">
                                    <h5>{app.page.name}</h5>
                                    <div className="flex *:flex-1 gap-[10px]">
                                        <Button size="small" variant="secondary" onClick={(e) => {
                                            e.stopPropagation();
                                            reject(app.id)
                                        }}>Reject</Button>
                                        <Button size="small" onClick={(e) => {
                                            e.stopPropagation();
                                            accept(app.id)
                                        }} >Accept</Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div>
                            <h6 className="mb-[10px]">Accepted</h6>
                            {accepted.map(app => (
                                <div key={app.id} className="mb-[10px] p-[16px] flex flex-col gap-[10px] rounded-[8px] bg-white-100 border border-white-500">
                                    <h5>{app.page.name}</h5>
                                    <div className="flex *:flex-1 gap-[10px]">
                                        <Button size="small" variant="secondary"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                reject(app.id)
                                            }}>Reject</Button>
                                        <Button size="small" onClick={(e) => {
                                            e.stopPropagation();
                                            inProgress(app.id)
                                        }}>In-Progress</Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
            {currentApp &&
                <ApplicationModal application={currentApp} close={() => setCurrentApp(undefined)} />
            }
        </>
    )
}

export default withProtection(ViewApplicants, {
    auth: true,
    role: ["recruiter"]
});
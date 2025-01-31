"use client";

import Loader from "@/components/Loader";
import withProtection from "@/components/protected";
import JobsContext from "@/serviceProviders/jobsContext";
import { student } from "@/utils/mockData";
import { useUserDataContext } from "@/serviceProviders/userDataContext";
import classes from "@/utils/classes";
import { CaretLeft, Paperclip, Plus, Upload, X } from "@phosphor-icons/react/dist/ssr";
import { redirect, useParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { useFetchStudentData } from "@/services/student";
import { StudentApplication } from "@/models/application";
import Button from "@/components/button";

function Apply() {
    const { jobs, populated } = useContext(JobsContext);
    const { studentData } = useUserDataContext();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>("");
    const [app, setApp] = useState<StudentApplication | undefined>(undefined);
    const { getApplication, requestReviewApplication, makeStudentApplication, setStudentApplication } = useFetchStudentData();
    const { id } = useParams();

    const job = jobs.find((job) => job.id === id);

    useEffect(() => {
        const fetchApplication = async () => {
            if(studentData && typeof id === "string") {
                const application = await getApplication(studentData?.id, id, setError, setLoading);
                if(application) {
                    setApp(application);
                } else {
                    setApp({
                        additionalInformation: "",
                        counselorComments: [],
                        id: "NEW",
                        job: id,
                        status: "in-progress",
                        student: studentData.id,
                        submitted: false,
                        coverLetter: undefined,
                        resume: undefined
                    } as StudentApplication)
                }
            }
        }

        fetchApplication();
    }, []);

    const uploadNewApplication = async () => {
        if(app) {
            const newApp = await makeStudentApplication(app, setError, setLoading);
            if(newApp) {
                setApp(newApp)
            }
        }
    }

    const setApplication = async () => {
        if(app) {
            const newApp = await setStudentApplication(app, setError, setLoading);
            if(newApp) {
                setApp(newApp);
            }
        }
    }

    const handleApplicationSave = () => {
        if(app) {
            if(app.id === "NEW") {
                uploadNewApplication();
            } else {
                setApplication();
            }
        }
    }

    if (!populated || loading || app == undefined) {
        return (
            <div className="w-full h-screen flex justify-center items-center">
                <Loader />
            </div>
        )
    }

    if (job == undefined) {
        return redirect("/jobs");
    }

    const wordCount = (app.additionalInformation.match(/\b\w+\b/g) || []).length;

    return (
        <main className="w-full px-[60px]">
            <Link href={'/jobs/' + job.id} className="cursor-pointer sticky top-0 w-full py-[10px] flex justify-start items-center gap-[10px]">
                <CaretLeft size={20} />
                <h6>{job.title}</h6>
            </Link>
            <section className="mt-[20px] p-[16px] bg-white-100 rounded-[8px] border border-white-500">
                <h5 className="mb-[12px]">Attach Cover Letter</h5>
                <div className="flex gap-[10px]">
                    {studentData!.coverLetters.map((letter, i) => (
                        <div
                            onClick={() => {
                                let newLetter = undefined;
                                if(app.coverLetter?.name != letter.name) {
                                    newLetter = letter;
                                }
                                setApp(prev => {
                                    prev!.coverLetter = newLetter;
                                    return {...prev} as StudentApplication;
                                });
                            }}
                            key={i}
                            className={classes(
                                "flex p-[8px] rounded-[4px] font-font-inter",
                                "gap-[10px] items-center",
                                letter.name === app.coverLetter?.name ? "bg-blue-400 text-white-100" : "bg-blue-100 text-blue-400"
                            )}>
                            <p className="font-bold">{letter.name}</p>
                            {letter.name === app.coverLetter?.name && <X size={16} />}
                        </div>
                    ))}
                    <div
                        className={classes(
                            "flex p-[8px] rounded-[4px] font-font-inter",
                            "gap-[10px] items-center",
                            "bg-blue-100 text-blue-400"
                        )}
                    >
                        <Plus size={16} weight="bold" />
                    </div>
                </div>
            </section>
            <section className="mt-[20px] items-center flex gap-[10px] p-[16px] bg-white-100 rounded-[8px] border border-white-500">
                <h5 className="flex-1">Attach Resume</h5>
                <div
                    onClick={() => {
                        if (student.resume) {
                            let newResume = app.resume ? undefined : student.resume;
                            setApp(prev => {
                                prev!.resume = newResume;
                                return {...prev} as StudentApplication;
                            });
                        }
                    }}
                    className={classes(
                        "flex p-[8px] rounded-[4px] font-font-inter",
                        "gap-[10px] items-center",
                        app.resume ? "bg-blue-400 text-white-100" : "bg-blue-100 text-blue-400"
                    )}>
                    {student.resume ?
                        <Paperclip size={20} /> : <Upload size={20} />
                    }
                    <p className="font-bold">{student.resume ? `${app.resume ? "Attached" : "Attach"}` : "Upload"}</p>
                </div>
            </section>
            <section className="mt-[20px] p-[16px] bg-white-100 rounded-[8px] border border-white-500">
                <h5 className="flex-1 mb-[12px]">Additional Info</h5>
                <div className="w-full relative">
                    <textarea value={app.additionalInformation} onChange={(e) => {
                        setApp(prev => {
                            prev!.additionalInformation = e.target.value;
                            return {...prev} as StudentApplication;
                        });
                    }} className="min-h-[200px] w-full relative z-0 bg-white-400 p-[16px] rounded-[8px]" />
                    <small className="absolute z-10 right-[8px] bottom-[8px]">{wordCount}/300</small>
                </div>
            </section>
            <section className="mt-[20px] items-center flex gap-[10px] p-[16px] bg-white-100 rounded-[8px] border border-white-500">
                <h5 className="flex-1">Request Review</h5>
                <div
                    onClick={() => {
                    }}
                    className={classes(
                        "flex p-[8px] rounded-[4px] font-font-inter",
                        "gap-[10px] items-center",
                         "bg-blue-100 text-blue-400"
                    )}>
                    <p className="font-bold">{app.id === "NEW" ? "Please Save Application First" : "Request Counselor"}</p>
                </div>
            </section>
            <section className="mt-[20px] flex items-center gap-[10px]">
                <Button size="large" variant="secondary" onClick={handleApplicationSave}>Save</Button>
                <Button size="large">Submit</Button>
            </section>
        </main>
    )
}

export default withProtection(Apply, {
    auth: true,
    role: ["student"]
});
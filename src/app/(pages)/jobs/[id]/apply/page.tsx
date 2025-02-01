"use client";

import Loader from "@/components/Loader";
import withProtection from "@/components/protected";
import JobsContext from "@/serviceProviders/jobsContext";
import { useUserDataContext } from "@/serviceProviders/userDataContext";
import classes from "@/utils/classes";
import { CaretLeft, Paperclip, Plus, Upload, X } from "@phosphor-icons/react/dist/ssr";
import { redirect, useParams } from "next/navigation";
import { Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import Link from "next/link";
import { useStudentDataService } from "@/services/student.service";
import { StudentApplication } from "@/models/application";
import Button from "@/components/button";
import PdfUploadModal from "@/components/pdfUploadModal";
import useFileRepo from "@/repositories/files.repository";
import { CoverLetter, StudentData } from "@/models/student";

function Apply() {
    const { jobs, populated } = useContext(JobsContext);
    const { studentData } = useUserDataContext();
    const [loading, setLoading] = useState(true);
    const [, setError] = useState<string>("");
    const [app, setApp] = useState<StudentApplication | undefined>(undefined);
    const { 
        getApplicationService, 
        //requestReviewApplicationService, 
        makeStudentApplicationService, 
        setStudentApplication, 
        setStudentDataService, 
        makeCoverLetterService 
    } = useStudentDataService();
    const { id } = useParams();
    const [letterUpload, setLetterUpload] = useState<boolean>(false);
    const [resumeUpload, setResumeUpload] = useState<boolean>(false);
    const {uploadFileToServerRepo} = useFileRepo();

    const job = jobs.find((job) => job.id === id);

    useEffect(() => {
        const fetchApplication = async () => {
            if (studentData && typeof id === "string") {
                const application = await getApplicationService(studentData?.id, id, {setError, setLoading});
                if (application) {
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

    const uploadNewApplication = async (a: StudentApplication) => {
        const newApp = await makeStudentApplicationService(a, {setError, setLoading});
        if (newApp) {
            setApp(newApp)
        }
    }

    const setApplication = async (a: StudentApplication) => {
        const newApp = await setStudentApplication(a, {setError, setLoading});
        if (newApp) {
            setApp(newApp);
        }
    }

    const handleApplicationSave = () => {
        if (app) {
            if (app.id === "NEW") {
                uploadNewApplication(app);
            } else {
                setApplication(app);
            }
        }
    }

    const handleApplicationSubmit = () => {
        if (app) {
            const a = { ...app, submitted: true, status: "pending" } as StudentApplication;
            console.log(a);
            if (app.id === "NEW") {
                uploadNewApplication(a);
            } else {
                setApplication(a);
            }
        }
    }

    const handleLetterSubmit = async (data: { file: File; fileName: string; isOk: boolean }, setError?: Dispatch<SetStateAction<string>>, setLoading?: Dispatch<SetStateAction<boolean>>) => {
        if (data.isOk && studentData) {
            const url = await uploadFileToServerRepo(data.file, setError, setLoading);
            if(url) {
                const coverLetter: CoverLetter = {name: data.fileName, url: url};
                // Do the cover letter add thing
                const success = makeCoverLetterService(studentData.id, coverLetter, {setError, setLoading});
                // Set the application to reflect the selected cover letter
                

                setApp(prev => {
                    prev!.coverLetter = coverLetter;
                    return { ...prev } as StudentApplication;
                });
                return success;
            }
        }
        return false;
    }

    const handleResumeSubmit = async (data: { file: File; fileName: string; isOk: boolean }, setError?: Dispatch<SetStateAction<string>>, 
        setLoading?: Dispatch<SetStateAction<boolean>>) => {
        if(data.isOk) {
            const url = await uploadFileToServerRepo(data.file, setError, setLoading);
            if(url) {
                const result = await setStudentDataService({ ...studentData, resume: url } as StudentData, {setError, setLoading});
                if(result) {
                    setApp(prev => ({
                       ...prev, resume: url 
                    } as StudentApplication))
                    return true;
                }
            }
        }
        return false;
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

            <Link href={'/jobs/' + job.id} className="cursor-pointer bg-white-200 sticky top-0 w-full py-[10px] flex justify-start items-center gap-[10px]">
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
                                if (app.coverLetter?.name != letter.name) {
                                    newLetter = letter;
                                }
                                setApp(prev => {
                                    prev!.coverLetter = newLetter;
                                    return { ...prev } as StudentApplication;
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
                        onClick={() => setLetterUpload(true)}
                    >
                        <Plus size={16} weight="bold" />
                    </div>
                </div>
                {app.coverLetter &&
                    <div className="w-full aspect-[17/22]">
                        <iframe src={app.coverLetter.url} width="100%" height="100%" />
                    </div>
                }
            </section>
            <section className="mt-[20px] flex flex-col gap-[10px] p-[16px] bg-white-100 rounded-[8px] border border-white-500">
                <div className="flex items-center justify-between">
                    <h5 className="flex-1">Attach Resume</h5>
                    <div
                        onClick={() => {
                            if (studentData?.resume) {
                                const newResume = app.resume ? undefined : studentData.resume;
                                setApp(prev => {
                                    prev!.resume = newResume;
                                    return { ...prev } as StudentApplication;
                                });
                            } else {
                                setResumeUpload(true);
                            }
                        }}
                        className={classes(
                            "flex p-[8px] rounded-[4px] font-font-inter",
                            "gap-[10px] items-center",
                            app.resume ? "bg-blue-400 text-white-100" : "bg-blue-100 text-blue-400"
                        )}>
                        {studentData?.resume ?
                            <Paperclip size={20} /> : <Upload size={20} />
                        }
                        <p className="font-bold">{studentData?.resume ? `${app.resume ? "Attached" : "Attach"}` : "Upload"}</p>
                    </div>
                </div>
                {app.resume &&
                    <div className="w-full aspect-[17/22]">
                        <iframe src={app.resume} width="100%" height="100%" />
                    </div>
                }
            </section>
            <section className="mt-[20px] p-[16px] bg-white-100 rounded-[8px] border border-white-500">
                <h5 className="flex-1 mb-[12px]">Additional Info</h5>
                <div className="w-full relative">
                    <textarea value={app.additionalInformation} onChange={(e) => {
                        setApp(prev => {
                            prev!.additionalInformation = e.target.value;
                            return { ...prev } as StudentApplication;
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
                <Button size="large" onClick={handleApplicationSubmit}>Submit</Button>
            </section>
            {letterUpload && <PdfUploadModal title="Upload Cover Letter PDF" onSubmit={handleLetterSubmit} onClose={() => setLetterUpload(false)} />}
            {resumeUpload && <PdfUploadModal title="Upload Resume PDF" onSubmit={handleResumeSubmit} onClose={() => setResumeUpload(false)} />}
        </main>
    )
}

export default withProtection(Apply, {
    auth: true,
    role: ["student"]
});
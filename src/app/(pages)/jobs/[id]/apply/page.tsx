"use client";

import Loader from "@/components/Loader";
import withProtection from "@/components/protected";
import JobsContext from "@/serviceProviders/jobsContext";
import { student } from "@/utils/mockData";
import { useUserDataContext } from "@/serviceProviders/userDataContext";
import classes from "@/utils/classes";
import { CaretLeft, Paperclip, Plus, Upload, X } from "@phosphor-icons/react/dist/ssr";
import { redirect, useParams } from "next/navigation";
import { useContext, useState } from "react";
import Link from "next/link";

function Apply() {
    const { jobs, populated } = useContext(JobsContext);
    const { studentData } = useUserDataContext();
    const [coverLetter, setCoverLetter] = useState<number>(-1);
    const [resume, setResume] = useState<string | undefined>(undefined);
    const [additionalInfo, setAdditionalInfo] = useState<string>("")
    const params = useParams();

    const job = jobs.find((job) => job.id === params.id);

    if (!populated) {
        return (
            <div className="w-full h-screen flex justify-center items-center">
                <Loader />
            </div>
        )
    }

    if (job == undefined) {
        return redirect("/jobs");
    }

    const wordCount = (additionalInfo.match(/\b\w+\b/g) || []).length;

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
                                setCoverLetter(coverLetter === i ? -1 : i);
                            }}
                            key={i}
                            className={classes(
                                "flex p-[8px] rounded-[4px] font-font-inter",
                                "gap-[10px] items-center",
                                i === coverLetter ? "bg-blue-400 text-white-100" : "bg-blue-100 text-blue-400"
                            )}>
                            <p className="font-bold">{letter.name}</p>
                            {i === coverLetter && <X size={16} />}
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
                            setResume(prev => prev ? undefined : student.resume);
                        }
                    }}
                    className={classes(
                        "flex p-[8px] rounded-[4px] font-font-inter",
                        "gap-[10px] items-center",
                        resume ? "bg-blue-400 text-white-100" : "bg-blue-100 text-blue-400"
                    )}>
                    {student.resume ?
                        <Paperclip size={20} /> : <Upload size={20} />
                    }
                    <p className="font-bold">{student.resume ? "Attach" : "Upload"}</p>
                </div>
            </section>
            <section className="mt-[20px] p-[16px] bg-white-100 rounded-[8px] border border-white-500">
                <h5 className="flex-1 mb-[12px]">Additional Info</h5>
                <div className="w-full relative">
                    <textarea value={additionalInfo} onChange={(e) => {
                        setAdditionalInfo(e.target.value);
                    }} className="min-h-[200px] w-full relative z-0 bg-white-400 p-[16px] rounded-[8px]" />
                    <small className="absolute z-10 right-[8px] bottom-[8px]">{wordCount}/300</small>
                </div>
            </section>
            <section className="mt-[20px] items-center flex gap-[10px] p-[16px] bg-white-100 rounded-[8px] border border-white-500">
                <h5 className="flex-1">Request Review</h5>
                <div
                    onClick={() => {
                        if (student.resume) {
                            setResume(prev => prev ? undefined : student.resume);
                        }
                    }}
                    className={classes(
                        "flex p-[8px] rounded-[4px] font-font-inter",
                        "gap-[10px] items-center",
                        resume ? "bg-blue-400 text-white-100" : "bg-blue-100 text-blue-400"
                    )}>
                    {student.resume ?
                        <Paperclip size={20} /> : <Upload size={20} />
                    }
                    <p className="font-bold">{student.resume ? "Attach" : "Upload"}</p>
                </div>
            </section>
        </main>
    )
}

export default withProtection(Apply, {
    auth: true,
    role: ["student"]
});
"use client";

import Button from "@/components/button";
import { RecruiterApplication } from "@/models/application";
import { X } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

export default function ApplicationModal({ application, close }: { application: RecruiterApplication, close: () => void }) {
    
    
    return (
        <main className="absolute top-0 left-0 w-full h-screen z-50  bg-[rgba(0,0,0,0.5)] flex items-center justify-center">
            <div className="p-[40px] rounded-[10px] max-h-[600px] overflow-y-auto bg-white-100 w-full flex flex-col gap-[10px] max-w-[600px]">
                <div className="flex items-center justify-between">
                    <h5>{application.page.name}&apos;s Application</h5>
                    <X onClick={close} size={20} />
                </div>
                {application.coverLetter &&
                    <>
                        <h5>Cover Letter</h5>
                        <div className="w-full aspect-[17/22]">
                            <iframe src={application.coverLetter.url} width="100%" height="100%" />
                        </div>
                    </>
                }
                {application.resume &&
                    <>
                        <h5>Resume</h5>
                        <div className="w-full aspect-[17/22]">
                            <iframe src={application.resume} width="100%" height="100%" />
                        </div>
                    </>

                }
                {application.additionalInformation &&
                    <div>
                        <h5>Additional Information</h5>
                        <p>{application.additionalInformation}</p>
                    </div>
                }
                <Link href={`/student/${application.student}`}>
                    <Button size="small" variant="secondary">View Student Page</Button>
                </Link>
            </div>
        </main>
    )
}
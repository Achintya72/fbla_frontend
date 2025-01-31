"use client";

import Loader from "@/components/Loader";
import withProtection from "@/components/protected";
import { StudentPage } from "@/models/student";
import { useFetchStudentData } from "@/services/student";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

function Page() {
    const [loading, setLoading] = useState<boolean>(true);
    const [, setError] = useState<string>("");
    const [page, setPage] = useState<StudentPage | undefined>(undefined);
    const { id } = useParams();
    const { fetchStudentPage } = useFetchStudentData();

    useEffect(() => {
        const setStudentData = async () => {
            if (id && typeof id == 'string') {
                setPage(await fetchStudentPage(id, setError, setLoading));
            }
        };

        setStudentData();
    }, []);

    if (loading) {
        return <Loader />
    }

    return (
        <main className="mx-[60px] relative flex flex-col items-center">
            <div className="absolute z-0 w-full h-[200px] rounded-[8px] bg-green-100" />
            <section className="w-full relative z-10 mt-[100px] flex flex-col gap-[20px] items-center">
                <div className="bg-white-400 border-8 border-white-200 w-[200px] h-[200px] rounded-full" />
                <h4>{page?.name}</h4>
                <div className="w-full flex gap-[20px] items-start">
                    <div className="flex-1">
                        <h6 className="mb-[6px]">About Me</h6>
                        <p>{page?.bio}</p>
                    </div>
                    <div className="bg-white-100 max-w-[300px] flex flex-col gap-[20px] min-w-[250px] p-[16px] rounded-[8px] border border-white-500">
                        {(page?.links ?? []).map((link, i) =>
                            <div key={i}>
                                <h6 className="text-white-800 mb-[6px]">{link.name}</h6>
                                <Link href={link.url} className="flex items-center gap-[10px]">
                                    <p className="flex-1 text-ellipsis">{link.url}</p>
                                    <ArrowUpRight size={20} />
                                </Link>
                            </div>)
                        }
                    </div>
                </div>
                <div className="w-full">
                    <h4 className="mb-[12px]">Projects</h4>
                    <div className="w-full gap-[10px]">
                        {(page?.projects ?? []).map((project, i) => (
                            <div key={i}>
                                <div className="flex mb-[6px] gap-[10px] overflow-x-auto">
                                    {project.images.map((image, k) =>
                                        <img key={k} className="w-[75px] object-cover h-[75px] rounded-[8px] " src={image} alt={`${project.name}-${k}`} />
                                    )}
                                </div>
                                <div className="flex justify-between items-center">
                                    <h6>{project.name}</h6>
                                    <small>{project.startDate != undefined ? project.startDate.toDateString().slice(4) + " - " + (project.endDate != undefined ? project.endDate.toDateString().slice(4) : "Today") : ""}</small>
                                </div>
                                <p className="mb-[6px]">{project.description}</p>
                                <div className="flex gap-[10px] flex-wrap">
                                    {project.skills.map((skill, j) => (
                                        <p key={j} className="py-[8px] px-[16px] rounded-full bg-white-400 text-white-700 font-bold">
                                            {skill}
                                        </p>
                                    ))}

                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="w-full">
                    <h4 className="mb-[12px]">Employments</h4>
                    <div className="w-full gap-[10px]">
                        {(page?.employments ?? []).map((project, i) => (
                            <div key={i}>
                                <div className="flex justify-between items-center">
                                    <h6>{project.role}<span className="font-normal"> - {project.company}</span></h6>
                                    <small>{project.startDate ? project.startDate.toDateString().slice(4) + " - " + (project.endDate != undefined ? project.endDate.toDateString().slice(4) : "Today") : ""}</small>
                                </div>
                                <p className="mb-[6px]">{project.description}</p>
                                <div className="flex gap-[10px] flex-wrap">
                                    {project.skills.map((skill, j) => (
                                        <p key={j} className="py-[8px] px-[16px] rounded-full bg-white-400 text-white-700 font-bold">
                                            {skill}
                                        </p>
                                    ))}

                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    )
}

export default withProtection(Page, {
    auth: true
})
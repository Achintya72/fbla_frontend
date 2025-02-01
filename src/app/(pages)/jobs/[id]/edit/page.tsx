"use client";

import Input from "@/components/input";
import RadioButtonGroup from "@/components/radioGroupInput";
import Loader from "@/components/Loader";
import withProtection from "@/components/protected"
import { JobLevel, Location, Commitment, Job } from "@/models/jobs";
import JobsContext from "@/serviceProviders/jobsContext";
import { useUserDataContext } from "@/serviceProviders/userDataContext";
import { useRecruiterService } from "@/services/recruiter.service";
import { CaretLeft } from "@phosphor-icons/react";
import { redirect, useParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import Button from "@/components/button";
import MultiTextBoxInput from "@/components/multiTextBoxInput";
import Error from "@/components/Error/index"
import Link from "next/link";

export interface JobForm extends FieldValues, FormData {
    title: string;
    description: string;
    longDescription: string;
    responsibilities: string[];
    level: JobLevel;
    location: Location;
    commitment: Commitment;
    salary: number;
    hours: string;
    tags: string[];
    closeDate: Date | string;
    coverImage: string;
    skills: string[];
}

function EditJob() {
    const params = useParams();
    const { jobs, populated } = useContext(JobsContext);
    const { recruiterData } = useUserDataContext();
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState(false);

    const job = jobs.find((job) => job.id === params.id);
    const { control, register, handleSubmit, reset, formState: { errors }, } = useForm<JobForm>({
        mode: "all",
        reValidateMode: "onChange"
    });
    const { updateJobService } = useRecruiterService();

    const resetError = () => {
        setError("");
    }

    useEffect(() => {
        if (job != undefined)
            reset(
                {
                    title: job.title,
                    description: job.description,
                    longDescription: job.longDescription,
                    responsibilities: job.responsibilities,
                    level: job.level,
                    location: job.location,
                    commitment: job.commitment,
                    salary: job.salary,
                    hours: job.hours,
                    tags: job.tags,
                    closeDate: job.closeDate.toISOString().split("T")[0],
                    coverImage: job.coverImage,
                    skills: job.skills,
                }
            )
    }, [job, reset])

    const onSubmit = async (data: JobForm) => {
        if (job == undefined) {
            setError("Something went wrong. Try again later");
            return;
        }

        setLoading(true);

        const edits: Job = {
            ...job,
            title: data.title,
            description: data.description,
            longDescription: data.longDescription,
            responsibilities: data.responsibilities,
            level: data.level,
            location: data.location,
            commitment: data.commitment,
            salary: data.salary,
            hours: data.hours,
            tags: data.tags,
            closeDate: new Date(data.closeDate),
            coverImage: data.coverImage,
            skills: data.skills,
        }
        try {
            await updateJobService(edits, {});

            redirect(`/jobs/${job!.id}`);
        }
        finally {
            setLoading(false);
        }
    }

    if (!populated || recruiterData == undefined || job == undefined || loading) {
        return (
            <div className="w-full h-screen flex justify-center items-center">
                <Loader />
            </div>
        )
    }

    return (
        <main className="w-full px-[20px] md:px-[60px]">
            <h4>Create Job</h4>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Link href='/dashboard/recruiter' className="cursor-pointer sticky top-0 w-full py-[10px] flex justify-start items-center gap-[10px]">
                    <CaretLeft size={20} />
                    <h6>Recruiter Dashboard <span className="text-red-500">(You will lose unsaved work)</span></h6>
                </Link>
                <section className="mt-[20px] p-[16px] bg-white-100 rounded-[8px] border border-white-500">
                    <h5 className="mb-[12px]">Name and Description</h5>
                    <div className="flex flex-col gap-[16px]">
                        <Input<JobForm>
                            register={register}
                            error={errors.title}
                            label="title"
                            name="title"
                            options={{
                                required: "Required Field"
                            }}
                        />

                        <Input<JobForm>
                            register={register}
                            error={errors.description}
                            label="description"
                            name="description"
                            options={{
                                required: "Required Field"
                            }}
                        />

                        <Input<JobForm>
                            register={register}
                            error={errors.longDescription}
                            label="Long Description"
                            name="longDescription"
                            textType="textarea"
                            options={{
                                required: "Required Field"
                            }}
                        />
                    </div>
                </section>
                <section className="mt-[20px] p-[16px] bg-white-100 rounded-[8px] border border-white-500">
                    <h5 className="mb-[12px]">Skills Required</h5>
                    <div className="flex flex-col gap-[16px]">
                        <MultiTextBoxInput
                            register={register}
                            error={errors.responsibilities}
                            label="responsibilities"
                            name="responsibilities"
                            control={control}
                            options={{
                                required: "Required Field",
                                validate: (value: string[]) => value.length > 0 || "Must have at least one responsibility",
                            }}
                        />
                        <MultiTextBoxInput
                            register={register}
                            error={errors.skills}
                            label="skills"
                            name="skills"
                            control={control}
                            options={{
                                required: "Required Field",
                                validate: (value: string[]) => value.length > 0 || "Must have at least one skill",
                            }}
                        />
                    </div>
                </section>
                <section className="mt-[20px] p-[16px] bg-white-100 rounded-[8px] border border-white-500">
                    <h5 className="mb-[12px]">Other Key Info</h5>
                    <div className="flex flex-col gap-[16px]">
                        <RadioButtonGroup<JobForm>
                            register={register}
                            error={errors.location}
                            label="location"
                            name="location"
                            formOptions={{
                                required: "Required Field"
                            }}
                            options={["Hybrid", "Remote", "Onsite"]}
                        />

                        <RadioButtonGroup<JobForm>
                            register={register}
                            error={errors.commitment}
                            label="commitment"
                            name="commitment"
                            formOptions={{
                                required: "Required Field"
                            }}
                            options={["Full-time", "Part-time", "Up-To-You"]}
                        />

                        <RadioButtonGroup<JobForm>
                            register={register}
                            error={errors.level}
                            label="level"
                            name="level"
                            formOptions={{
                                required: "Required Field"
                            }}
                            options={["intern", "entry", "mid", "senior"]}
                        />

                        <Input<JobForm>
                            register={register}
                            error={errors.closeDate}
                            label="close Date"
                            name="closeDate"
                            type="date"
                            options={{
                                required: "Required Field",
                                validate: (value) => {
                                    const selectedDate = new Date(value);
                                    const today = new Date();

                                    return selectedDate > today || "Date must be after today";
                                }
                            }}
                        />
                        <MultiTextBoxInput
                            register={register}
                            error={errors.tags}
                            label="tags"
                            name="tags"
                            control={control}
                            options={{
                                required: "Required Field",
                                validate: (value: string[]) => value.length > 0 || "Must have at least one responsibility",
                            }}
                        />
                    </div>
                </section>
                <div className="mt-[10px]">
                    <Button type="submit">Submit</Button>
                </div>
            </form>
            <Error error={error} resetError={resetError} />
        </main>
    )
}

export default withProtection(EditJob, { auth: true, role: ["recruiter"] });
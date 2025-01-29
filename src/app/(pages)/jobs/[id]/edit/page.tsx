"use client";

import Input from "@/components/input";
import RadioButtonGroup from "@/components/radioGroupInput";
import Loader from "@/components/Loader";
import withProtection from "@/components/protected"
import { JobLevel, Location, Commitment } from "@/models/jobs";
import JobsContext from "@/repositories/jobsContext";
import { useUserDataContext } from "@/repositories/userDataContext";
import { useEditJob } from "@/services/jobs";
import { CaretLeft } from "@phosphor-icons/react";
import { redirect, useParams } from "next/navigation";
import { useContext, useEffect } from "react";
import { FieldValues, useForm } from "react-hook-form";
import Button from "@/components/button";
import MultiTextBoxInput from "@/components/multiTextBoxInput";

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
    const job = jobs.find((job) => job.id === params.id);
    const { control, register, handleSubmit, reset, formState: { errors }, } = useForm<JobForm>({
        mode: "all",
        reValidateMode: "onChange"
    });

    const editJob = useEditJob();

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
        editJob(job!.id, data);
        redirect(`/jobs/${job!.id}`);
    }

    if (!populated || recruiterData == undefined) {
        return (
            <div className="w-full h-screen flex justify-center items-center">
                <Loader />
            </div>
        )
    }

    if (job == undefined) {
        return redirect("/jobs");
    }

    return (
        <main className="w-full px-[60px]">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="sticky top-0 w-full py-[10px] flex justify-start items-center gap-[10px]">
                    <CaretLeft size={20} />
                    <h6>Recruiter Dashboard <span className="text-red-500">(You will lose unsaved work)</span></h6>
                </div>
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
                                validate: (value) => value.length > 0 || "Must have at least one responsibility",
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
                                validate: (value) => value.length > 0 || "Must have at least one skill",
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
                                validate: (value) => value.length > 0 || "Must have at least one responsibility",
                            }}
                        />
                    </div>
                </section>
                <div className="mt-[10px]">
                    <Button type="submit">Submit</Button>
                </div>
            </form>
        </main>
    )
}

export default withProtection(EditJob, { auth: true, role: ["recruiter"] });
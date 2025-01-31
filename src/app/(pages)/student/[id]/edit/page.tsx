"use client";

import Button from "@/components/button";
import Error from "@/components/Error";
import Loader from "@/components/Loader";
import { Employment, Link, Project, StudentData, StudentPage } from "@/models/student";
import { useStudentQueries } from "@/repositories/student.respository";
import { useUserDataContext } from "@/serviceProviders/userDataContext";
import { CaretLeft } from "@phosphor-icons/react";
import NextLink from "next/link";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditStudent() {
    const { studentData, setUserData } = useUserDataContext();
    const { updateStudentData } = useStudentQueries();
    const [error, setError] = useState<string>("");
    const [formData, setFormData] = useState<StudentPage | undefined>(undefined);

    useEffect(() => {
        if (studentData) {
            setFormData(studentData.page);
        }
    }, [studentData, setFormData])

    if (studentData == undefined || formData == undefined) {
        return <Loader />
    }

    console.log(formData.projects[0].startDate == undefined ? "" : formData.projects[0].startDate.toISOString().split("T")[0])


    const resetError = () => {
        setError("");
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleNestedChange = (key: keyof StudentPage, value: unknown) => {
        setFormData({
            ...formData,
            [key]: value,
        });
    };

    const handleEmploymentChange = (index: number, field: keyof Employment, value: unknown, reset: boolean = false) => {
        if ((value == undefined && (field == "startDate" || field == "endDate")) && !reset) return;
        const updatedEmployments = formData.employments.map((employment, i) =>
            i === index ? { ...employment, [field]: value } : employment
        );
        handleNestedChange("employments", updatedEmployments);
    };

    const clearDate = (type: "employments" | "projects", index: number, field: "startDate" | "endDate") => {
        if (type == "employments") handleEmploymentChange(index, field, undefined, true);
        else handleProjectChange(index, field, undefined, true);
    };

    const addEmployment = () => {
        const newEmployment: Employment = {
            company: "",
            role: "",
            startDate: new Date(),
            endDate: undefined,
            description: "",
            skills: []
        };
        const copy = formData.employments.slice();
        copy.push(newEmployment);
        handleNestedChange("employments", copy);
    };

    const removeEmployment = (index: number) => {
        if (formData.employments.length <= 1) return;
        const updatedEmployments = formData.employments.filter((_, i) => i !== index);
        handleNestedChange("employments", updatedEmployments);
    };

    const handleProjectChange = (index: number, field: keyof Project, value: unknown, reset: boolean = false) => {
        if ((value == undefined && (field == "startDate" || field == "endDate")) && !reset) return;
        const updatedProjects = formData.projects.map((project, i) =>
            i === index ? { ...project, [field]: value } : project
        );
        handleNestedChange("projects", updatedProjects);
    };

    const handleLinkChange = (linkIndex: number, field: "name" | "url", value: string) => {
        const updatedLinks = formData.links.map((link, i) =>
            i === linkIndex ? { ...link, [field]: value } : link
        );

        handleNestedChange("links", updatedLinks);
    };

    const addProjectLink = () => {
        const newLink: Link = { name: "", url: "" };
        const copy = formData.links.slice();
        copy.push(newLink);

        handleNestedChange("links", copy);
    };

    const removeProjectLink = (linkIndex: number) => {
        const copy = formData.links.slice().filter((_, ind) => ind != linkIndex);

        handleNestedChange("links", copy);
    };

    const addProject = () => {
        const newProject: Project = {
            name: "",
            startDate: undefined,
            endDate: undefined,
            description: "",
            skills: [],
            images: [],
            links: []
        };
        const copy = formData.projects.slice();
        copy.push(newProject);

        handleNestedChange("projects", copy);
    };

    const removeProject = (index: number) => {
        if (formData.projects.length <= 1) return;
        const updatedProjects = formData.projects.filter((_, i) => i !== index);
        handleNestedChange("employments", updatedProjects);
    };

    const validateFields = (data: unknown): boolean => {
        if (typeof data === "object" && data !== null) {
            return Object.entries(data).every(([key, value]) => {
                if (key === "startDate" || key === "endDate") {
                    return true; // Allow startDate and endDate to be undefined
                }
                if (Array.isArray(value)) {
                    return value.length > 0 && value.every(validateFields);
                }
                if (typeof value === "object") {
                    return validateFields(value);
                }
                return value !== "" && value !== undefined;
            });
        }
        return true;
    };


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateFields(formData)) {
            setError("All fields must be filled out.");
            return;
        }

        const copy: StudentData = { ...studentData };
        copy.page = formData;

        updateStudentData(copy);
        setUserData(copy);

        redirect('/dashboard/student')
    };

    return (
        <div className="w-full px-[60px]">
            <NextLink href='/dashboard/student' className="cursor-pointer sticky top-0 w-full py-[10px] flex justify-start items-center gap-[10px]">
                <CaretLeft size={20} />
                <h6>Student Dashboard <span className="text-red-500">(You will lose unsaved work)</span></h6>
            </NextLink>
            <form onSubmit={handleSubmit}>
                <div className="mt-[20px] p-[16px] bg-white-100 rounded-[8px] border border-white-500">
                    <h5 className="mb-[16px]">Basic Student Data</h5>
                    <label className="mb-2">
                        Name:
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={(e) => handleChange(e)}
                            className="w-full"
                        />
                    </label>
                    <label className="mb-2">
                        Bio:
                        <textarea
                            name="bio"
                            value={formData.bio}
                            onChange={(e) => handleChange(e)}
                            className="w-full"
                        />
                    </label>
                    <label className="mb-2">
                        Links
                    </label>
                    {formData.links.map((link, index) => (
                        <div key={index} className="w-full mb-[8px] flex flex-row gap-[5px] items-stretch">
                            <input
                                type="text"
                                value={link.name}
                                onChange={(e) => handleLinkChange(index, "name", e.target.value)}
                                placeholder="Link Name"
                                className="flex-1"
                            />
                            <input
                                type="text"
                                value={link.url}
                                onChange={(e) => handleLinkChange(index, "url", e.target.value)}
                                placeholder="URL"
                                className="flex-1"
                            />
                            <Button type="button" size='small' variant='secondary' onClick={() => removeProjectLink(index)}>
                                Remove
                            </Button>
                        </div>
                    ))}
                    <Button variant="primary" size="small" onClick={addProjectLink} type="button">
                        Add Link
                    </Button>
                </div>
                <div className="mt-[20px] p-[16px] bg-white-100 rounded-[8px] border border-white-500">
                    <h5>Employments</h5>
                    {formData.employments.map((employment, index) => (
                        <div key={index} className="mt-[20px] p-[16px] bg-white-100 rounded-[8px] border border-white-500">
                            <label>Company Name</label>
                            <input
                                type="text"
                                value={employment.company}
                                onChange={(e) => handleEmploymentChange(index, "company", e.target.value)}
                                placeholder="Company"
                                className="w-full mb-2"
                            />

                            <label>Role</label>
                            <input
                                type="text"
                                value={employment.role}
                                onChange={(e) => handleEmploymentChange(index, "role", e.target.value)}
                                placeholder="Role"
                                className="w-full mb-2"
                            />

                            <label>Start Date</label>
                            <input type="date" value={employment.startDate.toISOString().split("T")[0]} onChange={(e) => handleEmploymentChange(index, "startDate", new Date(e.target.value))}
                                className="w-full mb-2" />

                            <label>End Date</label>
                            <div className="flex flex-row gap-[10px] w-full mb-2">
                                <input type="date" value={employment.endDate?.toISOString().split("T")[0] ?? ""} onChange={(e) => handleEmploymentChange(index, "endDate", new Date(e.target.value))}
                                    className="flex-1" />
                                <Button type="button" size="small" variant="secondary" onClick={() => clearDate("employments", index, "endDate")}>
                                    Clear
                                </Button>
                            </div>

                            <label>Skills (Comma-seperated)</label>
                            <input
                                type="text"
                                value={employment.skills.join(", ")}
                                onChange={(e) => handleEmploymentChange(index, "skills", e.target.value.split(", "))}
                                placeholder="Skills (comma separated)"
                                className="w-full mb-2"
                            />

                            <label>Description</label>
                            <textarea
                                value={employment.description}
                                onChange={(e) => handleEmploymentChange(index, "description", e.target.value)}
                                placeholder="Description"
                                className="w-full mb-2"
                            />
                            <Button variant="secondary" onClick={() => removeEmployment(index)} size="small" type="button">
                                Remove
                            </Button>
                        </div>
                    ))}
                    <div className="mt-[16px]">
                        <Button variant="primary" size="small" onClick={addEmployment} type="button">
                            Add Employment
                        </Button>
                    </div>
                </div>

                <div className="mt-[20px] p-[16px] bg-white-100 rounded-[8px] border border-white-500">
                    <h5>Projects</h5>
                    {formData.projects.map((project, index) => (
                        <div key={index} className="mt-[20px] p-[16px] bg-white-100 rounded-[8px] border border-white-500">
                            <label>Project Name</label>
                            <input
                                type="text"
                                value={project.name}
                                onChange={(e) => handleProjectChange(index, "name", e.target.value)}
                                placeholder="Company"
                                className="w-full mb-2"
                            />

                            <label>Start Date</label>
                            <div className="flex flex-row gap-[10px] w-full mb-2">
                                <input type="date" value={project.startDate?.toISOString().split("T")[0] ?? ""} onChange={(e) => handleProjectChange(index, "startDate", new Date(e.target.value))}
                                    className="flex-1" />
                                <Button type="button" size="small" variant="secondary" onClick={() => clearDate("projects", index, "startDate")}>
                                    Clear
                                </Button>
                            </div>

                            <label>End Date</label>
                            <div className="flex flex-row gap-[10px] w-full mb-2">
                                <input type="date" value={project.endDate?.toISOString().split("T")[0] ?? ""} onChange={(e) => handleProjectChange(index, "endDate", new Date(e.target.value))}
                                    className="flex-1" />
                                <Button type="button" size="small" variant="secondary" onClick={() => clearDate("projects", index, "endDate")}>
                                    Clear
                                </Button>
                            </div>


                            <label>Skills (Comma-separated)</label>
                            <input
                                type="text"
                                value={project.skills.join(", ")}
                                onChange={(e) => handleProjectChange(index, "skills", e.target.value.split(", "))}
                                placeholder="Skills (comma separated)"
                                className="w-full mb-2"
                            />

                            <label>Image Links (Comma-separated)</label>
                            <input
                                type="text"
                                value={project.images.join(", ")}
                                onChange={(e) => handleProjectChange(index, "images", e.target.value.split(", "))}
                                placeholder="Image Links (comma separated)"
                                className="w-full mb-2"
                            />

                            <label>Project Links (Comma-seperated)</label>
                            <input
                                type="text"
                                value={project.links.join(", ")}
                                onChange={(e) => handleProjectChange(index, "links", e.target.value.split(", "))}
                                placeholder="Project Links (comma separated)"
                                className="w-full mb-2"
                            />

                            <label>Description</label>
                            <textarea
                                value={project.description}
                                onChange={(e) => handleProjectChange(index, "description", e.target.value)}
                                placeholder="Description"
                                className="w-full mb-2"
                            />


                            <Button variant="secondary" onClick={() => removeProject(index)} size="small" type="button">
                                Remove
                            </Button>
                        </div>
                    ))}
                    <div className="mt-[16px]">
                        <Button variant="primary" size="small" onClick={addProject} type="button">
                            Add Project
                        </Button>
                    </div>
                </div>

                <div className="mt-[16px]">
                    <Button variant="primary">
                        Save Changes
                    </Button>
                </div>
            </form>
            <Error error={error} resetError={resetError} />
        </div>
    )
}
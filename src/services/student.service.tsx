"use client";

import { CoverLetter, JobReference, StudentData, StudentPage } from "@/models/student";
import { useStudentRepo } from "@/repositories/student.respository";
import { StudentApplication } from "@/models/application";
import { useUserDataContext } from "@/serviceProviders/userDataContext";
import { handleError, ServiceHandlers } from "./handlers";
import { useJobContext } from "@/serviceProviders/jobsContext";

export const useStudentDataService = () => {
    const {
        getStudentByIdRepo,
        getStudentPageRepo,
        createStudentRepo,
        updateStudentDataRepo,
        updatePageRepo,
        getStudentApplicationForJobRepo,
        createStudentApplicationRepo,
        updateStudentApplicationRepo,
        requestApplicationReviewRepo,
        requestEndorsementRepo,
        addCoverLetterRepo
    } = useStudentRepo();
    const { setStudentData: stuDataSetter, studentData } = useUserDataContext();
    const { jobs, setJobs } = useJobContext();

    const getStudentService = async (id: string, { setError, setLoading }: ServiceHandlers) => {
        try {
            setLoading?.(true);
            return await getStudentByIdRepo(id);
        } catch (e) {
            handleError(e, setError);
            return undefined;
        } finally {
            setLoading?.(false);
        }
    };

    const getStudentPageService = async (id: string, { setError, setLoading }: ServiceHandlers) => {
        try {
            setLoading?.(true);
            return await getStudentPageRepo(id);
        } catch (e) {
            handleError(e, setError)
            return undefined;
        } finally {
            setLoading?.(false);
        }
    }


    const createStudentService = async (student: StudentData, { setError, setLoading }: ServiceHandlers) => {
        try {
            setLoading?.(true);
            const response = await createStudentRepo(student);
            stuDataSetter(response);
            return response;
        } catch (e) {
            handleError(e, setError)
            return undefined;
        } finally {
            setLoading?.(false);
        }
    }


    const setStudentDataService = async (student: StudentData, { setError, setLoading }: ServiceHandlers) => {
        try {
            setLoading?.(true);
            const response = await updateStudentDataRepo(student);
            stuDataSetter(response);
            return response;
        } catch (e) {
            handleError(e, setError)
            return undefined;
        } finally {
            setLoading?.(false);
        }
    }

    const setStudentPageService = async (id: string, data: StudentPage, { setError, setLoading }: ServiceHandlers) => {
        try {
            setLoading?.(true);
            const response = await updatePageRepo(id, data);
            stuDataSetter(prev => {
                if (prev) {
                    return { ...prev, page: response }
                }
                return prev;
            });
            return response;
        } catch (e) {
            handleError(e, setError);
            return undefined;
        } finally {
            setLoading?.(false);
        }
    }

    const getApplicationService = async (studentId: string, jobId: string, { setError, setLoading }: ServiceHandlers) => {
        try {
            setLoading?.(true);
            return await getStudentApplicationForJobRepo(studentId, jobId);
        } catch (e) {
            handleError(e, setError);
            return undefined;
        } finally {
            setLoading?.(false);
        }
    }

    const makeCoverLetterService = async (studentId: string, coverLetter: CoverLetter, { setError, setLoading }: ServiceHandlers) => {
        try {
            setLoading?.(true);
            const success = await addCoverLetterRepo(studentId, coverLetter);
            if (success) {
                stuDataSetter(prev => {
                    const data = { ...prev!, coverLetters: [...prev!.coverLetters, coverLetter] };
                    return data;
                });
            }
            return success;
        } catch (e) {
            handleError(e, setError);
            return false;
        } finally {
            setLoading?.(false);
        }
    }

    const makeStudentApplicationService = async (application: StudentApplication, { setError, setLoading }: ServiceHandlers) => {
        try {
            setLoading?.(true);
            const response = await createStudentApplicationRepo(application);
            if (studentData) {
                const newReferences: JobReference[] = [...studentData.jobReferences, { id: application.job, status: application.status }];
                stuDataSetter(prev => {
                    if (prev) {
                        return { ...prev, jobReferences: newReferences };
                    }
                    return prev;
                });
                const jobIndex = jobs.findIndex(j => j.id === application.job);
                const newApplications: string[] = [...jobs[jobIndex].applications, application.id];
                if (jobIndex > -1) {
                    setJobs(prev => {
                        prev[jobIndex].applications = newApplications;
                        return [...prev];
                    })
                }
            };
            return response;
        } catch (e) {
            handleError(e, setError);
            return undefined;
        } finally {
            setLoading?.(false);
        }
    }

    const setStudentApplication = async (
        application: StudentApplication,
        { setError,
            setLoading }: ServiceHandlers
    ) => {
        try {
            setLoading?.(true);
            const response = await updateStudentApplicationRepo(application);
            if (studentData) {
                const referenceIndex = studentData.jobReferences.findIndex(j => j.id === application.job);
                if (referenceIndex > -1) {
                    stuDataSetter(prev => {
                        if (prev) {
                            prev.jobReferences[referenceIndex].status = application.status;
                            return { ...prev };
                        }
                        return prev;
                    })
                }
            }
            return response;
        } catch (e) {
            handleError(e, setError);
            return undefined;
        } finally {
            setLoading?.(false);
        }
    }

    const requestReviewApplicationService = async (
        applicationId: string,
        counselorId: string,
        { setError, setLoading }: ServiceHandlers,
    ) => {
        try {
            setLoading?.(true);
            return await requestApplicationReviewRepo(applicationId, counselorId);
        } catch (e) {
            handleError(e, setError)
            return undefined;
        } finally {
            setLoading?.(false);
        }
    }

    const requestCounselorEndorsementService = async (
        studentId: string,
        counselorId: string,
        { setError, setLoading }: ServiceHandlers,
    ) => {
        try {
            setLoading?.(true);
            return await requestEndorsementRepo(studentId, counselorId);
        } catch (e) {
            handleError(e, setError)
            return undefined;
        } finally {
            setLoading?.(false);
        }
    }


    return {
        getStudentService,
        getStudentPageService,
        makeStudentApplicationService,
        getApplicationService,
        setStudentPageService,
        setStudentDataService,
        createStudentService,
        setStudentApplication,
        requestReviewApplicationService,
        requestCounselorEndorsementService,
        makeCoverLetterService
    };

}
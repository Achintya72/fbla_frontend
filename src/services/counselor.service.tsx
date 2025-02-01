"use client";
import { Comment } from "@/models/application";
import useCounselorRepo from "@/repositories/counselor.respository";
import { handleError, ServiceHandlers } from "./handlers";
import { useUserDataContext } from "@/serviceProviders/userDataContext";
import { useJobContext } from "@/serviceProviders/jobsContext";


export default function useCounselorServices() {
    const {
        getCounselorRepo,
        endorseStudentRepo,
        denyEndorsementRepo,
        getUnVerifiedRecruitersRepo,
        verifyRecruiterRepo,
        getUnverifiedPostingsRepo,
        approvePostingRepo,
        deletePostingRepo,
        counselorCommentOnApplicationRepo,
        getApplicationsForReviewRepo,
        completeApplicationReviewRepo
    } = useCounselorRepo();

    const {
        jobs, setJobs
    } = useJobContext();

    const { setCounselorData } = useUserDataContext();

    const getCounselorService = async (id: string, { setLoading, setError }: ServiceHandlers) => {
        try {
            setLoading?.(true);
            const response = await getCounselorRepo(id);
            return response;
        } catch (e) {
            handleError(e, setError);
            return undefined;
        } finally {
            setLoading?.(false);
        }
    }

    const endorseStudentService = async (studentId: string, { setLoading, setError }: ServiceHandlers) => {
        try {
            setLoading?.(true);
            await endorseStudentRepo(studentId);
            setCounselorData(prev => {
                if (prev) {
                    const newRequests = prev.endorsementRequests.filter(stu => stu !== studentId);
                    return { ...prev, endorsementRequests: newRequests };
                }
                return prev;
            })
        } catch (e) {
            handleError(e, setError);
            return;
        } finally {
            setLoading?.(false);
        }
    }

    const denyEndorsementService = async (studentId: string, { setLoading, setError }: ServiceHandlers) => {
        try {
            setLoading?.(true);
            await denyEndorsementRepo(studentId);
            setCounselorData(prev => {
                if (prev) {
                    const newRequests = prev.endorsementRequests.filter(stu => stu !== studentId);
                    return { ...prev, endorsementRequests: newRequests };
                }
                return prev;
            });
        } catch (e) {
            handleError(e, setError);
            return;
        } finally {
            setLoading?.(false);
        }
    }

    const getUnVerifiedRecruitersService = async ({ setLoading, setError }: ServiceHandlers) => {
        try {
            setLoading?.(true);
            const response = await getUnVerifiedRecruitersRepo();
            return response;
        } catch (e) {
            handleError(e, setError);
            return [];
        } finally {
            setLoading?.(false);
        }
    }

    const verifyRecruiterService = async (id: string, { setLoading, setError }: ServiceHandlers) => {
        try {
            setLoading?.(true);
            return await verifyRecruiterRepo(id);
        } catch (e) {
            handleError(e, setError);
            return [];
        } finally {
            setLoading?.(false)
        }
    }

    const getUnverifiedPostingsService = async ({ setLoading, setError }: ServiceHandlers) => {
        try {
            setLoading?.(true);
            return await getUnverifiedPostingsRepo();
        } catch (e) {
            handleError(e, setError);
            return [];
        } finally {
            setLoading?.(false);
        }
    }

    const approvePostingService = async (id: string, { setLoading, setError }: ServiceHandlers) => {
        try {
            setLoading?.(true);
            const j = jobs.find((val) => val.id == id);
            const temp = await approvePostingRepo(id);
            if(j) {
                const newJ = {...j, published: true};
                setJobs(prev => [...prev.filter((val) => val.id != id), newJ]);
            }
            return temp;
        } catch (e) {
            handleError(e, setError);
            return [];
        } finally {
            setLoading?.(false);
        }
    }

    const deletePostingService = async (id: string, { setLoading, setError }: ServiceHandlers) => {
        try {
            setLoading?.(true);
            return await deletePostingRepo(id);
        } catch (e) {
            handleError(e, setError);
        } finally {
            setLoading?.(false);
        }
    }

    const counselorCommentService = async (id: string, comment: Comment, { setLoading, setError }: ServiceHandlers) => {
        try {
            setLoading?.(true);
            return await counselorCommentOnApplicationRepo(id, comment);
        } catch (e) {
            handleError(e, setError);
        } finally {
            setLoading?.(false);
        }
    }

    const getApplicationsForReviewService = async (id: string, { setLoading, setError}: ServiceHandlers) => {
        try {
            setLoading?.(true);
            return await getApplicationsForReviewRepo(id);
        } catch(e) {
            handleError(e, setError);
            return [];
        } finally {
            setLoading?.(false);
        }
    }

    const completeApplicationReviewService = async (id: string, { setLoading, setError}: ServiceHandlers) => {
        try {
            setLoading?.(true);
            const response =  await completeApplicationReviewRepo(id);
            if(response) {}
            setCounselorData(prev => {
                if(prev) {
                    return {...prev, applicationReviews: response.map(app => app.id)};
                }
                return prev;
            })
            return response;
        } catch(e) {
            handleError(e, setError);
            return [];
        } finally {
            setLoading?.(false);
        }
    }



    return {
        getCounselorService,
        endorseStudentService,
        denyEndorsementService,
        getUnVerifiedRecruitersService,
        verifyRecruiterService,
        getUnverifiedPostingsService,
        approvePostingService,
        deletePostingService,
        counselorCommentService,
        getApplicationsForReviewService,
        completeApplicationReviewService
    }

}
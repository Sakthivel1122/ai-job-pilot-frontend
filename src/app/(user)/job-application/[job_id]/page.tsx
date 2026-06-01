import { getJobApplicationDetailsApi } from "@/app/api/jobApplication/jobApplication";
import { ROUTES } from "@/constants/app-constants";
import JobApplicationPage from "@/pages/jobApplicationPage/jobApplicationPage";
import { TGetJobApplicationDetailsApiResponse, TJobApplicationDetails } from "@/types/apiResponseTypes";
import { AuthWrapper } from "@/wrappers/authWrapper";
import { redirect } from "next/navigation";
import React from "react";

const JobApplication = async ({
  params,
}: {
  params: Promise<{ job_id: string }>;
}) => {
  const { job_id } = await params;
  const payload = {
    id: job_id,
  };
  const getJobApplicationDetailsPromise = (payload: any): Promise<any> => {
    return new Promise(async (resolve, reject) => {
      try {
        const response : TGetJobApplicationDetailsApiResponse = await getJobApplicationDetailsApi(payload, true);
        resolve(response.content);
      } catch (error) {
        reject(error);
      }
    });
  };

  try {
    const jobApplicationDetails: TJobApplicationDetails =
      await getJobApplicationDetailsPromise(payload);
      return (
        <>
        <AuthWrapper pathname="user_pages">
          <JobApplicationPage jobApplicationDetails={jobApplicationDetails} />
        </AuthWrapper>
        </>
      );
  } catch (error) {
    redirect(ROUTES.HOME);
  }
};

export default JobApplication;

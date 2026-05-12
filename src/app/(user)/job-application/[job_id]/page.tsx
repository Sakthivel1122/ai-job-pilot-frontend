import { getJobApplicationDetailsApi } from "@/app/api/jobApplication/jobApplication";
import JobApplicationPage from "@/pages/jobApplicationPage/jobApplicationPage";
import { TGetJobApplicationDetailsApiResponse, TJobApplicationDetails } from "@/types/apiResponseTypes";
import { AuthWrapper } from "@/wrappers/authWrapper";
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

  const jobApplicationDetails: TJobApplicationDetails =
    await getJobApplicationDetailsPromise(payload);
  return (
    <>
    <AuthWrapper pathname="user_pages">
      <JobApplicationPage jobApplicationDetails={jobApplicationDetails} />
    </AuthWrapper>
    </>
  );
};

export default JobApplication;

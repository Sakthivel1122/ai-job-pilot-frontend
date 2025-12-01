import { getJobApplicationDetailsApi } from "@/app/api/jobApplication/jobApplication";
import JobApplicationPage from "@/pages/jobApplicationPage/jobApplicationPage";
import { TJobApplicationDetails } from "@/types/apiResponseTypes";
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
    return new Promise((resolve, reject) => {
      getJobApplicationDetailsApi(
        payload,
        (res) => {
          if (res?.response?.status === 200) {
            resolve(res.content); // return the data
          } else {
            reject(res); // reject on error
          }
        },
        true
      );
    });
  };

  const jobApplicationDetails: TJobApplicationDetails =
    await getJobApplicationDetailsPromise(payload);
  return (
    <>
      <JobApplicationPage jobApplicationDetails={jobApplicationDetails} />
    </>
  );
};

export default JobApplication;

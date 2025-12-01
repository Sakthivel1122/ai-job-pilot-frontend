"use client";
import { TJobApplicationDetails, TResumeData } from "@/types/apiResponseTypes";
import React, { useEffect, useState } from "react";
import styles from "./jobApplicationPage.module.scss";
import { FiArrowLeft } from "react-icons/fi";
import ApplicationDetails from "@/containers/applicationDetails/applicationDetails";
import { useRouter } from "next/navigation";
import DisplayTextAreaContent from "@/components/displayTextAreaContent/displayTextAreaContent";
import Button from "@/components/button/button";
import { IoDocumentTextOutline } from "react-icons/io5";
import UploadNewResume from "@/containers/uploadNewResume/uploadNewResume";
import { getResumeListApi, uploadResumeApi } from "@/app/api/resume/resume";
import { ALERT_TYPE, alertMessage } from "@/utils/tosterAlert";
import ResumeCard from "@/containers/resumeCard/resumeCard";

interface IJobApplicationPageProps {
  jobApplicationDetails: TJobApplicationDetails;
}

const JobApplicationPage: React.FC<IJobApplicationPageProps> = ({
  jobApplicationDetails,
}) => {
  const [resumeList, setResumeList] = useState<TResumeData[] | [] | null>(
    jobApplicationDetails.resumes ? jobApplicationDetails.resumes : []
  );
  const [enableUploadResume, setEnableUploadResume] = useState(false);
  const [isUploadResumeBtnLoading, setIsUploadResumeBtnLoading] =
    useState(false);

  const router = useRouter();

  const handleAddResumeBtnClick = () => {
    setEnableUploadResume(!enableUploadResume);
  };

  const handleOnUploadResumeBtnClick = (
    resumeName: string,
    resumePdfFile: File | null
  ) => {
    const formData = new FormData();
    if (resumePdfFile) {
      formData.append("resume", resumePdfFile);
    }
    formData.append("resume_name", resumeName);
    formData.append("job_application_id", jobApplicationDetails?.id);
    setIsUploadResumeBtnLoading(true);
    uploadResumeApi(formData, (res) => {
      setIsUploadResumeBtnLoading(false);
      if (res?.response?.status === 200) {
        setEnableUploadResume(false);
        updateResumeList();
        alertMessage(res?.response?.message, ALERT_TYPE.SUCCESS);
      } else {
        alertMessage(res?.response?.message, ALERT_TYPE.ERROR);
      }
    });
  };

  const updateResumeList = () => {
    const params = {
      job_application_id: jobApplicationDetails.id,
    };
    getResumeListApi(params, (res) => {
      if (res?.response?.status === 200) {
        setResumeList(res.content);
      }
    });
  };

  useEffect(() => {}, []);

  return (
    <div className={styles.JobApplicationPage}>
      <div className={styles.JobApplicationPage_header}>
        <div
          className={styles.JobApplicationPage_back_arrow_wrapper}
          onClick={() => {
            router.back();
          }}
        >
          <FiArrowLeft className={styles.JobApplicationPage_back_arrow} />
        </div>
        <div className={styles.JobApplicationPage_header_text_wrapper}>
          <h1 className={styles.JobApplicationPage_header_title1}>
            {jobApplicationDetails?.role}
          </h1>
          <p className={styles.JobApplicationPage_header_title2}>
            {jobApplicationDetails?.company}
          </p>
        </div>
      </div>
      <ApplicationDetails data={jobApplicationDetails} />
      <div className={styles.JobApplicationPage_job_description_wrapper}>
        <h2 className={styles.JobApplicationPage_title}>Job Description</h2>
        <div className={styles.JobApplicationPage_job_description_text}>
          <DisplayTextAreaContent
            text={jobApplicationDetails?.job_description}
          />
          {/* <br />
          <ReactMarkdown>
            {jobApplicationDetails?.job_description}
          </ReactMarkdown> */}
        </div>
        {/* <p>{jobApplicationDetails?.job_description}</p> */}
      </div>
      <div className={styles.JobApplicationPage_resume_management_header}>
        <h2 className={`${styles.JobApplicationPage_title}`}>
          Resume Management
        </h2>
        <Button
          textCustomClass={
            styles.JobApplicationPage_resume_management_upload_btn_text
          }
          content={enableUploadResume ? "Cancle Upload" : "+ Upload New Resume"}
          variant="secondary"
          onClick={handleAddResumeBtnClick}
          disabled={isUploadResumeBtnLoading}
        />
      </div>
      {enableUploadResume && (
        <UploadNewResume
          customContainerClass={
            styles.JobApplicationPage_upload_new_resume_container
          }
          onUploadClick={handleOnUploadResumeBtnClick}
          isUploadBtnLoading={isUploadResumeBtnLoading}
        />
      )}
      <div className={styles.JobApplicationPage_uploaded_resumes_container}>
        <div
          className={styles.JobApplicationPage_uploaded_resumes_title_wrapper}
        >
          <IoDocumentTextOutline
            className={styles.JobApplicationPage_uploaded_resumes_title}
          />
          <h3 className={styles.JobApplicationPage_uploaded_resumes_title}>
            Uploaded Resumes
          </h3>
        </div>
        {resumeList && resumeList.length > 0 ? (
          <div
            className={styles.JobApplicationPage_uploaded_resumes_card_wrapper}
          >
            {resumeList.map((data) => (
              <ResumeCard key={data._id} data={data} />
            ))}
          </div>
        ) : (
          <div className={styles.JobApplicationPage_no_resumes_container}>
            <IoDocumentTextOutline
              className={styles.JobApplicationPage_no_resumes_icon}
            />
            <p className={styles.JobApplicationPage_no_resumes_text1}>
              No resumes uploaded for this job application yet.
            </p>
            <p className={styles.JobApplicationPage_no_resumes_text2}>
              Click "Upload New Resume" above to get started.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobApplicationPage;

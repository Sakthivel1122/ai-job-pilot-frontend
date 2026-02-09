"use client";
import React, { useRef, useState } from "react";
import styles from "./resumeAnalyzerPage.module.scss";
import UploadNewResume from "@/containers/uploadNewResume/uploadNewResume";
import { ALERT_TYPE, alertMessage } from "@/utils/tosterAlert";
import { getResumeAnalysisApi } from "@/app/api/resume/resume";
import { TResumeData } from "@/types/apiResponseTypes";
import ResumeCard from "@/containers/resumeCard/resumeCard";

const ResumeAnalyzerPage = () => {
  const [isUploadResumeBtnLoading, setIsUploadResumeBtnLoading] =
    useState(false);
  const [resumeAnalysisData, setResumeAnalysisData] = useState<TResumeData>({
    _id: "",
    created_at: "",
    updated_at: "",
    deleted_at: "",
    user: "",
    name: "",
    job_application: "",
    file_url: "",
    original_text: "",
    ai_summary: "",
    ai_score: 0,
    ai_feedback: "",
  });

  const targetRef = useRef<HTMLDivElement | null>(null);

  const scrollToTargetWithOffset = () => {
    if (!targetRef.current) return;

    const offset = 340;
    const elementTop = targetRef.current.getBoundingClientRect().top;
    const scrollTop = window.pageYOffset;

    const targetPosition = elementTop + scrollTop - offset;

    window.scrollTo({
      top: targetPosition,
      behavior: "smooth",
    });
  };

  const handleOnUploadResumeBtnClick = (
    resumeName: string,
    resumePdfFile?: File | null,
    resumeText?: string,
    jobDescription?: string,
  ) => {
    const formData = new FormData();
    if (resumePdfFile) {
      formData.append("resume", resumePdfFile);
      formData.append("resume_content_type", "file");
    } else if (resumeText) {
      formData.append("resume_text_content", resumeText);
      formData.append("resume_content_type", "text");
    } else {
      alertMessage(
        "Please select resume file or enter resume text",
        ALERT_TYPE.WARNING,
      );
      return;
    }

    if (jobDescription) {
      formData.append("job_description", jobDescription);
    }
    setIsUploadResumeBtnLoading(true);
    getResumeAnalysisApi(formData, (res) => {
      setIsUploadResumeBtnLoading(false);
      if (res.response.status === 200) {
        const content = res?.content;
        if (content) {
          setResumeAnalysisData((prevState) => ({
            ...prevState,
            ai_feedback: content?.feedback,
            ai_score: content?.score,
            ai_summary: content?.summary,
          }));
        }
        alertMessage(res?.response?.message, ALERT_TYPE.SUCCESS);
        setTimeout(() => {
          scrollToTargetWithOffset();
        }, 500);
      } else {
        alertMessage(res?.response?.message, ALERT_TYPE.ERROR);
      }
    });
  };
  return (
    <div className={styles.ResumeAnalyzerPage}>
      <h1 className={styles.ResumeAnalyzerPage_title}>AI Resume Analyzer</h1>
      <p className={styles.ResumeAnalyzerPage_description}>
        Get personalized feedback to optimize your resume for specific job
        opportunities
      </p>
      <UploadNewResume
        title="Upload New Resume"
        customContainerClass={
          styles.JobApplicationPage_upload_new_resume_container
        }
        onUploadClick={handleOnUploadResumeBtnClick}
        isUploadBtnLoading={isUploadResumeBtnLoading}
        showResumeNameField={false}
        showJobDescriptionField={true}
        resumeTextAreaRows={8}
        submitBtnText="Analyze Match"
      />

      <div ref={targetRef}>
        {resumeAnalysisData.ai_summary !== "" &&
          resumeAnalysisData.ai_feedback !== "" && (
            <>
              <h1 className={styles.ResumeAnalyzerPage_title2}>
                Analysis Result
              </h1>
              <ResumeCard
                customContainerClass={
                  styles.ResumeAnalyzerPage_resume_card_wrapper
                }
                showResumeName={false}
                showUploadTime={false}
                showViewFeedbackBtn={false}
                data={resumeAnalysisData}
              />
            </>
          )}
      </div>
    </div>
  );
};

export default ResumeAnalyzerPage;

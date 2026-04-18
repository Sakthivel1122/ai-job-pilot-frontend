import ResumeAnalyzerPage from "@/pages/resumeAnalyzerPage/resumeAnalyzerPage";
import { AuthWrapper } from "@/wrappers/authWrapper";
import React from "react";

const ResumeAnalyzer = () => {
  return (
    <>
      <AuthWrapper pathname="user_pages">
        <ResumeAnalyzerPage />
      </AuthWrapper>
    </>
  );
};

export default ResumeAnalyzer;

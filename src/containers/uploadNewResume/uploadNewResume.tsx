"use client";
import Input from "@/components/input/input";
import React, { useRef, useState } from "react";
import styles from "./uploadNewResume.module.scss";
import Button from "@/components/button/button";
import { FiUpload } from "react-icons/fi";
import { IoDocumentTextOutline } from "react-icons/io5";
import { uploadResumeApi } from "@/app/api/resume/resume";
import { ALERT_TYPE, alertMessage } from "@/utils/tosterAlert";

interface IUploadNewResumeProps {
  customContainerClass?: string;
  isUploadBtnLoading?: boolean;
  onUploadClick: (resumeName: string, resumePdfFile: File | null) => void;
}

const UploadNewResume: React.FC<IUploadNewResumeProps> = ({
  customContainerClass,
  onUploadClick,
  isUploadBtnLoading = false,
}) => {
  const [fileName, setFileName] = useState<string>("");
  const [resumeName, setResumeName] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [resumePdfFile, setResumePdfFile] = useState<File | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const MAX_FILE_SIZE = 10 * 1024 * 1024;

  const openPicker = () => fileInputRef.current?.click();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (file.type !== "application/pdf") {
      setError("Only PDF files are allowed.");
      setFileName("");
      setResumePdfFile(null);
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setError("File must be under 10MB.");
      setFileName("");
      setResumePdfFile(null);
      return;
    }

    setError("");
    setFileName(file.name);
    setResumePdfFile(file);
  };

  const handleUploadResumeBtnClick = () => {
    onUploadClick(resumeName, resumePdfFile);
  };

  return (
    <div className={`${styles.UploadNewResume} ${customContainerClass}`}>
      <div className={styles.UploadNewResume_title_wrapper}>
        <h3 className={styles.UploadNewResume_title}>Upload New Resume</h3>
      </div>
      <Input
        label="Resume Name *"
        placeholder="eg., Frontend Developer Resume v2.1"
        value={resumeName}
        onChange={(e) => {
          setResumeName(e.target.value);
        }}
      />
      <div className={styles.UploadNewResume_resume_file_input_container}>
        <p className={styles.UploadNewResume_resume_file_input_label}>
          Resume File (PDF)*
        </p>
        <div className={styles.UploadNewResume_resume_file_input_wrapper}>
          <input
            type="file"
            accept="application/pdf"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
          {fileName ? (
            <div
              className={styles.UploadNewResume_resume_file_input_name_wrapper}
            >
              <IoDocumentTextOutline
                className={styles.UploadNewResume_resume_file_input_file_icon}
              />
              <p className={styles.UploadNewResume_resume_file_input_file_name}>
                {fileName}
              </p>
            </div>
          ) : (
            <>
              <FiUpload
                className={styles.UploadNewResume_resume_file_input_icon}
              />
              <p className={styles.UploadNewResume_resume_file_input_text1}>
                Click to upload or drag and drop
              </p>
              <p className={styles.UploadNewResume_resume_file_input_text2}>
                PDF format only, max 10MB
              </p>
            </>
          )}
          <Button
            content={fileName ? "Change File" : "Choose PDF File"}
            variant="secondary"
            onClick={openPicker}
            textCustomClass={
              styles.UploadNewResume_resume_file_input_select_file_btn_text
            }
            disabled={isUploadBtnLoading}
          />
        </div>
        <Button
          content={"Upload Resume"}
          onClick={handleUploadResumeBtnClick}
          className={styles.UploadNewResume_resume_file_input_upload_btn}
          isLoading={isUploadBtnLoading}
          customLoader={
            <p
              className={
                styles.UploadNewResume_resume_file_input_upload_btn_loader
              }
            >
              Uploading...
            </p>
          }
        />
      </div>
    </div>
  );
};

export default UploadNewResume;

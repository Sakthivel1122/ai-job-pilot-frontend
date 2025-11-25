"use client";
import React, { useEffect, useState } from "react";
import styles from "./jobApplicationFormPopup.module.scss";
import Popup from "@/components/popup/popup";
import Input from "@/components/input/input";
import Dropdown from "@/components/dropdown/dropdown";
import { TDropdownOptionData } from "@/types/dropdown";
import { IoChevronDown } from "react-icons/io5";
import Button from "@/components/button/button";
import { createUpdateJobApplicationApi } from "@/app/api/dashboard/dashboard";
import { ALERT_TYPE, alertMessage } from "@/utils/tosterAlert";
import { TJobApplicationData } from "@/types/apiResponseTypes";

const applicationStatusOptionList: TDropdownOptionData[] = [
  {
    id: 1,
    label: "Applied",
    data: "applied",
  },
  {
    id: 2,
    label: "Interview Scheduled",
    data: "interview_scheduled",
  },
  {
    id: 3,
    label: "Selected",
    data: "selected",
  },
  {
    id: 4,
    label: "Rejected",
    data: "rejected",
  },
  {
    id: 5,
    label: "Offer Received",
    data: "offer_received",
  },
  {
    id: 6,
    label: "Withdrawn",
    data: "withdrawn",
  },
];

interface IJobApplicationFormPopupProps {
  isOpen: boolean;
  applicationData?: TJobApplicationData,
  onClose: () => void;
  onSuccess?: () => void;
}

const JobApplicationFormPopup: React.FC<IJobApplicationFormPopupProps> = ({
  isOpen,
  applicationData,
  onClose,
  onSuccess,
}) => {
  type TformFieldError = {
    companyName?: string;
    jobTitle?: string;
    applicationStatus?: string;
    jobDescription?: string;
  };
  type TsalaryData = {
    min: string | number,
    max: string | number,
  }

  const [companyName, setCompanyName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [applicationStatus, setApplicationStatus] =
    useState<TDropdownOptionData | undefined>(applicationStatusOptionList[0]);
  const [jobDescription, setJobDescription] = useState("");

  const [salary, setSalary] = useState<TsalaryData>({ min: "", max: "" });
  const [location, setLocation] = useState("");
  const [applicationURL, setApplicationURL] = useState("");
  const [applicationNotes, setApplicationNotes] = useState("");
  const [formFieldError, setFormFieldError] = useState<TformFieldError>({
    companyName: "",
    jobTitle: "",
    applicationStatus: "",
    jobDescription: "",
  });

  const onSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    let payload: any = {
      company: companyName,
      role: jobTitle,
      status: applicationStatus?.data,
      job_description: jobDescription,
    };

    let errorMsg: TformFieldError = {
      companyName: "",
      jobTitle: "",
      applicationStatus: "",
      jobDescription: "",
    };
    if (companyName === "") {
      errorMsg.companyName = "Please enter company name";
    }
    if (jobTitle === "") {
      errorMsg.jobTitle = "Please enter job title";
    }
    if (!applicationStatus?.data) {
      errorMsg.applicationStatus = "Please select an application status";
    }
    if (jobDescription === "") {
      errorMsg.jobDescription = "Please enter job description";
    }

    if (
      errorMsg?.companyName !== "" ||
      errorMsg?.jobTitle !== "" ||
      errorMsg?.applicationStatus !== "" ||
      errorMsg?.jobDescription !== ""
    ) {
      setFormFieldError(errorMsg);
      return;
    }

    if (salary?.min) {
      payload.salary_min = salary.min;
    }

    if (salary?.max) {
      payload.salary_max = salary.max;
    }

    if (location) {
      payload.location = location;
    }

    if (applicationURL) {
      payload.application_url = applicationURL;
    }

    if (applicationNotes) {
      payload.notes = applicationNotes;
    }

    if (applicationData?._id) {
      payload.id = applicationData?._id;
    }

    createUpdateJobApplicationApi(payload, (res) => {
      if (res?.response?.status === 200) {
        onSuccess?.();
        alertMessage(res?.response?.message, ALERT_TYPE.SUCCESS);
      } else {
        alertMessage(res?.response?.message, ALERT_TYPE.ERROR);
      }
    });
  };

  const onCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onClose();
  };

  useEffect(() => {
    if (isOpen) {
      setCompanyName(applicationData?.company ? applicationData?.company : "");
      setJobTitle(applicationData?.role ? applicationData.role : "");
      if (applicationData?.status) {
        const status = applicationStatusOptionList.find((data) => data.data === applicationData?.status);
        setApplicationStatus(status);
      } else {
        setApplicationStatus(applicationStatusOptionList[0]);
      }
      setJobDescription(applicationData?.job_description ? applicationData.job_description : "");
      setSalary({
        min: applicationData?.salary_min ? applicationData?.salary_min : "",
        max: applicationData?.salary_max ? applicationData?.salary_max : ""
      });
      setLocation(applicationData?.location ? applicationData.location : "");
      setApplicationURL(applicationData?.application_url ? applicationData.application_url : "");
      setApplicationNotes(applicationData?.notes ? applicationData.notes : "");
    }
  }, [isOpen, applicationData]);

  // const handleResetForm = () => {
  //   setCompanyName("");
  //   setJobTitle("");
  //   setApplicationStatus(applicationStatusOptionList[0]);
  //   setJobDescription("");
  //   setSalary({
  //     min: "",
  //     max: ""
  //   });
  //   setLocation("");
  //   setApplicationURL("");
  //   setApplicationNotes("");
  // }

  return (
    <Popup
      isOpen={isOpen}
      onClose={onClose}
      customClass={styles.JobApplicationFormPopup}
    >
      {/* <p className={styles.JobApplicationFormPopup_title}>
        Add New Job Application
      </p> */}
      <p className={styles.JobApplicationFormPopup_title}>Add</p>
      <form className={styles.JobApplicationFormPopup_form}>
        <Input
          label="Company Name *"
          value={companyName}
          placeholder="e.g., Google, Amazon, Microsoft, Startup etc"
          onChange={(e) => {
            setCompanyName(e.target.value);
            setFormFieldError((prevState) => ({...prevState, companyName: ""}));
          }}
          required
        />
        {formFieldError.companyName && (
          <p className={styles.JobApplicationFormPopup_error_text}>
            {formFieldError?.companyName}
          </p>
        )}
        <Input
          customContainerClass={styles.JobApplicationFormPopup_input_field}
          label="Job Title *"
          value={jobTitle}
          placeholder="e.g., Senior Software Engineer"
          onChange={(e) => {
            setJobTitle(e.target.value);
            setFormFieldError((prevState) => ({...prevState, jobTitle: ""}));
          }}
          required
        />
        {formFieldError?.jobTitle && (
          <p className={styles.JobApplicationFormPopup_error_text}>
            {formFieldError?.jobTitle}
          </p>
        )}
        <div className={styles.JobApplicationFormPopup_dropdown_wrapper}>
          <label className={styles.JobApplicationFormPopup_dropdown_label}>
            Application Status *
          </label>
          <Dropdown
            buttonLabel={applicationStatus?.label ? applicationStatus?.label : ""}
            buttonClass={styles.JobApplicationFormPopup_dropdown}
            options={applicationStatusOptionList}
            onSelect={(value) => {
              setApplicationStatus(value);
              setFormFieldError((prevState) => ({...prevState, applicationStatus: ""}));
            }}
          />
          {formFieldError?.applicationStatus && (
            <p className={styles.JobApplicationFormPopup_error_text}>
              {formFieldError?.applicationStatus}
            </p>
          )}
        </div>
        <div className={styles.JobApplicationFormPopup_salary_input_wrapper}>
          <Input
            label="Salary Range (in LPA)"
            value={salary.min}
            type="number"
            placeholder="Min Salary"
            onChange={(e) =>
              setSalary((prevState) => ({ ...prevState, min: e.target.value }))
            }
          />
          <Input
            value={salary.max}
            type="number"
            placeholder="Max Salary"
            onChange={(e) =>
              setSalary((prevState) => ({ ...prevState, max: e.target.value }))
            }
          />
        </div>
        <Input
          customContainerClass={styles.JobApplicationFormPopup_input_field}
          label="Location"
          value={location}
          placeholder="Location"
          onChange={(e) => setLocation(e.target.value)}
        />
        <Input
          customContainerClass={styles.JobApplicationFormPopup_input_field}
          label="Application URL"
          value={applicationURL}
          placeholder="Link to job posting or application portal"
          onChange={(e) => setApplicationURL(e.target.value)}
        />
        <Input
          customContainerClass={styles.JobApplicationFormPopup_input_field}
          label="Job Description *"
          value={jobDescription}
          type="textarea"
          placeholder="Paste the job description here for AI analysis..."
          onChange={(e) => {
            setJobDescription(e.target.value);
            setFormFieldError((prevState) => ({...prevState, jobDescription: ""}));
          }}
          required
        />
        {formFieldError?.jobDescription && (
          <p className={styles.JobApplicationFormPopup_error_text}>
            {formFieldError?.jobDescription}
          </p>
        )}
        <Input
          customContainerClass={styles.JobApplicationFormPopup_input_field}
          label="Notes"
          value={applicationNotes}
          type="textarea"
          placeholder="Add any details about this application, interview details, contacts, etc."
          onChange={(e) => setApplicationNotes(e.target.value)}
        />
        <div className={styles.JobApplicationFormPopup_bottom_btn_wrapper}>
          <Button content="Cancel" variant="secondary" onClick={onCancel} />
          <Button content="Add Application" type="submit" onClick={onSubmit} />
        </div>
      </form>
    </Popup>
  );
};

export default JobApplicationFormPopup;

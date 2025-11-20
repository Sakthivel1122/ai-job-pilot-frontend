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
  onClose: () => void;
  onSuccess?: () => void;
}

const JobApplicationFormPopup: React.FC<IJobApplicationFormPopupProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [companyName, setCompanyName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [applicationStatus, setApplicationStatus] =
    useState<TDropdownOptionData>(applicationStatusOptionList[0]);
  const [jobDescription, setJobDescription] = useState("");

  const [salary, setSalary] = useState({ min: "", max: "" });
  const [location, setLocation] = useState("");
  const [applicationURL, setApplicationURL] = useState("");
  const [applicationNotes, setApplicationNotes] = useState("");

  const onSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    let payload: any = {
      company: companyName,
      role: jobTitle,
      status: applicationStatus?.data,
      job_description: jobDescription,
    };

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
    
  }, []);

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
          onChange={(e) => setCompanyName(e.target.value)}
          required
        />
        <Input
          label="Job Title *"
          value={jobTitle}
          placeholder="e.g., Senior Software Engineer"
          onChange={(e) => setJobTitle(e.target.value)}
          required
        />
        <div className={styles.JobApplicationFormPopup_dropdown_wrapper}>
          <label className={styles.JobApplicationFormPopup_dropdown_label}>
            Application Status *
          </label>
          <Dropdown
            buttonLabel={applicationStatus.label}
            buttonClass={styles.JobApplicationFormPopup_dropdown}
            options={applicationStatusOptionList}
            onSelect={(value) => setApplicationStatus(value)}
          />
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
          label="Location"
          value={location}
          placeholder="Location"
          onChange={(e) => setLocation(e.target.value)}
        />
        <Input
          label="Application URL"
          value={applicationURL}
          placeholder="Link to job posting or application portal"
          onChange={(e) => setApplicationURL(e.target.value)}
        />
        <Input
          label="Job Description *"
          value={jobDescription}
          type="textarea"
          placeholder="Paste the job description here for AI analysis..."
          onChange={(e) => setJobDescription(e.target.value)}
          required
        />
        <Input
          label="Notes"
          value={applicationNotes}
          type="textarea"
          placeholder="Add any details about this application, interview details, contacts, etc."
          onChange={(e) => setApplicationNotes(e.target.value)}
        />
        <div className={styles.JobApplicationFormPopup_bottom_btn_wrapper}>
          <Button content="Cancel" variant="secondary" onClick={onCancel} />
          <Button content="Add Application" type="submit" onClick={onSubmit}/>
        </div>
      </form>
    </Popup>
  );
};

export default JobApplicationFormPopup;

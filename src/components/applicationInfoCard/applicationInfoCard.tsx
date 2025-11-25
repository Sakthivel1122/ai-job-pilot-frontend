"use client";
import React, { useMemo } from "react";
import styles from "./applicationInfoCard.module.scss";
import { LuBuilding } from "react-icons/lu";
import StatusTag from "../statusTag/statusTag";
import Dropdown from "../dropdown/dropdown";
import { TDropdownOptionData } from "@/types/dropdown";
import { IoIosMore } from "react-icons/io";
import { TJobApplicationStatus } from "@/types/commonTypes";
import { getApplicationStatusText } from "@/utils/sharedFunctions";

interface IApplicationInfoCardProps {
  jobTitle: string;
  company: string;
  location?: string;
  salaryMin?: string | number | null;
  salaryMax?: string | number | null;
  notes?: string | null;
  applicationStatus: TJobApplicationStatus;
  onEditClick?: () => void;
  onDeleteClick?: () => void;
}

const statusDropdownFilterOptions: TDropdownOptionData[] = [
  {
    id: 1,
    label: "Edit",
    data: "edit",
  },
  {
    id: 2,
    label: "Deleted",
    data: "delete",
  },
];

const ApplicationInfoCard: React.FC<IApplicationInfoCardProps> = ({
  jobTitle,
  company,
  applicationStatus,
  location,
  notes,
  salaryMin,
  salaryMax,
  onEditClick,
  onDeleteClick,
}) => {
  const applicationStatusText = useMemo(() => {
    return getApplicationStatusText(applicationStatus);
  }, [applicationStatus]);
  return (
    <div className={styles.ApplicationInfoCard}>
      <div className={styles.ApplicationInfoCard_content}>
        <div className={styles.ApplicationInfoCard_content_left}>
          <p className={styles.ApplicationInfoCard_title}>{jobTitle}</p>
          <div className={styles.ApplicationInfoCard_company}>
            <LuBuilding className={styles.ApplicationInfoCard_company_icon} />
            <p className={styles.ApplicationInfoCard_company_text}>{company}</p>
          </div>
          <div className={styles.ApplicationInfoCard_other_details}>
            {location && (
              <div className={styles.ApplicationInfoCard_other_details_item}>
                <p
                  className={styles.ApplicationInfoCard_other_details_item_text}
                >
                  {location}
                </p>
              </div>
            )}
            {salaryMin && salaryMax && (
              <div className={styles.ApplicationInfoCard_other_details_item}>
                <p
                  className={styles.ApplicationInfoCard_other_details_item_text}
                >
                  {`${salaryMin}LPA - ${salaryMax}LPA`}
                </p>
              </div>
            )}
            <div className={styles.ApplicationInfoCard_other_details_item}>
              <p className={styles.ApplicationInfoCard_other_details_item_text}>
                2025-11-10
              </p>
            </div>
            <div className={styles.ApplicationInfoCard_other_details_item}>
              <p className={styles.ApplicationInfoCard_other_details_item_text}>
                1 resume(s)
              </p>
            </div>
          </div>
        </div>
        <div className={styles.ApplicationInfoCard_content_right}>
          <StatusTag type={applicationStatus} text={applicationStatusText} />
          <Dropdown
            buttonLabel={""}
            buttonClass={styles.ApplicationInfoCard_more_btn}
            startIcon={
              <IoIosMore
                className={styles.DashboardPage_dropdown_filter_start_icon}
              />
            }
            endIcon={""}
            options={statusDropdownFilterOptions}
            onSelect={(value) => {
              if (value?.data === "edit") {
                onEditClick?.();
              } else if (value?.data === "delete") {
                onDeleteClick?.();
              }
            }}
          />
        </div>
      </div>
      {notes && <p className={styles.ApplicationInfoCard_notes}>{notes}</p>}
    </div>
  );
};

export default ApplicationInfoCard;

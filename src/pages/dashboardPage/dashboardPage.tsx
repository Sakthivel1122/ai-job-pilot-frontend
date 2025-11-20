"use client";
import React, { useEffect, useState } from "react";
import styles from "./dashboardPage.module.scss";
import CountInfoCard from "@/components/countInfoCard/countInfoCard";
import { IoDocumentTextOutline } from "react-icons/io5";
import { LuBuilding } from "react-icons/lu";
import { LuCalendar } from "react-icons/lu";
import { IconType } from "react-icons";
import Button from "@/components/button/button";
import Input from "@/components/input/input";
import { IoIosSearch } from "react-icons/io";
import Dropdown from "@/components/dropdown/dropdown";
import { FiChevronDown } from "react-icons/fi";
import { TDropdownOptionData } from "@/types/dropdown";
import { LuFilter } from "react-icons/lu";
import { FaChevronDown } from "react-icons/fa";
import { IoChevronDown } from "react-icons/io5";
import ApplicationInfoCard from "@/components/applicationInfoCard/applicationInfoCard";
import {
  getDashboardDataApi,
  getJobApplicationsApi,
} from "@/app/api/dashboard/dashboard";
import JobApplicationFormPopup from "@/containers/jobApplicationFormPopup/jobApplicationFormPopup";
import { TJobApplicationData } from "@/types/apiResponseTypes";

type CountKey = "totalApplications" | "applied" | "interviews" | "offers";

type TCountInfoCardData = {
  id: number;
  type?: "default" | "applied" | "interviews" | "offers";
  title: string;
  description: string;
  countKey: CountKey;
  Icon: IconType;
};

const countInfoCardList: TCountInfoCardData[] = [
  {
    id: 1,
    type: "default",
    title: "Total Applications",
    description: "All time tracking",
    countKey: "totalApplications",
    Icon: IoDocumentTextOutline,
  },
  {
    id: 2,
    type: "applied",
    title: "Applied",
    description: "Awaiting response",
    countKey: "applied",
    Icon: LuBuilding,
  },
  {
    id: 3,
    type: "interviews",
    title: "Interviews",
    description: "Scheduled meetings",
    countKey: "interviews",
    Icon: LuCalendar,
  },
  {
    id: 4,
    type: "offers",
    title: "Offers",
    description: "Congratulations! 🎉",
    countKey: "offers",
    Icon: IoDocumentTextOutline,
  },
];

const statusDropdownFilterOptions: TDropdownOptionData[] = [
  {
    id: 1,
    label: "All Status",
    data: "all_Status",
  },
  {
    id: 2,
    label: "Applied",
    data: "applied",
  },
  {
    id: 3,
    label: "Interview Scheduled",
    data: "interview_scheduled",
  },
  {
    id: 4,
    label: "Offer Received",
    data: "offer_received",
  },
  {
    id: 5,
    label: "Rejected",
    data: "rejected",
  },
];

type TGetJobApplicationParams = {
  page: number;
  limit: number;
};

const DashboardPage = () => {
  const [countInfoCardData, setCountInfoCardData] = useState({
    totalApplications: "-",
    applied: "-",
    interviews: "-",
    offers: "-",
  });
  const [searchText, setSearchText] = useState("");
  const [selectedDropDownOption, setDropDown] = useState<TDropdownOptionData>(
    statusDropdownFilterOptions[0]
  );
  const [jobApplicationFormPopup, setJobApplicationFormPopup] = useState(false);
  const [jobApplicationList, setJobApplicationList] = useState<
    TJobApplicationData[]
  >([]);
  const [clientSideRendering, setClientSideRendering] = useState(false);
  const [pageNo, setPageNo] = useState(1);
  const [pageLimit, setPageLimit] = useState(10);

  const handleSearchOnChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSearchText(e.target.value);
  };

  const handleAddJobApplicationClick = () => {
    setJobApplicationFormPopup(true);
  };

  const updateJobApplicationList = (params: TGetJobApplicationParams) => {
    getJobApplicationsApi(params, (res) => {
      if (res?.response?.status === 200) {
        setJobApplicationList(res?.content?.data);
      }
    });
  };

  const createUpdateJobApplicationOnSuccess = () => {
    const params: TGetJobApplicationParams = {
      page: 1,
      limit: 10,
    };
    updateJobApplicationList(params);
    setJobApplicationFormPopup(false);
  };

  useEffect(() => {
    setClientSideRendering(true);
    getDashboardDataApi((res) => {
      if (res?.response?.status === 200) {
        const content = res?.content;
        setCountInfoCardData({
          totalApplications: content?.total_application_count,
          applied: content?.applied_count,
          interviews: content?.interview_count,
          offers: content?.offer_count,
        });
      }
    });

    const params: TGetJobApplicationParams = {
      page: 1,
      limit: 100,
    };
    updateJobApplicationList(params);
  }, []);

  return (
    <>
      <main className={styles.DashboardPage}>
        <div className={styles.DashboardPage_count_info_card_wrapper}>
          {countInfoCardList.map((data) => (
            <CountInfoCard
              key={data.id}
              title={data.title}
              description={data.description}
              count={countInfoCardData[data?.countKey]}
              type={data.type}
              Icon={data.Icon}
            />
          ))}
        </div>
        <div className={styles.DashboardPage_header}>
          <div className={styles.DashboardPage_header_left}>
            <h1 className={styles.DashboardPage_header_title}>Heading</h1>
            <p className={styles.DashboardPage_header_description}>
              Track and manage your job search journey
            </p>
          </div>
          <Button
            content="+ Add New Application"
            onClick={handleAddJobApplicationClick}
          />
        </div>

        <div className={styles.DashboardPage_search_bar_container}>
          <Input
            Icon={IoIosSearch}
            value={searchText}
            placeholder="Search here..."
            onChange={handleSearchOnChange}
            customWrapperClass={
              styles.DashboardPage_search_bar_input_box_wrapper
            }
            customInputBoxClass={styles.DashboardPage_search_bar_input_box}
          />
          <Dropdown
            buttonLabel={selectedDropDownOption.label}
            buttonClass={styles.DashboardPage_dropdown_filter_btn}
            startIcon={
              <LuFilter
                className={styles.DashboardPage_dropdown_filter_start_icon}
              />
            }
            // endIcon={
            //   <IoChevronDown
            //     className={styles.DashboardPage_dropdown_filter_end_icon}
            //   />
            // }
            options={statusDropdownFilterOptions}
            onSelect={(value) => setDropDown(value)}
          />
        </div>
        <div className={styles.DashboardPage_application_cards_wrapper}>
          {jobApplicationList &&
            jobApplicationList.map((data, index) => (
              <ApplicationInfoCard
                key={data?._id || index}
                jobTitle={data?.role}
                company={data?.company}
                applicationStatus={data?.status}
                location={data?.location}
                notes={data?.notes}
                salaryMin={data.salary_min}
                salaryMax={data.salary_max}
              />
            ))}
        </div>
      </main>

      {clientSideRendering && (
        <>
          <JobApplicationFormPopup
            isOpen={jobApplicationFormPopup}
            onClose={() => {
              setJobApplicationFormPopup(false);
            }}
            onSuccess={createUpdateJobApplicationOnSuccess}
          />
        </>
      )}
    </>
  );
};

export default DashboardPage;

"use client";
import React, { useEffect, useState } from "react";
import styles from "./adminPage.module.scss";
import CountInfoCard from "@/components/countInfoCard/countInfoCard";
import { FiUsers } from "react-icons/fi";
import { getAdminDashboardApi } from "@/app/api/admin/dashboard/dashboard";
import { ALERT_TYPE, alertMessage } from "@/utils/tosterAlert";
import StatusBarItem from "@/components/statusBarItem/statusBarItem";
import AdminCardWrapper from "@/components/adminCardWrapper/adminCardWrapper";
import { stat } from "fs";

type TapplicationStatusCountData = {
  id: number;
  titleText: string;
  color: string;
  count: number;
  percentage: number;
};

const AdminPage = () => {
  const [countData, setCountData] = useState({
    totalUsers: 0,
    totalApplications: 0,
    resumesAnalyzed: 0,
  });

  const [applicationStatusCountData, setApplicationStatusCountData] = useState({
    applied: 0,
    interviewScheduled: 0,
    interviewing: 0,
    selected: 0,
    rejected: 0,
    offerReceived: 0,
    withdrawn: 0,
  });

  const [applicationStatusCountList, setApplicationStatusCountList] =
    useState<TapplicationStatusCountData[]>();

  const applicaionPerUserAvg =
    countData?.totalApplications / countData?.totalUsers;

  useEffect(() => {
    updateDashboardData();
  }, []);

  const updateDashboardData = async () => {
    try {
      const response: any  = await getAdminDashboardApi();
      setCountData((prevState) => ({
        ...prevState,
        totalUsers: response.content.total_user_count,
        totalApplications: response.content.job_application_count,
        resumesAnalyzed: response.content.resumes_analyzed_count,
      }));
      const statusCountData = response.content.job_application_status_counts;
      const totalJobApplications = response.content.job_application_count;
      let statusCountList: TapplicationStatusCountData[] = [];
      if (statusCountData && "applied" && statusCountData) {
        statusCountList.push({
          id: 1,
          titleText: "Applied",
          color: "#2563EB",
          count: statusCountData.applied,
          percentage: (statusCountData.applied / totalJobApplications) * 100,
        });
      }
      if (statusCountData && "interview_scheduled" in statusCountData) {
        statusCountList.push({
          id: 2,
          titleText: "Interview Scheduled",
          color: "#F59E0B",
          count: statusCountData.interview_scheduled,
          percentage:
            (statusCountData.interview_scheduled / totalJobApplications) *
            100,
        });
      }
      if (statusCountData && "interviewing" in statusCountData) {
        statusCountList.push({
          id: 2,
          titleText: "Interviewing",
          color: "#F59E0B",
          count: statusCountData.interviewing,
          percentage:
            (statusCountData.interviewing / totalJobApplications) * 100,
        });
      }
      if (statusCountData && "selected" in statusCountData) {
        statusCountList.push({
          id: 3,
          titleText: "Selected",
          color: "#10B981",
          count: statusCountData.selected,
          percentage: (statusCountData.selected / totalJobApplications) * 100,
        });
      }
      if (statusCountData && "rejected" in statusCountData) {
        statusCountList.push({
          id: 4,
          titleText: "Rejected",
          color: "#EF4444",
          count: statusCountData.rejected,
          percentage: (statusCountData.rejected / totalJobApplications) * 100,
        });
      }
      if (statusCountData && "offer_received" in statusCountData) {
        statusCountList.push({
          id: 5,
          titleText: "Offer Received",
          color: "#8B5CF6",
          count: statusCountData.offer_received,
          percentage:
            (statusCountData.offer_received / totalJobApplications) * 100,
        });
      }
      if (statusCountData && "withdrawn" in statusCountData) {
        statusCountList.push({
          id: 6,
          titleText: "Withdrawn",
          color: "#6B7280",
          count: statusCountData.withdrawn,
          percentage:
            (statusCountData.withdrawn / totalJobApplications) * 100,
        });
      }
      setApplicationStatusCountList(statusCountList);
    } catch (error) {
       alertMessage(ALERT_TYPE.ERROR, "Dashboard API Failed!!!");
    }
  };

  useEffect(() => {
    console.log("applicationStatusCountList", applicationStatusCountList);
  }, [applicationStatusCountList]);
  return (
    <div className={styles.AdminPage}>
      <h1 className={styles.AdminPage_title}>Dashboard Overview</h1>
      <p className={styles.AdminPage_description}>
        Monitor system performance and user activity
      </p>
      <div className={styles.AdminPage_card_wrapper}>
        <CountInfoCard
          title={"Total Users"}
          description={"+24 this week"}
          count={countData.totalUsers || "-"}
          type={"plain"}
          Icon={FiUsers}
        />
        <CountInfoCard
          title={"Total Applications"}
          description={`${applicaionPerUserAvg.toFixed(1) || "-"} avg per user`}
          count={countData.totalApplications || "-"}
          type={"plain"}
          Icon={FiUsers}
          colorTheme="#2563EB"
        />
        <CountInfoCard
          title={"Resumes Analyzed"}
          description={"AI-powered analysis"}
          count={countData.resumesAnalyzed || "-"}
          type={"plain"}
          Icon={FiUsers}
          colorTheme="#9333EA"
        />
      </div>
      <div className={styles.AdminPage_cart_wrapper}>
        <AdminCardWrapper
          title="Application Status Breakdown"
          customClass={styles.AdminPage_application_status_card}
        >
          <div className={styles.AdminPage_application_status_card_content}>
            {applicationStatusCountList &&
              applicationStatusCountList.length > 0 &&
              applicationStatusCountList.map((data) => (
                <StatusBarItem
                  key={data.id}
                  barPercentage={data.percentage}
                  barColor={data.color}
                  title={data.titleText}
                  infoText={`${data.count} (${data.percentage.toFixed(0)}%)`}
                />
              ))}
          </div>
        </AdminCardWrapper>
        <AdminCardWrapper
          title="Application Status Breakdown"
          customClass={styles.AdminPage_application_status_card}
        >
          <></>
        </AdminCardWrapper>
      </div>
    </div>
  );
};

export default AdminPage;

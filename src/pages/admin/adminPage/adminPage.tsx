"use client";
import React, { useEffect, useState } from "react";
import styles from "./adminPage.module.scss";
import CountInfoCard from "@/components/countInfoCard/countInfoCard";
import { FiUsers } from "react-icons/fi";
import { getAdminDashboardApi } from "@/app/api/admin/dashboard/dashboard";
import { ALERT_TYPE, alertMessage } from "@/utils/tosterAlert";

const AdminPage = () => {
  const [countData, setCountData] = useState({
    totalUsers: 0,
    totalApplications: 0,
    resumesAnalyzed: 0,
  });

  const applicaionPerUserAvg =
    countData?.totalApplications / countData?.totalUsers;

  useEffect(() => {
    getAdminDashboardApi((res) => {
      if (res.response.status === 200) {
        setCountData((prevState) => ({
          ...prevState,
          totalUsers: res.content.total_user_count,
          totalApplications: res.content.job_application_count,
          resumesAnalyzed: res.content.resumes_analyzed_count,
        }));
      } else {
        alertMessage(ALERT_TYPE.ERROR, "Dashboard API Failed!!!");
      }
    });
  }, []);
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
        {/* <CountInfoCard
          title={"Active Users"}
          description={"87 active today"}
          count={"2"}
          type={"plain"}
          Icon={FiUsers}
          colorTheme="#16A34A"
        /> */}
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
    </div>
  );
};

export default AdminPage;

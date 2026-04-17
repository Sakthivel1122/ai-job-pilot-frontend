import React from "react";
import styles from "./adminPage.module.scss";
import CountInfoCard from "@/components/countInfoCard/countInfoCard";
import { FiUsers } from "react-icons/fi";

const AdminPage = () => {
  return (
    <div className={styles.AdminPage}>
      <h1 className={styles.AdminPage_title}>Dashboard Overview</h1>
      <p className={styles.AdminPage_description}>
        Monitor system performance and user activity
      </p>
      <div className={styles.AdminPage_card_wrapper}>
        <CountInfoCard
          key={1}
          title={"Total Users"}
          description={"+24 this week"}
          count={"2"}
          type={"plain"}
          Icon={FiUsers}
        />
        <CountInfoCard
          key={1}
          title={"Active Users"}
          description={"87 active today"}
          count={"2"}
          type={"plain"}
          Icon={FiUsers}
          colorTheme="#16A34A"
        />
        <CountInfoCard
          key={1}
          title={"Total Applications"}
          description={"5.2 avg per user"}
          count={"2"}
          type={"plain"}
          Icon={FiUsers}
          colorTheme="#2563EB"
        />
        <CountInfoCard
          key={1}
          title={"Resumes Analyzed"}
          description={"AI-powered analysis"}
          count={"2"}
          type={"plain"}
          Icon={FiUsers}
          colorTheme="#9333EA"
        />
      </div>
    </div>
  );
};

export default AdminPage;

import { ROUTES } from "@/constants/app-constants";
import { authOptions } from "@/lib/auth";
import DashboardPage from "@/pages/dashboardPage/dashboardPage";
import { AuthWrapper } from "@/wrappers/authWrapper";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

const Dashboard = async () => {
  const session = await getServerSession(authOptions);


  return (
    <>
      <AuthWrapper pathname="user_pages">
        <DashboardPage />
      </AuthWrapper>
    </>
  );
};

export default Dashboard;

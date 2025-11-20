import { ROUTES } from "@/constants/app-constants";
// import { authOptions } from "@/lib/auth";
import DashboardPage from "@/pages/dashboardPage/dashboardPage";
// import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

const Dashboard = async () => {
  // const session = await getServerSession(authOptions);

  // if (!session?.isLoggedIn) {
  //   redirect(ROUTES.HOME);
  // }

  return (
    <>
      <DashboardPage />
    </>
  );
};

export default Dashboard;

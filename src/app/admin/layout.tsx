import AdminLayout from "@/layouts/adminLayout/adminLayout";
import UserLayout from "@/layouts/userLayout/userLayout";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import React, { ReactNode } from "react";

interface IAdminLayoutPageProps {
  children: ReactNode;
}

const AdminLayoutPage: React.FC<IAdminLayoutPageProps> = async ({
  children,
}) => {
  const session = await getServerSession(authOptions);
  return (
    <>
      <AdminLayout>{children}</AdminLayout>
    </>
  );
};

export default AdminLayoutPage;

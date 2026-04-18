import AdminLayout from "@/layouts/adminLayout/adminLayout";
import { authOptions } from "@/lib/auth";
import { AuthWrapper } from "@/wrappers/authWrapper";
import { getServerSession } from "next-auth";
import React, { ReactNode } from "react";

interface IAdminLayoutPageProps {
  children: ReactNode;
}

const AdminLayoutPage: React.FC<IAdminLayoutPageProps> = async ({
  children,
}) => {
  return (
    <>
    <AuthWrapper pathname="admin_pages">
      <AdminLayout>{children}</AdminLayout>
    </AuthWrapper>
    </>
  );
};

export default AdminLayoutPage;

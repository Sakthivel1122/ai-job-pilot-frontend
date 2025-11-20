import UserLayout from "@/layouts/userLayout/userLayout";
// import { authOptions } from "@/lib/auth";
// import { getServerSession } from "next-auth";
import React, { ReactNode } from "react";

interface IUserLayoutPageProps {
  children: ReactNode;
}

const UserLayoutPage: React.FC<IUserLayoutPageProps> = async ({ children }) => {
  // const session = await getServerSession(authOptions);
  return (
    <>
      <UserLayout initialSession={undefined}>{children}</UserLayout>
    </>
  );
};

export default UserLayoutPage;

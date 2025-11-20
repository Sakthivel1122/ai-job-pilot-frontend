import React, { ReactNode } from "react";
import styles from "./userLayout.module.scss";
import NavBar from "@/containers/navBar/navBar";

interface IUserLayoutProps {
  children: ReactNode;
  initialSession: any,
}

const UserLayout: React.FC<IUserLayoutProps> = ({ children, initialSession }) => {
  return (
    <>
      <NavBar initialSession={initialSession}/>
      {children}
    </>
  );
};

export default UserLayout;

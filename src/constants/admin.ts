import { TAdminSideBarData } from "@/types/admin";
import { ROUTES } from "./app-constants";
import { MdOutlineDashboard } from "react-icons/md";
import { FiUsers } from "react-icons/fi";

export const AdminSideBarItems: TAdminSideBarData[] = [
  {
    id: 1,
    label: "Home",
    link: ROUTES.ADMIN.DASHBOARD,
    Icon: MdOutlineDashboard,
  },
  {
    id: 2,
    label: "User Management",
    link: ROUTES.ADMIN.USER_MANAGEMENT,
    Icon: FiUsers,
  },
];

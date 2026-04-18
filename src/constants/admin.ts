import { TAdminSideBarData } from "@/types/admin";
import { ROUTES } from "./app-constants";
import { REACT_ICONS } from "./react-icons";

export const AdminSideBarItems: TAdminSideBarData[] = [
  {
    id: 1,
    label: "Home",
    link: ROUTES.ADMIN.DASHBOARD,
    Icon: REACT_ICONS.DASHBOARD,
  },
  {
    id: 2,
    label: "User Management",
    link: ROUTES.ADMIN.USER_MANAGEMENT,
    Icon: REACT_ICONS.USERS,
  },
];

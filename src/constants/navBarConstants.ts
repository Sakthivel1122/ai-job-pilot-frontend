import { ROUTES } from "./app-constants";
import { TSidebarNavItem } from "@/types/sidebar";

export type TNavBarItem = TSidebarNavItem;

export const navBarItemList: TNavBarItem[] = [
  {
    id: 1,
    label: "Dashboard",
    link: ROUTES.USER.DASHBOARD,
  },
  {
    id: 2,
    label: "AI Resume Analyzer",
    link: ROUTES.USER.AI_RESUME_ANALYZER,
  },
];

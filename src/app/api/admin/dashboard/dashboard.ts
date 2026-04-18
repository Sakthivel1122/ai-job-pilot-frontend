import { API_CONSTANTS, API_METHODS } from "@/constants/api-constants";
import { fetchCall } from "../../ajax";

export const getAdminDashboardApi = (callback: (res: any) => void = () => {}) => {
  fetchCall(API_CONSTANTS.ADMIN.DASHBOARD, API_METHODS.GET, "", callback);
};

import { API_CONSTANTS, API_METHODS } from "@/constants/api-constants";
import { fetchCall } from "../../api-client";

export const getAdminDashboardApi = () => {
  return fetchCall({ url: API_CONSTANTS.ADMIN.DASHBOARD, method: API_METHODS.GET });
};

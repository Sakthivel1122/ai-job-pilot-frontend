import { API_CONSTANTS, API_METHODS } from "@/constants/api-constants";
import { fetchCall } from "../api-client";

export const getDashboardDataApi = () => {
  return fetchCall({url: API_CONSTANTS.DASHBOARD, method: API_METHODS.GET});
};

export const createUpdateJobApplicationApi = (payload: any) => {
  return fetchCall({url: API_CONSTANTS.JOB_APPLICATION, method: API_METHODS.POST, payload});
};

export const getJobApplicationsApi = (params: any) => {
  return fetchCall({url: API_CONSTANTS.GET_JOB_APPLICATION, method: API_METHODS.GET, payload: params});
};

export const deleteJobApplicationsApi = (params: string) => {
  return fetchCall({url: `${API_CONSTANTS.JOB_APPLICATION}${params}`, method: API_METHODS.DELETE});
};

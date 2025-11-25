import { API_CONSTANTS, API_METHODS } from "@/constants/api-constants";
import { fetchCall } from "../ajax";

export const getDashboardDataApi = (callback: (res: any) => void = () => {}) => {
  fetchCall(API_CONSTANTS.DASHBOARD, API_METHODS.GET, "", callback);
};

export const createUpdateJobApplicationApi = (payload: any, callback: (res: any) => void = () => {}) => {
  fetchCall(API_CONSTANTS.JOB_APPLICATION, API_METHODS.POST, payload, callback);
};

export const getJobApplicationsApi = (params: any, callback: (res: any) => void = () => {}) => {
  fetchCall(API_CONSTANTS.JOB_APPLICATION, API_METHODS.GET, params, callback);
};

export const deleteJobApplicationsApi = (params: string, callback: (res: any) => void = () => {}) => {
  fetchCall(`${API_CONSTANTS.JOB_APPLICATION}${params}`, API_METHODS.DELETE, "", callback);
};

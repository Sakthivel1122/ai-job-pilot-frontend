import { API_CONSTANTS, API_METHODS } from "@/constants/api-constants";
import { fetchCall } from "../api-client";
import { TGetResumeListApiResponse } from "@/types/apiResponseTypes";

export const uploadResumeApi = (
  payload: any,
  isServerSide: boolean = false,
) => {
  return fetchCall({
    url: API_CONSTANTS.UPLOAD_RESUME,
    method: API_METHODS.POST,
    payload,
    isServerSide,
    headers: {
      "Content-Type": undefined,
    },
  });
};

export const getResumeListApi = async (payload: any) => {
  const result: TGetResumeListApiResponse = await fetchCall({
    url: API_CONSTANTS.GET_RESUME_LIST,
    method: API_METHODS.GET,
    payload,
  });
  return result;
};

export const getResumeAnalysisApi = (
  payload: any,
  isServerSide: boolean = false,
) => {
  return fetchCall({
    url: API_CONSTANTS.RESUME_ANALYSIS,
    method: API_METHODS.POST,
    payload,
    isServerSide,
    headers: {
      "Content-Type": undefined,
    },
  });
};

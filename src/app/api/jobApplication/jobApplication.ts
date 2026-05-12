import { API_CONSTANTS, API_METHODS } from "@/constants/api-constants";
import { fetchCall } from "../api-client";
import { TGetJobApplicationDetailsApiResponse } from "@/types/apiResponseTypes";

export const getJobApplicationDetailsApi = async (
  payload: any,
  isServerSide: boolean = false,
) => {
  const result : TGetJobApplicationDetailsApiResponse = await fetchCall({
    url: API_CONSTANTS.GET_JOB_APPLICATION_DETAILS,
    method: API_METHODS.GET,
    payload,
    isServerSide,
  });

  return result;
};

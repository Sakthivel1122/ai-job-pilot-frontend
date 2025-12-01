import { API_CONSTANTS, API_METHODS } from "@/constants/api-constants";
import { fetchCall } from "../ajax";
import { TGetJobApplicationDetailsApiResponse } from "@/types/apiResponseTypes";

export const getJobApplicationDetailsApi = (
  payload: any,
  callback: (res: TGetJobApplicationDetailsApiResponse) => void = () => {},
  isServerSide: boolean = false
) => {
  fetchCall(
    API_CONSTANTS.GET_JOB_APPLICATION_DETAILS,
    API_METHODS.GET,
    payload,
    callback,
    isServerSide
  );
};

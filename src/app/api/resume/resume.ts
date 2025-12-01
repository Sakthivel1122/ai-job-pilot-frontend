import { API_CONSTANTS, API_METHODS } from "@/constants/api-constants";
import { fetchCall } from "../ajax";
import { TGetResumeListApiResponse } from "@/types/apiResponseTypes";

export const uploadResumeApi = (
  payload: any,
  callback: (res: any) => void = () => {},
  isServerSide: boolean = false
) => {
  fetchCall(
    API_CONSTANTS.UPLOAD_RESUME,
    API_METHODS.POST,
    payload,
    callback,
    isServerSide,
    undefined,
    {
      customHeader: {
        "Content-Type": undefined,
      },
    }
  );
};

export const getResumeListApi = (
  payload: any,
  callback: (res: TGetResumeListApiResponse) => void = () => {}
) => {
  fetchCall(API_CONSTANTS.GET_RESUME_LIST, API_METHODS.GET, payload, callback);
};

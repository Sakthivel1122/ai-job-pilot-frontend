import { API_CONSTANTS, API_METHODS } from "@/constants/api-constants";
import { fetchCall } from "../api-client";

export const signUpApi = (payload: any) => {
  return fetchCall({
    url: API_CONSTANTS.SIGN_UP,
    method: API_METHODS.POST,
    payload,
  });
};

export const loginApi = (payload: any) => {
  return fetchCall({
    url: API_CONSTANTS.LOGIN,
    method: API_METHODS.POST,
    payload,
  });
};

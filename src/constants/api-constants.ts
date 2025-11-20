const BaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export const API_CONSTANTS = {
  LOGIN: `${BaseUrl}/auth/login`,
  SIGN_UP: `${BaseUrl}/auth/signup`,
  REFRESH_TOKEN: `${BaseUrl}/auth/refresh-token`,
  DASHBOARD: `${BaseUrl}/user/api/v1/dashboard`,
  JOB_APPLICATION: `${BaseUrl}/user/api/v1/job-application`,
  TOKEN: `${BaseUrl}/token`,
}

export const API_METHODS = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
};

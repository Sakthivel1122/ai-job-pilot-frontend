import { ApiResponse, TJobApplicationStatus } from "./commonTypes";

export type TJobApplicationData = {
    _id: string;
    company: string;
    role: string;
    status: TJobApplicationStatus;
    job_description: string;
    location?: string;
    application_url?: string;
    salary_min?: string | number | null;
    salary_max?: string | number | null;
    notes?: string | null;
}

type TJobApplicationApiContent = {
  data: TJobApplicationData[];
  current_page_no: number;
  total_records: number;
};


export type TGetJobApplicationsApiResponse = ApiResponse<TJobApplicationApiContent>;

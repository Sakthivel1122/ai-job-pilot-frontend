import { ApiResponse, TJobApplicationStatus } from "./commonTypes";

export type TJobApplicationData = {
    _id?: string;
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

// Get Job Application Details API
export type TResumeData = {
  _id: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  user: string;
  name: string;
  job_application: string;
  file_url: string | null;
  original_text: string;
  ai_summary: string;
  ai_score: number;
  ai_feedback: string;
}

export type TJobApplicationDetails = {
  id: string;
  company: string;
  role: string;
  status: TJobApplicationStatus;
  job_description: string;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string | null;
  location?: string;
  application_url?: string | null;
  salary_min?: number;
  salary_max?: number;
  notes?: string;
  resumes: TResumeData[];
}

export type TGetJobApplicationDetailsApiResponse = ApiResponse<TJobApplicationDetails>;
export type TGetResumeListApiResponse = ApiResponse<TResumeData[]>;

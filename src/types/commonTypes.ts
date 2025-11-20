export type TJobApplicationStatus =
  | "applied"
  | "interview_scheduled"
  | "interviewing"
  | "selected"
  | "rejected"
  | "offer_received"
  | "withdrawn";

export type ApiResponse<T> = {
  content: T | null;
  response: {
    message: string;
    status: number;
  };
};

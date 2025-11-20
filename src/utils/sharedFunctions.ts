import { TJobApplicationStatus } from "@/types/commonTypes";
import { signOut } from "next-auth/react";

export const handleLogout = async (redirectionUrl?: string) => {
  if (redirectionUrl) {
    await signOut({ callbackUrl: redirectionUrl });
  } else {
    await signOut({ redirect: false });
  }
};

export const getApplicationStatusText = (status: TJobApplicationStatus) => {
  switch (status) {
    case "applied":
      return "Applied";
    case "interview_scheduled":
      return "Interview Scheduled";
    case "interviewing":
      return "Interviewing";
    case "selected":
      return "Selected";
    case "rejected":
      return "Rejected";
    case "offer_received":
      return "Offer Received";
    case "withdrawn":
      return "Withdrawn";
    default:
      return status;
  }
};

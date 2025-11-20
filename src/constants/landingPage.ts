import { IconType } from "react-icons";
import { IoIosSearch } from "react-icons/io";
import { IoDocumentTextOutline } from "react-icons/io5";
import { IoMdNotificationsOutline } from "react-icons/io";
import { IoPersonOutline } from "react-icons/io5";

type ApplicationCartType = {
  id: number;
  title: string;
  description: string;
  tagText: string;
  tagType:
    | "applied"
    | "interview_scheduled"
    | "interviewing"
    | "selected"
    | "rejected"
    | "grey"
    | "black"
    | "default";
};

export const applicationCardList: ApplicationCartType[] = [
  {
    id: 1,
    title: "Senior Developer",
    description: "TechCorp",
    tagText: "Interview Scheduled",
    tagType: "default",
  },
  {
    id: 2,
    title: "Full Stack Engineer",
    description: "StartupXYZ",
    tagText: "Applied",
    tagType: "grey",
  },
  {
    id: 3,
    title: "Software Engineer",
    description: "BigTech Inc",
    tagText: "Offer Received",
    tagType: "black",
  },
];

type TfeatureCardList = {
  id: number;
  Icon: IconType;
  iconColor?: string;
  title: string;
  description: string;
};

export const featureCardList: TfeatureCardList[] = [
  {
    id: 1,
    Icon: IoIosSearch,
    iconColor: "#2563eb",
    title: "Smart Application Tracking",
    description:
      "Organize and track all your job applications in one place with intelligent filtering and status updates.",
  },
  {
    id: 2,
    Icon: IoDocumentTextOutline,
    iconColor: "#9333ea",
    title: "AI Resume Optimization",
    description:
      "Get personalized feedback and suggestions to optimize your resume for each job application.",
  },
  {
    id: 3,
    Icon: IoMdNotificationsOutline,
    iconColor: "#16a34a",
    title: "Interview Reminders",
    description:
      "Never miss an opportunity with smart notifications and deadline tracking.",
  },
  {
    id: 4,
    Icon: IoPersonOutline,
    iconColor: "#ea580c",
    title: "Professional Insights",
    description:
      "Industry-specific tips and insights to help you stand out in your job search.",
  },
];

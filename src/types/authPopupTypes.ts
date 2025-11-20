import { IconType } from "react-icons";

export type TAuthInputFieldData = {
  id: number;
  name: string;
  type?: string;
  label?: string;
  Icon?: IconType;
  placeholder?: string;
  required?: boolean;
};

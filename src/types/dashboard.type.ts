import { IconType } from "react-icons";

export type DashSideProp = {
  name: string;
  route: string;
  logo: IconType;
  linkcolor?: string;
  notif?: boolean;
}[];

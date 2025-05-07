import { IconType } from "react-icons";

export type DashSideProp = {
  name: string;
  route: string;
  logo: IconType;
  linkcolor?: string;
  notif?: boolean;
}[];

// export type PostFormData = {
//   title: string;
//   type: string;
// };

export type MessageFormData = {
  title: string;
  receipient: string;
};

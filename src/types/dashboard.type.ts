import { IconType } from "react-icons";

export type DashSideProp = {
  name: string;
  route: string;
  logo: IconType;
  linkcolor?: string | undefined;
  notif?: boolean;
}[];

// export type AdminSideProp = {
//   name: string;
//   route?: string;
//   logo: IconType;
//   linkcolor?: string | undefined;
//   notif?: boolean;
//   children?: AdminSideProp[];
// }[];
export type AdminSideProp = {
  name: string;
  route?: string;
  logo: IconType;
  linkcolor?: string[];
  notif?: boolean;
  children?: {
    name: string;
    route: string;
    linkcolor?: string[];
    notif?: boolean;
  }[];
}[];

// export type PostFormData = {
//   title: string;
//   type: string;
// };

export type MessageFormData = {
  title: string;
  receipient: string;
};

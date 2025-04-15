import { SubmitData } from "@/types/forms.type";

export const projectcategory = [
  "Residential Architecture",

  "Interior Design",

  "Refurbishment",

  "Cultural Architecture",

  "Commercial & Offices",

  "Hospitality Architecture",

  "Public Architecture",

  "Healthcare Architecture",

  "Sports Architecture",

  "Religious Architecture",

  "Industrial & Infrastructure",

  "Landscape & Urbanism",
];

export const submitfieldPriority: (keyof SubmitData)[] = [
  "name",
  "username",
  "email",
  "agency",
  "web",
  "country",
  "projectCategory",
  "googleDriveLink",
  "built",
  "client",
  "location",
  "consult",
  "constructionYear",
  "softwares",
  "size",
  "terms",
];

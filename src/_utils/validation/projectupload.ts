import * as Yup from "yup";

export const projectuploadschema = Yup.object().shape({
  projectStory: Yup.string()
    .required("Project story is required")
    .min(10, "Project story should be at least 10 characters"),

  coverImage: Yup.mixed().required("Cover image is required"),

  threeDImages: Yup.array()
    .of(Yup.mixed())
    .min(4, "At least four 3D image is required")
    .optional(),

  sitePlan: Yup.array()
    .of(Yup.mixed())
    .min(1, "At least one site plan is required")
    .optional(),

  floorPlan: Yup.array()
    .of(Yup.mixed())
    .min(1, "At least one floor plan is required")
    .optional(),

  elevations: Yup.array()
    .of(Yup.mixed())
    .min(2, "At least two elevations image is required")
    .optional(),

  sections: Yup.array()
    .of(Yup.mixed())
    .min(1, "At least one section image is required")
    .optional(),

  details: Yup.array().of(Yup.mixed()).optional(),

  otherImages: Yup.array().of(Yup.mixed()).optional(),

  name: Yup.string().nullable().notRequired(), //done

  institutionOrFirm: Yup.string().nullable().notRequired(), //done

  website: Yup.string().url("Must be a valid URL").nullable().notRequired(), //done

  email: Yup.string().email("Must be a valid email").nullable().notRequired(), //done

  country: Yup.string().nullable().notRequired(), //done

  consultant: Yup.string().nullable().notRequired(), //done

  client: Yup.string().nullable().notRequired(), //done

  size: Yup.number().positive("Size must be positive").nullable().notRequired(), //done

  constructionYear: Yup.number()
    .min(1800, "Year must be later than 1800")
    .max(new Date().getFullYear(), "Year cannot be in the future")
    .nullable()
    .notRequired(), //done

  built: Yup.boolean().required(), //done

  architect: Yup.string().required("Architect is required"),

  isPremium: Yup.boolean().required(),

  category: Yup.string().required("Category is required"), //done

  subCategory: Yup.string().required("Sub category is required"), //done

  subCategoryClass: Yup.string().required("Sub category class is required"), //done
});

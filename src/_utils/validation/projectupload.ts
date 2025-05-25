import { DashUploadData } from "@/types/forms.type";
import * as Yup from "yup";

export const projectuploadschema = (isStrict: boolean) =>
  Yup.object().shape({
    projectStory: Yup.mixed().required("Project story is required"),

    coverImage: isStrict
      ? Yup.mixed().required("Cover image is required")
      : Yup.mixed().nullable(),

    threeDImages: Yup.array()
      .of(Yup.mixed())
      .when([], {
        is: () => isStrict,
        then: (schema) => schema.min(4, "At least four 3D images are required"),
        otherwise: (schema) => schema.nullable(),
      }),

    sitePlan: isStrict
      ? Yup.mixed().required("Site plan is required")
      : Yup.mixed().nullable(),

    floorPlan: Yup.array()
      .of(Yup.mixed())
      .when([], {
        is: () => isStrict,
        then: (schema) => schema.min(1, "At least one floor plan is required"),
        otherwise: (schema) => schema.nullable(),
      }),

    elevations: Yup.array()
      .of(Yup.mixed())
      .when([], {
        is: () => isStrict,
        then: (schema) => schema.min(2, "At least two elevations are required"),
        otherwise: (schema) => schema.nullable(),
      }),

    sections: Yup.array()
      .of(Yup.mixed())
      .when([], {
        is: () => isStrict,
        then: (schema) => schema.min(1, "At least one section is required"),
        otherwise: (schema) => schema.nullable(),
      }),

    details: isStrict
      ? Yup.mixed().required("Details is required")
      : Yup.mixed().nullable(),

    otherImages: Yup.array().of(Yup.mixed()).nullable(),
    //strict mode

    name: Yup.string().nullable().notRequired(), //done

    institutionOrFirm: Yup.string().nullable().notRequired(), //done

    website: Yup.string().url("Must be a valid URL").nullable().notRequired(), //done

    email: Yup.string().email("Must be a valid email").nullable().notRequired(), //done

    country: Yup.string().nullable().notRequired(), //done

    consultant: Yup.string().nullable().notRequired(), //done

    client: Yup.string().nullable().notRequired(), //done

    size: Yup.string().nullable().notRequired(), //done
    // size: Yup.number()
    //   .positive("Size must be positive")
    //   .nullable()
    //   .notRequired(), //done

    constructionYear: Yup.string().nullable().notRequired(),
    // constructionYear: Yup.number()
    //   .min(1800, "Year must be later than 1800")
    //   .max(new Date().getFullYear(), "Year cannot be in the future")
    //   .nullable()
    //   .notRequired(), //done

    built: Yup.boolean().required(), //done

    architect: Yup.mixed().nullable(),

    isPremium: Yup.boolean().required(), //done

    category: Yup.string().required("Category is required"), //done

    subCategory: Yup.string().required("Sub category is required"), //done

    subCategoryClass: Yup.string().required("Sub category class is required"), //done
  });

import * as Yup from "yup";

export const projectuploadschema = (isStrict: boolean) =>
  Yup.object().shape({
    projectStory: Yup.mixed().required("Project story is required"),

    // coverImage: Yup.mixed().required("Cover image is required"),

    // threeDImages: Yup.array()
    //   .of(Yup.mixed())
    //   .min(4, "At least four 3D image is required")
    //   .optional(),

    // sitePlan: Yup.array()
    //   .of(Yup.mixed())
    //   .min(1, "At least one site plan is required")
    //   .optional(),

    // floorPlan: Yup.array()
    //   .of(Yup.mixed())
    //   .min(1, "At least one floor plan is required")
    //   .optional(),

    // elevations: Yup.array()
    //   .of(Yup.mixed())
    //   .min(2, "At least two elevations image is required")
    //   .optional(),

    // sections: Yup.array()
    //   .of(Yup.mixed())
    //   .min(1, "At least one section image is required")
    //   .optional(),

    // details: Yup.array().of(Yup.mixed()).optional(),

    // otherImages: Yup.array().of(Yup.mixed()).optional(),
    //strict mode

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

    sitePlan: Yup.array()
      .of(Yup.mixed())
      .when([], {
        is: () => isStrict,
        then: (schema) => schema.min(1, "At least one site plan is required"),
        otherwise: (schema) => schema.nullable(),
      }),

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

    details: Yup.array().of(Yup.mixed()).nullable(),
    otherImages: Yup.array().of(Yup.mixed()).nullable(),
    //strict mode

    name: Yup.string().nullable().notRequired(), //done

    institutionOrFirm: Yup.string().nullable().notRequired(), //done

    website: Yup.string().url("Must be a valid URL").nullable().notRequired(), //done

    email: Yup.string().email("Must be a valid email").nullable().notRequired(), //done

    country: Yup.string().nullable().notRequired(), //done

    consultant: Yup.string().nullable().notRequired(), //done

    client: Yup.string().nullable().notRequired(), //done

    size: Yup.number()
      .positive("Size must be positive")
      .nullable()
      .notRequired(), //done

    constructionYear: Yup.number()
      .min(1800, "Year must be later than 1800")
      .max(new Date().getFullYear(), "Year cannot be in the future")
      .nullable()
      .notRequired(), //done

    built: Yup.boolean().required(), //done

    architect: Yup.mixed().nullable(),

    isPremium: Yup.boolean().required(), //done

    category: Yup.string().required("Category is required"), //done

    subCategory: Yup.string().required("Sub category is required"), //done

    subCategoryClass: Yup.string().required("Sub category class is required"), //done
  });

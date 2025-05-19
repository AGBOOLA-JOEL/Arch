"use client";

import { api } from "@/services/api";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// Import the api object that has auth bearer token attached
import { useGenselectors } from "@/_lib/store/general-store";

// Define types for the category data structure
interface SubCategoryClass {
  id: string;
  title: string;
}

interface SubCategory {
  id: string;
  title: string;
  subCategoryClasses: SubCategoryClass[];
}

interface Category {
  id: string;
  title: string;
  subCategories: SubCategory[];
}

interface CategoryData {
  categories: Category[];
}

// API functions using the api object with auth bearer token
const fetchCategoriesApi = async (): Promise<CategoryData> => {
  try {
    const { data } = await api.get("/project-categories");
    return data.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

const createCategoryApi = async (
  newCategory: string
): Promise<{ message: string }> => {
  try {
    const { data } = await api.post("/admin/project-categories", {
      newCategory,
    });
    return data;
  } catch (error) {
    console.error("Error creating category:", error);
    throw error;
  }
};

const updateCategoryApi = async ({
  categoryTitle,
  newTitle,
}: {
  categoryTitle: string;
  newTitle: string;
}): Promise<{ message: string }> => {
  try {
    const { data } = await api.patch(
      `/admin/project-categories/${categoryTitle}`,
      {
        newTitle,
      }
    );
    return data;
  } catch (error) {
    console.error("Error updating category:", error);
    throw error;
  }
};

const deleteCategoryApi = async (
  categoryTitle: string
): Promise<{ message: string }> => {
  try {
    const { data } = await api.delete(
      `/admin/project-categories/${categoryTitle}`
    );
    return data;
  } catch (error) {
    console.error("Error deleting category:", error);
    throw error;
  }
};

const createSubCategoryApi = async ({
  categoryTitle,
  title,
}: {
  categoryTitle: string;
  title: string;
}): Promise<{ message: string }> => {
  try {
    const { data } = await api.post(
      `/admin/project-categories/${categoryTitle}/sub-categories`,
      {
        title,
      }
    );
    return data;
  } catch (error) {
    console.error("Error creating subcategory:", error);
    throw error;
  }
};

const updateSubCategoryApi = async ({
  categoryTitle,
  subCategoryTitle,
  newTitle,
}: {
  categoryTitle: string;
  subCategoryTitle: string;
  newTitle: string;
}): Promise<{ message: string }> => {
  try {
    const { data } = await api.patch(
      `/admin/project-categories/${categoryTitle}/${subCategoryTitle}`,
      {
        title: newTitle,
      }
    );
    return data;
  } catch (error) {
    console.error("Error updating subcategory:", error);
    throw error;
  }
};

const deleteSubCategoryApi = async ({
  categoryTitle,
  subCategoryTitle,
}: {
  categoryTitle: string;
  subCategoryTitle: string;
}): Promise<{ message: string }> => {
  try {
    const { data } = await api.delete(
      `/admin/project-categories/${categoryTitle}/${subCategoryTitle}`
    );
    return data;
  } catch (error) {
    console.error("Error deleting subcategory:", error);
    throw error;
  }
};

const createSubCategoryClassApi = async ({
  categoryTitle,
  subCategoryTitle,
  title,
}: {
  categoryTitle: string;
  subCategoryTitle: string;
  title: string;
}): Promise<{ message: string }> => {
  try {
    const { data } = await api.post(
      `/admin/project-categories/${categoryTitle}/${subCategoryTitle}/subcategoryclass`,
      {
        title,
      }
    );
    return data;
  } catch (error) {
    console.error("Error creating class:", error);
    throw error;
  }
};

const updateSubCategoryClassApi = async ({
  categoryTitle,
  subCategoryTitle,
  classTitle,
  newTitle,
}: {
  categoryTitle: string;
  subCategoryTitle: string;
  classTitle: string;
  newTitle: string;
}): Promise<{ message: string }> => {
  try {
    const { data } = await api.patch(
      `/admin/project-categories/${categoryTitle}/${subCategoryTitle}/${classTitle}`,
      {
        title: newTitle,
      }
    );
    return data;
  } catch (error) {
    console.error("Error updating class:", error);
    throw error;
  }
};

const deleteSubCategoryClassApi = async ({
  categoryTitle,
  subCategoryTitle,
  classTitle,
}: {
  categoryTitle: string;
  subCategoryTitle: string;
  classTitle: string;
}): Promise<{ message: string }> => {
  try {
    const { data } = await api.delete(
      `/admin/project-categories/${categoryTitle}/${subCategoryTitle}/${classTitle}`
    );
    return data;
  } catch (error) {
    console.error("Error deleting class:", error);
    throw error;
  }
};

export function useCategory() {
  const queryClient = useQueryClient();
  const openToast = useGenselectors.use.openToast();

  // Fetch categories data
  const { data, isLoading, error } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategoriesApi,
  });

  // Create category mutation
  const createCategoryMutation = useMutation({
    mutationFn: createCategoryApi,
    onMutate: async (newCategory) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: ["categories"] });

      // Snapshot the previous value
      const previousData = queryClient.getQueryData<CategoryData>([
        "categories",
      ]);

      // Optimistically update to the new value
      if (previousData) {
        const newId = `${previousData.categories.length + 1}`;
        queryClient.setQueryData<CategoryData>(["categories"], {
          ...previousData,
          categories: [
            ...previousData.categories,
            {
              id: newId,
              title: newCategory,
              subCategories: [],
            },
          ],
        });
      }

      return { previousData };
    },
    onError: (err: any, newCategory, context) => {
      // If the mutation fails, use the context returned from onMutate to roll back
      if (context?.previousData) {
        queryClient.setQueryData<CategoryData>(
          ["categories"],
          context.previousData
        );
      }
      // Show error toast
      openToast(
        err?.response?.data?.message || "Failed to create category",
        3000
      );
    },
    onSettled: () => {
      // Always refetch after error or success
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });

  // Update category mutation
  const updateCategoryMutation = useMutation({
    mutationFn: updateCategoryApi,
    onMutate: async ({ categoryTitle, newTitle }) => {
      await queryClient.cancelQueries({ queryKey: ["categories"] });

      const previousData = queryClient.getQueryData<CategoryData>([
        "categories",
      ]);

      if (previousData) {
        const updatedCategories = previousData.categories.map((category) =>
          category.title === categoryTitle
            ? { ...category, title: newTitle }
            : category
        );

        queryClient.setQueryData<CategoryData>(["categories"], {
          ...previousData,
          categories: updatedCategories,
        });
      }

      return { previousData };
    },
    onError: (err: any, variables, context) => {
      if (context?.previousData) {
        queryClient.setQueryData<CategoryData>(
          ["categories"],
          context.previousData
        );
      }
      // Show error toast
      openToast(
        err?.response?.data?.message || "Failed to update category",
        3000
      );
    },
    onSettled: () => {
      // Always refetch after error or success
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });

  // Delete category mutation
  const deleteCategoryMutation = useMutation({
    mutationFn: deleteCategoryApi,
    onMutate: async (categoryTitle) => {
      await queryClient.cancelQueries({ queryKey: ["categories"] });

      const previousData = queryClient.getQueryData<CategoryData>([
        "categories",
      ]);

      if (previousData) {
        const updatedCategories = previousData.categories.filter(
          (category) => category.title !== categoryTitle
        );

        queryClient.setQueryData<CategoryData>(["categories"], {
          ...previousData,
          categories: updatedCategories,
        });
      }

      return { previousData };
    },
    onError: (err: any, categoryTitle, context) => {
      if (context?.previousData) {
        queryClient.setQueryData<CategoryData>(
          ["categories"],
          context.previousData
        );
      }
      // Show error toast
      openToast(
        err?.response?.data?.message || "Failed to delete category",
        3000
      );
    },
    onSettled: () => {
      // Always refetch after error or success
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });

  // Create subcategory mutation
  const createSubCategoryMutation = useMutation({
    mutationFn: createSubCategoryApi,
    onMutate: async ({ categoryTitle, title }) => {
      await queryClient.cancelQueries({ queryKey: ["categories"] });

      const previousData = queryClient.getQueryData<CategoryData>([
        "categories",
      ]);

      if (previousData) {
        const updatedCategories = previousData.categories.map((category) => {
          if (category.title === categoryTitle) {
            const newId = `${category.id}-${category.subCategories.length + 1}`;
            return {
              ...category,
              subCategories: [
                ...category.subCategories,
                {
                  id: newId,
                  title,
                  subCategoryClasses: [],
                },
              ],
            };
          }
          return category;
        });

        queryClient.setQueryData<CategoryData>(["categories"], {
          ...previousData,
          categories: updatedCategories,
        });
      }

      return { previousData };
    },
    onError: (err: any, variables, context) => {
      if (context?.previousData) {
        queryClient.setQueryData<CategoryData>(
          ["categories"],
          context.previousData
        );
      }
      // Show error toast
      openToast(
        err?.response?.data?.message || "Failed to create subcategory",
        3000
      );
    },
    onSettled: () => {
      // Always refetch after error or success
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });

  // Update subcategory mutation
  const updateSubCategoryMutation = useMutation({
    mutationFn: updateSubCategoryApi,
    onMutate: async ({ categoryTitle, subCategoryTitle, newTitle }) => {
      await queryClient.cancelQueries({ queryKey: ["categories"] });

      const previousData = queryClient.getQueryData<CategoryData>([
        "categories",
      ]);

      if (previousData) {
        const updatedCategories = previousData.categories.map((category) => {
          if (category.title === categoryTitle) {
            const updatedSubCategories = category.subCategories.map(
              (subCategory) =>
                subCategory.title === subCategoryTitle
                  ? { ...subCategory, title: newTitle }
                  : subCategory
            );
            return { ...category, subCategories: updatedSubCategories };
          }
          return category;
        });

        queryClient.setQueryData<CategoryData>(["categories"], {
          ...previousData,
          categories: updatedCategories,
        });
      }

      return { previousData };
    },
    onError: (err: any, variables, context) => {
      if (context?.previousData) {
        queryClient.setQueryData<CategoryData>(
          ["categories"],
          context.previousData
        );
      }
      // Show error toast
      openToast(
        err?.response?.data?.message || "Failed to update subcategory",
        3000
      );
    },
    onSettled: () => {
      // Always refetch after error or success
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });

  // Delete subcategory mutation
  const deleteSubCategoryMutation = useMutation({
    mutationFn: deleteSubCategoryApi,
    onMutate: async ({ categoryTitle, subCategoryTitle }) => {
      await queryClient.cancelQueries({ queryKey: ["categories"] });

      const previousData = queryClient.getQueryData<CategoryData>([
        "categories",
      ]);

      if (previousData) {
        const updatedCategories = previousData.categories.map((category) => {
          if (category.title === categoryTitle) {
            const updatedSubCategories = category.subCategories.filter(
              (subCategory) => subCategory.title !== subCategoryTitle
            );
            return { ...category, subCategories: updatedSubCategories };
          }
          return category;
        });

        queryClient.setQueryData<CategoryData>(["categories"], {
          ...previousData,
          categories: updatedCategories,
        });
      }

      return { previousData };
    },
    onError: (err: any, variables, context) => {
      if (context?.previousData) {
        queryClient.setQueryData<CategoryData>(
          ["categories"],
          context.previousData
        );
      }
      // Show error toast
      openToast(
        err?.response?.data?.message || "Failed to delete subcategory",
        3000
      );
    },
    onSettled: () => {
      // Always refetch after error or success
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });

  // Create subcategory class mutation
  const createSubCategoryClassMutation = useMutation({
    mutationFn: createSubCategoryClassApi,
    onMutate: async ({ categoryTitle, subCategoryTitle, title }) => {
      await queryClient.cancelQueries({ queryKey: ["categories"] });

      const previousData = queryClient.getQueryData<CategoryData>([
        "categories",
      ]);

      if (previousData) {
        const updatedCategories = previousData.categories.map((category) => {
          if (category.title === categoryTitle) {
            const updatedSubCategories = category.subCategories.map(
              (subCategory) => {
                if (subCategory.title === subCategoryTitle) {
                  const newId = `${subCategory.id}-${
                    subCategory.subCategoryClasses.length + 1
                  }`;
                  return {
                    ...subCategory,
                    subCategoryClasses: [
                      ...subCategory.subCategoryClasses,
                      {
                        id: newId,
                        title,
                      },
                    ],
                  };
                }
                return subCategory;
              }
            );
            return { ...category, subCategories: updatedSubCategories };
          }
          return category;
        });

        queryClient.setQueryData<CategoryData>(["categories"], {
          ...previousData,
          categories: updatedCategories,
        });
      }

      return { previousData };
    },
    onError: (err: any, variables, context) => {
      if (context?.previousData) {
        queryClient.setQueryData<CategoryData>(
          ["categories"],
          context.previousData
        );
      }
      // Show error toast
      openToast(err?.response?.data?.message || "Failed to create class", 3000);
    },
    onSettled: () => {
      // Always refetch after error or success
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });

  // Update subcategory class mutation
  const updateSubCategoryClassMutation = useMutation({
    mutationFn: updateSubCategoryClassApi,
    onMutate: async ({
      categoryTitle,
      subCategoryTitle,
      classTitle,
      newTitle,
    }) => {
      await queryClient.cancelQueries({ queryKey: ["categories"] });

      const previousData = queryClient.getQueryData<CategoryData>([
        "categories",
      ]);

      if (previousData) {
        const updatedCategories = previousData.categories.map((category) => {
          if (category.title === categoryTitle) {
            const updatedSubCategories = category.subCategories.map(
              (subCategory) => {
                if (subCategory.title === subCategoryTitle) {
                  const updatedClasses = subCategory.subCategoryClasses.map(
                    (classItem) =>
                      classItem.title === classTitle
                        ? { ...classItem, title: newTitle }
                        : classItem
                  );
                  return { ...subCategory, subCategoryClasses: updatedClasses };
                }
                return subCategory;
              }
            );
            return { ...category, subCategories: updatedSubCategories };
          }
          return category;
        });

        queryClient.setQueryData<CategoryData>(["categories"], {
          ...previousData,
          categories: updatedCategories,
        });
      }

      return { previousData };
    },
    onError: (err: any, variables, context) => {
      if (context?.previousData) {
        queryClient.setQueryData<CategoryData>(
          ["categories"],
          context.previousData
        );
      }
      // Show error toast
      openToast(err?.response?.data?.message || "Failed to update class", 3000);
    },
    onSettled: () => {
      // Always refetch after error or success
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });

  // Delete subcategory class mutation
  const deleteSubCategoryClassMutation = useMutation({
    mutationFn: deleteSubCategoryClassApi,
    onMutate: async ({ categoryTitle, subCategoryTitle, classTitle }) => {
      await queryClient.cancelQueries({ queryKey: ["categories"] });

      const previousData = queryClient.getQueryData<CategoryData>([
        "categories",
      ]);

      if (previousData) {
        const updatedCategories = previousData.categories.map((category) => {
          if (category.title === categoryTitle) {
            const updatedSubCategories = category.subCategories.map(
              (subCategory) => {
                if (subCategory.title === subCategoryTitle) {
                  const updatedClasses = subCategory.subCategoryClasses.filter(
                    (classItem) => classItem.title !== classTitle
                  );
                  return { ...subCategory, subCategoryClasses: updatedClasses };
                }
                return subCategory;
              }
            );
            return { ...category, subCategories: updatedSubCategories };
          }
          return category;
        });

        queryClient.setQueryData<CategoryData>(["categories"], {
          ...previousData,
          categories: updatedCategories,
        });
      }

      return { previousData };
    },
    onError: (err: any, variables, context) => {
      if (context?.previousData) {
        queryClient.setQueryData<CategoryData>(
          ["categories"],
          context.previousData
        );
      }
      // Show error toast
      openToast(err?.response?.data?.message || "Failed to delete class", 3000);
    },
    onSettled: () => {
      // Always refetch after error or success
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });

  // Wrapper functions to maintain the same API
  const createCategory = async (newCategory: string) => {
    try {
      await createCategoryMutation.mutateAsync(newCategory);
      // Force a refetch to ensure we have the latest data
      await queryClient.invalidateQueries({ queryKey: ["categories"] });
      return { success: true };
    } catch (error) {
      // Error is already handled in the mutation's onError callback
      return { success: false };
    }
  };

  const updateCategory = async (categoryTitle: string, newTitle: string) => {
    try {
      await updateCategoryMutation.mutateAsync({ categoryTitle, newTitle });
      // Force a refetch to ensure we have the latest data
      await queryClient.invalidateQueries({ queryKey: ["categories"] });
      return { success: true };
    } catch (error) {
      // Error is already handled in the mutation's onError callback
      return { success: false };
    }
  };

  const deleteCategory = async (categoryTitle: string) => {
    try {
      await deleteCategoryMutation.mutateAsync(categoryTitle);
      // Force a refetch to ensure we have the latest data
      await queryClient.invalidateQueries({ queryKey: ["categories"] });
      return { success: true };
    } catch (error) {
      // Error is already handled in the mutation's onError callback
      return { success: false };
    }
  };

  const createSubCategory = async (categoryTitle: string, title: string) => {
    try {
      await createSubCategoryMutation.mutateAsync({ categoryTitle, title });
      // Force a refetch to ensure we have the latest data
      await queryClient.invalidateQueries({ queryKey: ["categories"] });
      return { success: true };
    } catch (error) {
      // Error is already handled in the mutation's onError callback
      return { success: false };
    }
  };

  const updateSubCategory = async (
    categoryTitle: string,
    subCategoryTitle: string,
    newTitle: string
  ) => {
    try {
      const result = await updateSubCategoryMutation.mutateAsync({
        categoryTitle,
        subCategoryTitle,
        newTitle,
      });

      // Force a refetch to ensure we have the latest data
      await queryClient.invalidateQueries({ queryKey: ["categories"] });

      // Also manually update the cache to ensure UI consistency
      const currentData = queryClient.getQueryData<CategoryData>([
        "categories",
      ]);
      if (currentData) {
        const updatedCategories = currentData.categories.map((category) => {
          if (category.title === categoryTitle) {
            const updatedSubCategories = category.subCategories.map(
              (subCategory) =>
                subCategory.title === subCategoryTitle
                  ? { ...subCategory, title: newTitle }
                  : subCategory
            );
            return { ...category, subCategories: updatedSubCategories };
          }
          return category;
        });

        queryClient.setQueryData<CategoryData>(["categories"], {
          ...currentData,
          categories: updatedCategories,
        });
      }

      return { success: true };
    } catch (error) {
      // Error is already handled in the mutation's onError callback
      return { success: false };
    }
  };

  const deleteSubCategory = async (
    categoryTitle: string,
    subCategoryTitle: string
  ) => {
    try {
      const result = await deleteSubCategoryMutation.mutateAsync({
        categoryTitle,
        subCategoryTitle,
      });

      // Force a refetch to ensure we have the latest data
      await queryClient.invalidateQueries({ queryKey: ["categories"] });

      // Also manually update the cache to ensure UI consistency
      const currentData = queryClient.getQueryData<CategoryData>([
        "categories",
      ]);
      if (currentData) {
        const updatedCategories = currentData.categories.map((category) => {
          if (category.title === categoryTitle) {
            const updatedSubCategories = category.subCategories.filter(
              (subCategory) => subCategory.title !== subCategoryTitle
            );
            return { ...category, subCategories: updatedSubCategories };
          }
          return category;
        });

        queryClient.setQueryData<CategoryData>(["categories"], {
          ...currentData,
          categories: updatedCategories,
        });
      }

      return { success: true };
    } catch (error) {
      // Error is already handled in the mutation's onError callback
      return { success: false };
    }
  };

  const createSubCategoryClass = async (
    categoryTitle: string,
    subCategoryTitle: string,
    title: string
  ) => {
    try {
      await createSubCategoryClassMutation.mutateAsync({
        categoryTitle,
        subCategoryTitle,
        title,
      });
      // Force a refetch to ensure we have the latest data
      await queryClient.invalidateQueries({ queryKey: ["categories"] });
      return { success: true };
    } catch (error) {
      // Error is already handled in the mutation's onError callback
      return { success: false };
    }
  };

  const updateSubCategoryClass = async (
    categoryTitle: string,
    subCategoryTitle: string,
    classTitle: string,
    newTitle: string
  ) => {
    try {
      const result = await updateSubCategoryClassMutation.mutateAsync({
        categoryTitle,
        subCategoryTitle,
        classTitle,
        newTitle,
      });

      // Force a refetch to ensure we have the latest data
      await queryClient.invalidateQueries({ queryKey: ["categories"] });

      // Also manually update the cache to ensure UI consistency
      const currentData = queryClient.getQueryData<CategoryData>([
        "categories",
      ]);
      if (currentData) {
        const updatedCategories = currentData.categories.map((category) => {
          if (category.title === categoryTitle) {
            const updatedSubCategories = category.subCategories.map(
              (subCategory) => {
                if (subCategory.title === subCategoryTitle) {
                  const updatedClasses = subCategory.subCategoryClasses.map(
                    (classItem) =>
                      classItem.title === classTitle
                        ? { ...classItem, title: newTitle }
                        : classItem
                  );
                  return { ...subCategory, subCategoryClasses: updatedClasses };
                }
                return subCategory;
              }
            );
            return { ...category, subCategories: updatedSubCategories };
          }
          return category;
        });

        queryClient.setQueryData<CategoryData>(["categories"], {
          ...currentData,
          categories: updatedCategories,
        });
      }

      return { success: true };
    } catch (error) {
      // Error is already handled in the mutation's onError callback
      return { success: false };
    }
  };

  const deleteSubCategoryClass = async (
    categoryTitle: string,
    subCategoryTitle: string,
    classTitle: string
  ) => {
    try {
      const result = await deleteSubCategoryClassMutation.mutateAsync({
        categoryTitle,
        subCategoryTitle,
        classTitle,
      });

      // Force a refetch to ensure we have the latest data
      await queryClient.invalidateQueries({ queryKey: ["categories"] });

      // Also manually update the cache to ensure UI consistency
      const currentData = queryClient.getQueryData<CategoryData>([
        "categories",
      ]);
      if (currentData) {
        const updatedCategories = currentData.categories.map((category) => {
          if (category.title === categoryTitle) {
            const updatedSubCategories = category.subCategories.map(
              (subCategory) => {
                if (subCategory.title === subCategoryTitle) {
                  const updatedClasses = subCategory.subCategoryClasses.filter(
                    (classItem) => classItem.title !== classTitle
                  );
                  return { ...subCategory, subCategoryClasses: updatedClasses };
                }
                return subCategory;
              }
            );
            return { ...category, subCategories: updatedSubCategories };
          }
          return category;
        });

        queryClient.setQueryData<CategoryData>(["categories"], {
          ...currentData,
          categories: updatedCategories,
        });
      }

      return { success: true };
    } catch (error) {
      // Error is already handled in the mutation's onError callback
      return { success: false };
    }
  };

  return {
    data,
    isLoading,
    error,
    loadingStates: {
      fetchLoading: isLoading,
      createCategoryLoading: createCategoryMutation.isPending,
      updateCategoryLoading: updateCategoryMutation.isPending,
      deleteCategoryLoading: deleteCategoryMutation.isPending,
      createSubCategoryLoading: createSubCategoryMutation.isPending,
      updateSubCategoryLoading: updateSubCategoryMutation.isPending,
      deleteSubCategoryLoading: deleteSubCategoryMutation.isPending,
      createClassLoading: createSubCategoryClassMutation.isPending,
      updateClassLoading: updateSubCategoryClassMutation.isPending,
      deleteClassLoading: deleteSubCategoryClassMutation.isPending,
    },
    createCategory,
    updateCategory,
    deleteCategory,
    createSubCategory,
    updateSubCategory,
    deleteSubCategory,
    createSubCategoryClass,
    updateSubCategoryClass,
    deleteSubCategoryClass,
  };
}

"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { Edit, Plus, Loader2 } from "lucide-react";
import { useCategory } from "@/_hooks/useCategory";
import { useQueryClient } from "@tanstack/react-query";
import ArchSpinner from "../general/ArchSpinner";

// Button loader component
const ButtonLoader = () => (
  <Loader2 size={16} className="dash_uploadcat_button_spinner" />
);

interface DashUploadCategoriesProps {
  setValue: any;
}

export default function DashUploadCategories({
  setValue,
}: DashUploadCategoriesProps) {
  // Internal state for showHead
  const [showHead, setShowhead] = useState<boolean>(true);

  // State for selected items
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>("");
  const [selectedClass, setSelectedClass] = useState<string>("");

  // State for editing
  const [editingCategoryId, setEditingCategoryId] = useState<string>("");
  const [editingSubCategoryId, setEditingSubCategoryId] = useState<string>("");
  const [editingClassId, setEditingClassId] = useState<string>("");

  // State for input values
  const [newCategoryValue, setNewCategoryValue] = useState<string>("");
  const [newSubCategoryValue, setNewSubCategoryValue] = useState<string>("");
  const [newClassValue, setNewClassValue] = useState<string>("");

  // State for showing input fields
  const [showCategoryInput, setShowCategoryInput] = useState<boolean>(false);
  const [showSubCategoryInput, setShowSubCategoryInput] =
    useState<boolean>(false);
  const [showClassInput, setShowClassInput] = useState<boolean>(false);
  const [subCategoryForNewClass, setSubCategoryForNewClass] =
    useState<string>("");

  // State for dropdown menus
  const [openCategoryMenu, setOpenCategoryMenu] = useState<string>("");
  const [openSubCategoryMenu, setOpenSubCategoryMenu] = useState<string>("");
  const [openClassMenu, setOpenClassMenu] = useState<string>("");

  // State for subcategory data
  const [subCategoryData, setSubCategoryData] = useState<any[]>([]);

  // Use the custom hook for category data and operations
  const {
    data,
    isLoading,
    loadingStates,
    error,
    createCategory,
    updateCategory,
    deleteCategory,
    createSubCategory,
    updateSubCategory,
    deleteSubCategory,
    createSubCategoryClass,
    updateSubCategoryClass,
    deleteSubCategoryClass,
  } = useCategory();

  // Add queryClient for manual invalidation
  const queryClient = useQueryClient();

  // Handle category selection
  const handleCategorySelect = (categoryTitle: string) => {
    setSelectedCategory(categoryTitle);
    setValue("category", categoryTitle);

    // Find subcategories for the selected category
    const category = data?.categories.find(
      (cat: any) => cat.title === categoryTitle
    );
    if (category) {
      setSubCategoryData([category]);
    }

    setShowhead(false);
  };

  // Handle subcategory selection
  const handleSubCategorySelect = (subCategoryTitle: string) => {
    setSelectedSubCategory(subCategoryTitle);
    setValue("subCategory", subCategoryTitle);
    setSelectedClass("");
  };

  // Handle class selection
  const handleClassSelect = (classTitle: string) => {
    setSelectedClass(classTitle);
    setValue("subCategoryClass", classTitle);
  };

  // Handle key press for category input
  const handleCategoryKeyDown = async (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Enter" && newCategoryValue.trim()) {
      e.preventDefault(); // Prevent form submission
      const result = await createCategory(newCategoryValue);
      if (result.success) {
        setShowCategoryInput(false);
        setNewCategoryValue("");
      }
    }
  };

  // Handle key press for subcategory input
  const handleSubCategoryKeyDown = async (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Enter" && newSubCategoryValue.trim() && selectedCategory) {
      e.preventDefault(); // Prevent form submission
      const result = await createSubCategory(
        selectedCategory,
        newSubCategoryValue
      );
      if (result.success) {
        setShowSubCategoryInput(false);
        setNewSubCategoryValue("");
      }
    }
  };

  // Handle key press for class input
  const handleClassKeyDown = async (
    e: React.KeyboardEvent<HTMLInputElement>,
    subCategoryTitle: string
  ) => {
    if (e.key === "Enter" && newClassValue.trim() && selectedCategory) {
      e.preventDefault(); // Prevent form submission
      const result = await createSubCategoryClass(
        selectedCategory,
        subCategoryTitle,
        newClassValue
      );
      if (result.success) {
        setSubCategoryForNewClass("");
        setNewClassValue("");
      }
    }
  };

  // Handle key press for category edit
  const handleCategoryEditKeyDown = async (
    e: React.KeyboardEvent<HTMLInputElement>,
    categoryTitle: string
  ) => {
    if (e.key === "Enter" && newCategoryValue.trim()) {
      e.preventDefault(); // Prevent form submission
      const result = await updateCategory(categoryTitle, newCategoryValue);
      if (result.success) {
        setEditingCategoryId("");
        setNewCategoryValue("");

        // If this was the selected category, update the selected category name
        if (selectedCategory === categoryTitle) {
          setSelectedCategory(newCategoryValue);
          setValue("category", newCategoryValue);
        }
      }
    }
  };

  // Handle key press for subcategory edit
  const handleSubCategoryEditKeyDown = async (
    e: React.KeyboardEvent<HTMLInputElement>,
    subCategoryTitle: string
  ) => {
    if (e.key === "Enter" && newSubCategoryValue.trim() && selectedCategory) {
      e.preventDefault(); // Prevent form submission

      // Store the new value before the API call
      const updatedTitle = newSubCategoryValue;

      const result = await updateSubCategory(
        selectedCategory,
        subCategoryTitle,
        updatedTitle
      );
      if (result.success) {
        setEditingSubCategoryId("");
        setNewSubCategoryValue("");

        // If this was the selected subcategory, update the selected subcategory name
        if (selectedSubCategory === subCategoryTitle) {
          setSelectedSubCategory(updatedTitle);
          setValue("subCategory", updatedTitle);
        }
      }
    }
  };

  // Handle key press for class edit
  const handleClassEditKeyDown = async (
    e: React.KeyboardEvent<HTMLInputElement>,
    subCategoryTitle: string,
    classTitle: string
  ) => {
    if (e.key === "Enter" && newClassValue.trim() && selectedCategory) {
      e.preventDefault(); // Prevent form submission

      // Store the new value before the API call
      const updatedTitle = newClassValue;

      const result = await updateSubCategoryClass(
        selectedCategory,
        subCategoryTitle,
        classTitle,
        updatedTitle
      );
      if (result.success) {
        setEditingClassId("");
        setNewClassValue("");

        // If this was the selected class, update the selected class name
        if (selectedClass === classTitle) {
          setSelectedClass(updatedTitle);
          setValue("subCategoryClass", updatedTitle);
        }
      }
    }
  };

  // Handle delete category
  const handleDeleteCategory = async (categoryTitle: string) => {
    const result = await deleteCategory(categoryTitle);
    if (result.success) {
      setOpenCategoryMenu("");

      // If this was the selected category, clear selection
      if (selectedCategory === categoryTitle) {
        setSelectedCategory("");
        setSelectedSubCategory("");
        setSelectedClass("");
        setValue("category", "");
        setValue("subCategory", "");
        setValue("subCategoryClass", "");
        setShowhead(true);
      }
    }
  };

  // Handle delete subcategory
  const handleDeleteSubCategory = async (
    categoryTitle: string,
    subCategoryTitle: string
  ) => {
    const result = await deleteSubCategory(categoryTitle, subCategoryTitle);
    if (result.success) {
      setOpenSubCategoryMenu("");

      // If this was the selected subcategory, clear selection
      if (selectedSubCategory === subCategoryTitle) {
        setSelectedSubCategory("");
        setSelectedClass("");
        setValue("subCategory", "");
        setValue("subCategoryClass", "");
      }
    }
  };

  // Handle delete class
  const handleDeleteClass = async (
    categoryTitle: string,
    subCategoryTitle: string,
    classTitle: string
  ) => {
    const result = await deleteSubCategoryClass(
      categoryTitle,
      subCategoryTitle,
      classTitle
    );
    if (result.success) {
      setOpenClassMenu("");

      // If this was the selected class, clear selection
      if (selectedClass === classTitle) {
        setSelectedClass("");
        setValue("subCategoryClass", "");
      }
    }
  };

  // Function to refresh category data
  const refreshCategoryData = () => {
    if (data && selectedCategory) {
      // Find the updated category with the latest data
      const updatedCategory = data.categories.find(
        (cat: any) => cat.title === selectedCategory
      );
      if (updatedCategory) {
        // Update the local state with the latest data
        setSubCategoryData([updatedCategory]);

        // Check if the selected subcategory still exists
        const subCategoryExists = updatedCategory.subCategories.some(
          (sub: any) => sub.title === selectedSubCategory
        );

        if (!subCategoryExists && selectedSubCategory) {
          // If the selected subcategory no longer exists, clear the selection
          setSelectedSubCategory("");
          setSelectedClass("");
          setValue("subCategory", "");
          setValue("subCategoryClass", "");
        } else if (selectedSubCategory) {
          // If the subcategory exists, check if the selected class still exists
          const subCategory = updatedCategory.subCategories.find(
            (sub: any) => sub.title === selectedSubCategory
          );

          if (subCategory) {
            const classExists = subCategory.subCategoryClasses.some(
              (cls: any) => cls.title === selectedClass
            );

            if (!classExists && selectedClass) {
              // If the selected class no longer exists, clear the selection
              setSelectedClass("");
              setValue("subCategoryClass", "");
            }
          }
        }
      } else {
        // If category no longer exists, go back to categories view
        setShowhead(true);
        setSelectedCategory("");
        setSelectedSubCategory("");
        setSelectedClass("");
        setValue("category", "");
        setValue("subCategory", "");
        setValue("subCategoryClass", "");
      }
    }
  };

  // Update subcategory data when data changes
  useEffect(() => {
    refreshCategoryData();
  }, [data, selectedCategory]);

  if (isLoading) {
    return (
      <div className="dash_uploadspinner">
        <ArchSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="dash_uploadunavail">
        Error loading categories: {error.message}
      </div>
    );
  }

  return (
    <div className="dash_uploadcat">
      {showHead && (
        <div className="dash_uploadcat_categories">
          <h2 className="dash_uploadcat_title">Categories</h2>
          <div className="dash_uploadcat_list">
            {data?.categories.map((category: any) => (
              <div key={category.id} className="dash_uploadcat_item">
                {editingCategoryId === category.id ? (
                  <div className="dash_uploadcat_edit_container">
                    <input
                      type="text"
                      className="dash_uploadcat_input"
                      defaultValue={category.title}
                      onChange={(e) => setNewCategoryValue(e.target.value)}
                      onKeyDown={(e) =>
                        handleCategoryEditKeyDown(e, category.title)
                      }
                      autoFocus
                      disabled={loadingStates.updateCategoryLoading}
                    />
                    {loadingStates.updateCategoryLoading && <ButtonLoader />}
                  </div>
                ) : (
                  <div className="dash_uploadcat_item_content">
                    <p
                      className="dash_uploadcat_item_name"
                      onClick={() => handleCategorySelect(category.title)}
                    >
                      {category.title}
                    </p>
                    <div
                      className="dash_uploadcat_edit_btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpenCategoryMenu(
                          openCategoryMenu === category.id ? "" : category.id
                        );
                      }}
                      style={{
                        cursor: loadingStates.deleteCategoryLoading
                          ? "not-allowed"
                          : "pointer",
                      }}
                    >
                      <Edit size={16} />
                    </div>
                  </div>
                )}

                {openCategoryMenu === category.id && (
                  <div className="dash_uploadcat_dropdown">
                    <div
                      className="dash_uploadcat_dropdown_item"
                      onClick={() => {
                        setEditingCategoryId(category.id);
                        setOpenCategoryMenu("");
                      }}
                      style={{
                        cursor:
                          loadingStates.updateCategoryLoading ||
                          loadingStates.deleteCategoryLoading
                            ? "not-allowed"
                            : "pointer",
                      }}
                    >
                      Edit
                    </div>
                    <div
                      className="dash_uploadcat_dropdown_item dash_uploadcat_dropdown_item_delete"
                      onClick={() => handleDeleteCategory(category.title)}
                      style={{
                        cursor: loadingStates.deleteCategoryLoading
                          ? "not-allowed"
                          : "pointer",
                      }}
                    >
                      {loadingStates.deleteCategoryLoading ? (
                        <ButtonLoader />
                      ) : (
                        "Delete"
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}

            <div className="dash_uploadcat_add">
              {showCategoryInput ? (
                <div className="dash_uploadcat_edit_container">
                  <input
                    type="text"
                    className="dash_uploadcat_input"
                    placeholder="New category"
                    value={newCategoryValue}
                    onChange={(e) => setNewCategoryValue(e.target.value)}
                    onKeyDown={handleCategoryKeyDown}
                    autoFocus
                    disabled={loadingStates.createCategoryLoading}
                  />
                  {loadingStates.createCategoryLoading && <ButtonLoader />}
                </div>
              ) : (
                <div
                  className="dash_uploadcat_add_btn"
                  onClick={() => setShowCategoryInput(true)}
                  style={{
                    cursor: loadingStates.createCategoryLoading
                      ? "not-allowed"
                      : "pointer",
                  }}
                >
                  <Plus size={16} />
                  <span>Add Category</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {!showHead && (
        <div className="dash_uploadcat_subcategories">
          <div className="dash_uploadcat_header">
            <div
              className="dash_uploadcat_back_btn"
              onClick={() => setShowhead(true)}
            >
              select categories
            </div>
            <h2 className="dash_uploadcat_title">{selectedCategory}</h2>
          </div>

          <div className="dash_uploadcat_content">
            {/* Add new subcategory button */}
            <div className="dash_uploadcat_add dash_uploadcat_subcategory_add">
              {showSubCategoryInput ? (
                <div className="dash_uploadcat_edit_container">
                  <input
                    type="text"
                    className="dash_uploadcat_input"
                    placeholder="New subcategory"
                    value={newSubCategoryValue}
                    onChange={(e) => setNewSubCategoryValue(e.target.value)}
                    onKeyDown={handleSubCategoryKeyDown}
                    autoFocus
                    disabled={loadingStates.createSubCategoryLoading}
                  />
                  {loadingStates.createSubCategoryLoading && <ButtonLoader />}
                </div>
              ) : (
                <div
                  className="dash_uploadcat_add_btn"
                  onClick={() => setShowSubCategoryInput(true)}
                  style={{
                    cursor: loadingStates.createSubCategoryLoading
                      ? "not-allowed"
                      : "pointer",
                  }}
                >
                  <Plus size={16} />
                  <span>Add Subcategory</span>
                </div>
              )}
            </div>

            {/* Subcategories list */}
            {subCategoryData.map((category) => (
              <div
                key={category.id}
                className="dash_uploadcat_subcategory_list"
              >
                {category.subCategories.map((subCategory: any) => (
                  <div
                    key={subCategory.id}
                    className="dash_uploadcat_subcategory"
                  >
                    <div className="dash_uploadcat_subcategory_header">
                      {editingSubCategoryId === subCategory.id ? (
                        <div className="dash_uploadcat_edit_container">
                          <input
                            type="text"
                            className="dash_uploadcat_input"
                            defaultValue={subCategory.title}
                            onChange={(e) =>
                              setNewSubCategoryValue(e.target.value)
                            }
                            onKeyDown={(e) =>
                              handleSubCategoryEditKeyDown(e, subCategory.title)
                            }
                            autoFocus
                            disabled={loadingStates.updateSubCategoryLoading}
                          />
                          {loadingStates.updateSubCategoryLoading && (
                            <ButtonLoader />
                          )}
                        </div>
                      ) : (
                        <div className="dash_uploadcat_subcategory_title_wrapper">
                          <h3
                            className={`dash_uploadcat_subcategory_title ${
                              selectedSubCategory === subCategory.title
                                ? "dash_uploadcat_subcategory_title_active"
                                : ""
                            }`}
                            onClick={() =>
                              handleSubCategorySelect(subCategory.title)
                            }
                          >
                            {subCategory.title}
                          </h3>
                          <div
                            className="dash_uploadcat_edit_btn"
                            onClick={(e) => {
                              e.stopPropagation();
                              setOpenSubCategoryMenu(
                                openSubCategoryMenu === subCategory.id
                                  ? ""
                                  : subCategory.id
                              );
                            }}
                            style={{
                              cursor: loadingStates.deleteSubCategoryLoading
                                ? "not-allowed"
                                : "pointer",
                            }}
                          >
                            <Edit size={16} />
                          </div>
                        </div>
                      )}

                      {openSubCategoryMenu === subCategory.id && (
                        <div className="dash_uploadcat_dropdown dash_uploadcat_subcategory_dropdown">
                          <div
                            className="dash_uploadcat_dropdown_item"
                            onClick={() => {
                              setEditingSubCategoryId(subCategory.id);
                              setOpenSubCategoryMenu("");
                            }}
                            style={{
                              cursor:
                                loadingStates.updateSubCategoryLoading ||
                                loadingStates.deleteSubCategoryLoading
                                  ? "not-allowed"
                                  : "pointer",
                            }}
                          >
                            Edit
                          </div>
                          <div
                            className="dash_uploadcat_dropdown_item dash_uploadcat_dropdown_item_delete"
                            onClick={() =>
                              handleDeleteSubCategory(
                                selectedCategory,
                                subCategory.title
                              )
                            }
                            style={{
                              cursor: loadingStates.deleteSubCategoryLoading
                                ? "not-allowed"
                                : "pointer",
                            }}
                          >
                            {loadingStates.deleteSubCategoryLoading ? (
                              <ButtonLoader />
                            ) : (
                              "Delete"
                            )}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Classes list */}
                    <div className="dash_uploadcat_classes">
                      {subCategory.subCategoryClasses.map((classItem: any) => (
                        <div
                          key={classItem.id}
                          className="dash_uploadcat_class"
                        >
                          {editingClassId === classItem.id ? (
                            <div className="dash_uploadcat_edit_container">
                              <input
                                type="text"
                                className="dash_uploadcat_input dash_uploadcat_class_input"
                                defaultValue={classItem.title}
                                onChange={(e) =>
                                  setNewClassValue(e.target.value)
                                }
                                onKeyDown={(e) =>
                                  handleClassEditKeyDown(
                                    e,
                                    subCategory.title,
                                    classItem.title
                                  )
                                }
                                autoFocus
                                disabled={loadingStates.updateClassLoading}
                              />
                              {loadingStates.updateClassLoading && (
                                <ButtonLoader />
                              )}
                            </div>
                          ) : (
                            <div className="dash_uploadcat_class_content">
                              <p
                                className={`dash_uploadcat_class_name ${
                                  selectedClass === classItem.title
                                    ? "dash_uploadcat_class_name_active"
                                    : ""
                                }`}
                                onClick={() => {
                                  handleSubCategorySelect(subCategory.title);
                                  handleClassSelect(classItem.title);
                                }}
                              >
                                {classItem.title}
                              </p>
                              <div
                                className="dash_uploadcat_edit_btn"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setOpenClassMenu(
                                    openClassMenu === classItem.id
                                      ? ""
                                      : classItem.id
                                  );
                                }}
                                style={{
                                  cursor: loadingStates.deleteClassLoading
                                    ? "not-allowed"
                                    : "pointer",
                                }}
                              >
                                <Edit size={16} />
                              </div>
                            </div>
                          )}

                          {openClassMenu === classItem.id && (
                            <div className="dash_uploadcat_dropdown dash_uploadcat_class_dropdown">
                              <div
                                className="dash_uploadcat_dropdown_item"
                                onClick={() => {
                                  setEditingClassId(classItem.id);
                                  setOpenClassMenu("");
                                }}
                                style={{
                                  cursor:
                                    loadingStates.updateClassLoading ||
                                    loadingStates.deleteClassLoading
                                      ? "not-allowed"
                                      : "pointer",
                                }}
                              >
                                Edit
                              </div>
                              <div
                                className="dash_uploadcat_dropdown_item dash_uploadcat_dropdown_item_delete"
                                onClick={() =>
                                  handleDeleteClass(
                                    selectedCategory,
                                    subCategory.title,
                                    classItem.title
                                  )
                                }
                                style={{
                                  cursor: loadingStates.deleteClassLoading
                                    ? "not-allowed"
                                    : "pointer",
                                }}
                              >
                                {loadingStates.deleteClassLoading ? (
                                  <ButtonLoader />
                                ) : (
                                  "Delete"
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}

                      {/* Add new class */}
                      {subCategoryForNewClass === subCategory.id ? (
                        <div className="dash_uploadcat_class_add_input">
                          <div className="dash_uploadcat_edit_container">
                            <input
                              type="text"
                              className="dash_uploadcat_input dash_uploadcat_class_input"
                              placeholder="New class"
                              value={newClassValue}
                              onChange={(e) => setNewClassValue(e.target.value)}
                              onKeyDown={(e) =>
                                handleClassKeyDown(e, subCategory.title)
                              }
                              autoFocus
                              disabled={loadingStates.createClassLoading}
                            />
                            {loadingStates.createClassLoading && (
                              <ButtonLoader />
                            )}
                          </div>
                          <div
                            className="dash_uploadcat_cancel_btn"
                            onClick={() => {
                              setSubCategoryForNewClass("");
                              setNewClassValue("");
                            }}
                            style={{
                              cursor: loadingStates.createClassLoading
                                ? "not-allowed"
                                : "pointer",
                            }}
                          >
                            Cancel
                          </div>
                        </div>
                      ) : (
                        <div
                          className="dash_uploadcat_add_btn dash_uploadcat_class_add_btn"
                          onClick={() =>
                            setSubCategoryForNewClass(subCategory.id)
                          }
                          style={{
                            cursor: loadingStates.createClassLoading
                              ? "not-allowed"
                              : "pointer",
                          }}
                        >
                          <Plus size={14} />
                          <span>Add Class</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

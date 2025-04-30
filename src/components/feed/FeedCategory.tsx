"use client";
import type React from "react";
import { useState, useEffect, useRef } from "react";
import { Search, ChevronDown, ChevronRight } from "lucide-react";
import { filtercategories } from "@/data/feed.data";

// Define our search result type
type SearchResult = {
  id: string;
  name: string;
  path: string;
  level: "header" | "subheader" | "content";
};

export const FeedCategory = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] =
    useState<string>("Select Category");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [expandedCategories, setExpandedCategories] = useState<
    Record<string, boolean>
  >({});
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Toggle category expansion
  const toggleCategory = (categoryId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedCategories((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }));
  };

  // Select a category/subheader/content
  const selectCategory = (name: string) => {
    setSelectedCategory(name);
    setIsOpen(false);
    setSearchTerm("");
    setSearchResults([]);
  };

  // Search for headers, subheaders, and content
  useEffect(() => {
    if (!searchTerm) {
      setSearchResults([]);
      return;
    }

    const results: SearchResult[] = [];
    const term = searchTerm.toLowerCase();

    // Search through all categories, headers, subheaders, and content
    filtercategories.forEach((category) => {
      category.data.forEach((header) => {
        // Check header
        if (header.header.toLowerCase().includes(term)) {
          results.push({
            id: header.id,
            name: header.header,
            path: header.header,
            level: "header",
          });
        }

        // Check subheaders and content
        header.subheader.forEach((subheader: any) => {
          if (subheader.title.toLowerCase().includes(term)) {
            results.push({
              id: subheader.id,
              name: subheader.title,
              path: `${header.header} > ${subheader.title}`,
              level: "subheader",
            });
          }

          // Check content
          subheader.content.forEach((content: any) => {
            if (content.subcontent.toLowerCase().includes(term)) {
              results.push({
                id: content.id,
                name: content.subcontent,
                path: `${header.header} > ${subheader.title} > ${content.subcontent}`,
                level: "content",
              });
            }
          });
        });
      });
    });

    setSearchResults(results);
  }, [searchTerm]);

  // Render category items
  const renderCategoryItems = () => {
    // If there's a search term, show search results instead
    if (searchTerm && searchResults.length > 0) {
      return (
        <div className="search-results">
          {searchResults.map((result) => (
            <div
              key={`${result.level}-${result.id}`}
              className="search-result-item"
              onClick={() => selectCategory(result.name)}
            >
              <div className="result-name">{result.name}</div>
              <div className="result-path">{result.path}</div>
            </div>
          ))}
        </div>
      );
    }

    // Otherwise show the regular category tree
    return filtercategories[0].data.map((header: any) => (
      <div key={header.id} className="category-item">
        <div
          className="category-header"
          onClick={() => selectCategory(header.header)}
        >
          {header.subheader && header.subheader.length > 0 ? (
            <span
              className="expand-icon"
              onClick={(e) => toggleCategory(header.id, e)}
            >
              {expandedCategories[header.id] ? (
                <ChevronDown size={16} />
              ) : (
                <ChevronRight size={16} />
              )}
            </span>
          ) : (
            <span className="spacer"></span>
          )}
          <span className="category-name">{header.header}</span>
        </div>

        {header.subheader && expandedCategories[header.id] && (
          <div className="subcategories">
            {header.subheader.map((subheader: any) => (
              <div key={subheader.id} className="subcategory-item">
                <div
                  className="subcategory-header"
                  onClick={() => selectCategory(subheader.title)}
                >
                  {subheader.content && subheader.content.length > 0 ? (
                    <span
                      className="expand-icon"
                      onClick={(e) => toggleCategory(subheader.id, e)}
                    >
                      {expandedCategories[subheader.id] ? (
                        <ChevronDown size={14} />
                      ) : (
                        <ChevronRight size={14} />
                      )}
                    </span>
                  ) : (
                    <span className="spacer"></span>
                  )}
                  <span className="subcategory-name">{subheader.title}</span>
                </div>

                {subheader.content && expandedCategories[subheader.id] && (
                  <div className="sub-subcategories">
                    {subheader.content.map((content: any) => (
                      <div
                        key={content.id}
                        className="sub-subcategory-item"
                        onClick={() => selectCategory(content.subcontent)}
                      >
                        <span className="spacer"></span>
                        <span className="sub-subcategory-name">
                          {content.subcontent}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    ));
  };

  return (
    <div className="feedcategory-dropdown" ref={dropdownRef}>
      <div className="dropdown-header" onClick={() => setIsOpen(!isOpen)}>
        <span className="selected-category">{selectedCategory}</span>
        <ChevronDown
          className={`dropdown-icon ${isOpen ? "open" : ""}`}
          size={20}
        />
      </div>

      {isOpen && (
        <div className="dropdown-panel">
          <div className="search-container">
            <Search size={16} className="search-icon" />
            <input
              type="text"
              placeholder="Search categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
              onClick={(e) => e.stopPropagation()}
              autoFocus
            />
          </div>
          <div className="categories-container">{renderCategoryItems()}</div>
        </div>
      )}
    </div>
  );
};

export default FeedCategory;

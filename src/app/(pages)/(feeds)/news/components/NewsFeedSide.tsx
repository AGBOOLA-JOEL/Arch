"use client";
import { useNews } from "@/_hooks/useNews";
import SideBar from "@/components/sidebar/SideBar";
import React from "react";

const NewsFeedSide = () => {
  const { news } = useNews();
  return <SideBar news={news} />;
};

export default NewsFeedSide;

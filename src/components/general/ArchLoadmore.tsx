"use client";

import { useState, useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

type Props = {
  onLoadMore: () => void;
  isLoading: boolean;
  threshold?: number;
};

const ArchLoadmore = ({ onLoadMore, isLoading, threshold = 80 }: Props) => {
  const dragY = useMotionValue(0);
  const [hasDraggedEnough, setHasDraggedEnough] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const statusText = isLoading
    ? "Loading..."
    : hasDraggedEnough
    ? "Release to load"
    : "⇩ Drag to load more";

  const scale = useTransform(dragY, [-100, 0, 100], [0.95, 1, 1.1]);
  const opacity = useTransform(dragY, [-100, 0, 100], [0.5, 1, 0.7]);

  const handleDragEnd = (
    _event: MouseEvent | TouchEvent | PointerEvent,
    info: { offset: { y: number } }
  ) => {
    setIsDragging(false);
    if (info.offset.y > threshold && !isLoading) {
      onLoadMore();
    }
    dragY.set(0);
    setHasDraggedEnough(false);
  };

  return (
    <motion.div
      drag="y"
      style={{
        y: dragY,
        scale,
        opacity,
        cursor: "grab",
        textAlign: "center",
        padding: "1rem",
        marginTop: "1rem",
        borderRadius: "12px",
        background: "#f0f0f0",
        userSelect: "none",
        fontWeight: 500,
      }}
      dragConstraints={{ top: 0, bottom: 120 }}
      onDragStart={() => setIsDragging(true)}
      onDrag={(e: any, info: any) => {
        setHasDraggedEnough(info.offset.y > threshold);
      }}
      onDragEnd={handleDragEnd}
      whileTap={{ scale: 0.95 }}
    >
      {statusText}
    </motion.div>
  );
};

export default ArchLoadmore;

"use client";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { UseFormSetValue } from "react-hook-form";
import { FaImage } from "react-icons/fa6";

import Image from "next/image";

type ImageProp = {
  header: string;
  setValue: UseFormSetValue<Record<string, any>>;
};
const ArchImageSelect = ({ setValue, header }: ImageProp) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: any) => {
      if (acceptedFiles && acceptedFiles[0]) {
        const file = acceptedFiles[0];
        setSelectedImage(file);
        // Set the File object in React Hook Form
        setValue("newsImage", file);
      }
    },
    [setValue]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "image/*": [".jpeg", ".png", ".gif", ".bmp", ".webp"],
    },
    onDrop,
  });

  return (
    <div className="arch_dnd">
      <p>* Choose a cover image</p>
      <div {...getRootProps()} className="arch_dndbrowse">
        <input {...getInputProps()} />
        {selectedImage ? (
          <Image
            src={selectedImage}
            alt="Selected Cover"
            width={100}
            height={100}
          />
        ) : (
          <>
            <FaImage />
            <p>{header}</p>
            <p>or</p>
            <label>browse files</label>
            <p>supported formats jpg, png</p>
          </>
        )}
      </div>
    </div>
  );
};

export default ArchImageSelect;

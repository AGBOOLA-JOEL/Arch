"use client";
import Image from "next/image";
import { useRef, useState } from "react";
import { FaImage } from "react-icons/fa6";

type ArchDndProp = {
  header: string;
  setValue: any;
};

const ArchDnd = ({ header, setValue }: ArchDndProp) => {
  const onDndChange = (selectedImage: any) => {
    setValue("newsImage", selectedImage);
    // Add the selected image to FormData
  };
  const [selectedImage, setSelectedImage] = useState(null);
  const dropBoxRef = useRef<HTMLInputElement>(null);

  const handleDrop = (e: any) => {
    e.preventDefault();

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const imageFile = files[0];
      handleImageSelect(imageFile);
    }
  };

  const handleImageSelect = (file: any) => {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const imageDataUrl = e.target.result;
      setSelectedImage(imageDataUrl);
      onDndChange(file);
    };
    reader.readAsDataURL(file);
  };

  const handleClick = () => {
    // Trigger file input click when the box is clicked
    if (dropBoxRef.current) {
      dropBoxRef.current.click();
    }
  };

  const handleFileInputChange = (e: any) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      handleImageSelect(selectedFile);
    }
  };

  const handleDragOver = (e: any) => {
    e.preventDefault();
  };

  const handleDragEnter = (e: any) => {
    e.preventDefault();
  };

  const handleDragLeave = (e: any) => {
    e.preventDefault();
  };

  return (
    <div className="arch_dnd">
      <div
        className="arch_dndbrowse"
        onClick={handleClick}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
      >
        {selectedImage ? (
          <Image src={selectedImage} alt="Selected" width={100} height={100} />
        ) : (
          <>
            {" "}
            <FaImage />
            <p>{header}</p>
            <p>or</p>
            <label>browse files</label>
            <p>supported formats jpg, png</p>
          </>
        )}

        <input
          type="file"
          ref={dropBoxRef}
          style={{ display: "none" }}
          onChange={handleFileInputChange}
        />
      </div>
    </div>
  );
};

export default ArchDnd;

"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { CiTrash } from "react-icons/ci";

interface DriveImage {
  id: string;
  name: string;
  thumbnailLink: string;
  tag: string;
}

interface Folder {
  name: string;
  images: DriveImage[];
}

const tagToFieldMap: Record<string, string> = {
  "3d": "threeDImages",
  siteplan: "sitePlan",
  floorplan: "floorPlan",
  elevations: "elevations",
  sections: "sections",
  details: "details",
  others: "otherImages",
};

const DashUploadDrive = ({ setValue, id }: { setValue: any; id: string }) => {
  const [folders, setFolders] = useState<Folder[]>([]);

  const extractGoogleDriveFolderId = (url: string) => {
    const regex =
      /https:\/\/drive\.google\.com\/drive\/folders\/([a-zA-Z0-9_-]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const API_KEY = process.env.NEXT_PUBLIC_UPLOAD_API_KEY;
  const FOLDER_ID = extractGoogleDriveFolderId(id);

  useEffect(() => {
    const loadGapi = async () => {
      const gapiScript = await import("gapi-script");

      gapiScript.gapi.load("client", () => {
        gapiScript.gapi.client
          .init({
            apiKey: API_KEY,
            discoveryDocs: [
              "https://www.googleapis.com/discovery/v1/apis/drive/v3/rest",
            ],
          })
          .then(() => listFolders(gapiScript.gapi))
          .catch((error: any) => console.error("GAPI init error:", error));
      });
    };

    if (typeof window !== "undefined" && FOLDER_ID) {
      loadGapi();
    }
  }, [FOLDER_ID]);

  const listFolders = async (gapi: any) => {
    try {
      const response = await gapi.client.drive.files.list({
        q: `'${FOLDER_ID}' in parents and mimeType = 'application/vnd.google-apps.folder'`,
        fields: "files(id, name)",
      });

      const folders = response.result.files;

      const folderDataPromises = folders.map(async (folder: any) => {
        const imagesResponse = await gapi.client.drive.files.list({
          q: `'${folder.id}' in parents and mimeType contains 'image/'`,
          fields: "files(id, name, thumbnailLink)",
        });

        return {
          name: folder.name,
          images: imagesResponse.result.files.map((image: any) => ({
            ...image,
            tag: folder.name,
          })),
        };
      });

      const folderData = await Promise.all(folderDataPromises);
      setFolders(folderData);

      folderData.forEach((folder) => {
        const tagKey = folder.name.toLowerCase().replace(/\s/g, "");
        const formField = tagToFieldMap[tagKey];
        if (formField) {
          const thumbnails = folder.images.map((img: any) => ({
            id: img.id,
            name: img.name,
            thumbnailLink: img.thumbnailLink,
          }));
          setValue(formField, thumbnails);
        }
      });
    } catch (error) {
      console.error("Error listing folders:", error);
    }
  };

  const handleDelete = (folderIndex: number, imageId: string) => {
    const updatedFolders = folders.map((folder, index) => {
      if (index === folderIndex) {
        return {
          ...folder,
          images: folder.images.filter((image) => image.id !== imageId),
        };
      }
      return folder;
    });
    console.log(updatedFolders);
    setFolders(updatedFolders);

    const folder = folders[folderIndex];
    const tagKey = folder.name.toLowerCase().replace(/\s/g, "");
    const formField = tagToFieldMap[tagKey];

    if (formField) {
      const updatedImages = folder.images
        .filter((image) => image.id !== imageId)
        .map((img) => ({
          id: img.id,
          name: img.name,
          thumbnailLink: img.thumbnailLink,
        }));

      setValue(formField, updatedImages);
    }
  };

  return (
    <div className="dash_uploaddrive">
      <div className="dash_uploaddrive__header">
        <h1 className="dash_uploaddrive__title">Google Drive Folder</h1>
        <p className="dash_uploaddrive__folder-id">{id}</p>
      </div>

      {folders.length === 0 ? (
        <div className="dash_uploaddrive__empty">
          <p>No folders found or loading...</p>
        </div>
      ) : (
        <div className="dash_uploaddrive__folders">
          {folders.map((folder, folderIndex) => (
            <div key={folderIndex} className="dash_uploaddrive__folder">
              <h3 className="dash_uploaddrive__folder-name">{folder.name}</h3>

              {folder.images.length === 0 ? (
                <p className="dash_uploaddrive__no-images">
                  No images in this folder
                </p>
              ) : (
                <div className="dash_uploaddrive__image-grid">
                  {folder.images.map((image) => (
                    <div
                      key={image.id}
                      className="dash_uploaddrive__image-container"
                    >
                      <div className="dash_uploaddrive__image-wrapper">
                        <Image
                          src={
                            image.thumbnailLink || "/assets/images/noimage.png"
                          }
                          alt={image.name}
                          width={0}
                          height={0}
                          sizes="100vw"
                          className="dash_uploaddrive__image"
                        />
                        <div className="dash_uploaddrive__image-overlay">
                          <CiTrash
                            className="dash_uploaddrive__delete-icon"
                            onClick={() => handleDelete(folderIndex, image.id)}
                          />
                        </div>
                      </div>
                      <p className="dash_uploaddrive__image-name">
                        {image.name}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DashUploadDrive;

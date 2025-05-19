// "use client";

// import React, { useState, useEffect } from "react";
// import Image from "next/image";
// import { CiTrash } from "react-icons/ci";

// interface Image {
//   id: string;
//   name: string;
//   thumbnailLink: string;
//   tag: string;
// }

// interface Folder {
//   name: string;
//   images: Image[];
// }

// const DashUploadDrive = ({
//   setApiFolders,
//   id,
// }: {
//   setApiFolders: React.Dispatch<React.SetStateAction<any[]>>;
//   id: string;
// }) => {
//   const [folders, setFolders] = useState<Folder[]>([]);

//   const extractGoogleDriveFolderId = (url: string) => {
//     const regex =
//       /https:\/\/drive\.google\.com\/drive\/folders\/([a-zA-Z0-9_-]+)/;
//     const match = url.match(regex);
//     return match ? match[1] : null;
//   };

//   const API_KEY = process.env.NEXT_PUBLIC_UPLOAD_API_KEY;
//   const FOLDER_ID = extractGoogleDriveFolderId(id);

//   useEffect(() => {
//     const loadGapi = async () => {
//       const gapiScript = await import("gapi-script");

//       gapiScript.gapi.load("client", () => {
//         gapiScript.gapi.client
//           .init({
//             apiKey: API_KEY,
//             discoveryDocs: [
//               "https://www.googleapis.com/discovery/v1/apis/drive/v3/rest",
//             ],
//           })
//           .then(() => listFolders(gapiScript.gapi))
//           .catch((error: any) => console.error("GAPI init error:", error));
//       });
//     };

//     if (typeof window !== "undefined" && FOLDER_ID) {
//       loadGapi();
//     }
//   }, [FOLDER_ID]);

//   const listFolders = async (gapi: any) => {
//     try {
//       const response = await gapi.client.drive.files.list({
//         q: `'${FOLDER_ID}' in parents and mimeType = 'application/vnd.google-apps.folder'`,
//         fields: "files(id, name)",
//       });

//       const folders = response.result.files;
//       const folderDataPromises = folders.map(async (folder: any) => {
//         const imagesResponse = await gapi.client.drive.files.list({
//           q: `'${folder.id}' in parents and mimeType contains 'image/'`,
//           fields: "files(id, name, thumbnailLink)",
//         });

//         return {
//           name: folder.name,
//           images: imagesResponse.result.files.map((image: any) => ({
//             ...image,
//             tag: folder.name,
//           })),
//         };
//       });

//       const folderData = await Promise.all(folderDataPromises);
//       setFolders(folderData);
//       setApiFolders(folderData);
//     } catch (error) {
//       console.error("Error listing folders:", error);
//     }
//   };

//   const handleDelete = (folderIndex: number, imageId: string) => {
//     const updatedFolders = folders.map((folder, index) => {
//       if (index === folderIndex) {
//         return {
//           ...folder,
//           images: folder.images.filter((image) => image.id !== imageId),
//         };
//       }
//       return folder;
//     });
//     setFolders(updatedFolders);
//     setApiFolders(updatedFolders);
//   };

//   return (
//     <div>
//       <h1>{id}</h1>
//       {folders.map((folder, folderIndex) => (
//         <div key={folderIndex}>
//           <h3>{folder.name}</h3>
//           <div>
//             {folder.images.map((image) => (
//               <div key={image.id}>
//                 <Image
//                   src={image.thumbnailLink || "/assets/images/noimage.png"}
//                   alt="google drive image"
//                   width={100}
//                   height={100}
//                   sizes="100vw"
//                 />
//                 <div>
//                   <CiTrash
//                     onClick={() => handleDelete(folderIndex, image.id)}
//                   />
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default DashUploadDrive;
"use client";

import type React from "react";
import { useState, useEffect } from "react";
import NextImage from "next/image";
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

const DashUploadDrive = ({
  setApiFolders,
  id,
}: {
  setApiFolders: React.Dispatch<React.SetStateAction<any[]>>;
  id: string;
}) => {
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
      setApiFolders(folderData);
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
    setFolders(updatedFolders);
    setApiFolders(updatedFolders);
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
                        <NextImage
                          src={
                            image.thumbnailLink || "/assets/images/noimage.png"
                          }
                          alt={image.name}
                          width={100}
                          height={100}
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

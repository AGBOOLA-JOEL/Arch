// "use client";
// import { useState } from "react";
// import ArchDnd from "../general/ArchDnd";

// const DashUploadDnd = ({ setValue }: { setValue: any }) => {
//   const TOTAL_INSTANCES = 24;

//   const [images, setImages] = useState<Record<string, File[]>>({});

//   // Fieldnames used by React Hook Form
//   const fieldMap = [
//     { range: [1, 10], field: "threeDImages", label: "3D images" },
//     { range: [11], field: "sitePlan", label: "Site plan" },
//     { range: [12, 16], field: "floorPlan", label: "Floor plans" },
//     { range: [17, 20], field: "elevations", label: "Elevations" },
//     { range: [21, 22], field: "sections", label: "Sections" },
//     { range: [23], field: "details", label: "Details" },
//     { range: [24], field: "otherImages", label: "Others" },
//   ];

//   const getFieldInfoByIndex = (index: number) => {
//     for (const group of fieldMap) {
//       const [start, end] =
//         group.range.length === 2
//           ? group.range
//           : [group.range[0], group.range[0]];
//       if (index >= start && index <= end)
//         return { fieldname: group.field, label: group.label };
//     }
//     return { fieldname: "otherImages", label: "Others" };
//   };

//   const handleImageChange = (fieldname: string, file: File) => {
//     setImages((prev) => {
//       const updated = { ...prev };
//       const current = prev[fieldname] || [];
//       updated[fieldname] = [...current, file];
//       return updated;
//     });

//     const updatedField = [...(images[fieldname] || []), file];
//     setValue(fieldname, updatedField);
//   };

//   return (
//     <div>
//       {/* Cover image */}

//       <h1>Select images from device</h1>
//       <ArchDnd
//         header="Drop your Cover image here"
//         fieldname="coverImage"
//         setValue={(fieldname: string, file: File) => setValue(fieldname, file)}
//       />

//       {/* 24 Drop Areas */}
//       <div>
//         {Array.from({ length: TOTAL_INSTANCES }, (_, i) => {
//           const index = i + 1;
//           const { fieldname, label } = getFieldInfoByIndex(index);
//           const numberedLabel = `${label} ${index}`;

//           return (
//             <ArchDnd
//               key={index}
//               header={numberedLabel}
//               fieldname={fieldname}
//               setValue={(fieldname: string, file: File) =>
//                 handleImageChange(fieldname, file)
//               }
//             />
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default DashUploadDnd;
"use client";
import { useState } from "react";
import ArchDnd from "../general/ArchDnd";

const DashUploadDnd = ({ setValue }: { setValue: any }) => {
  const TOTAL_INSTANCES = 24;

  const [images, setImages] = useState<Record<string, File[]>>({});

  // Fieldnames used by React Hook Form
  const fieldMap = [
    { range: [1, 10], field: "threeDImages", label: "3D images" },
    { range: [11], field: "sitePlan", label: "Site plan" },
    { range: [12, 16], field: "floorPlan", label: "Floor plans" },
    { range: [17, 20], field: "elevations", label: "Elevations" },
    { range: [21, 22], field: "sections", label: "Sections" },
    { range: [23], field: "details", label: "Details" },
    { range: [24], field: "otherImages", label: "Others" },
  ];

  const getFieldInfoByIndex = (index: number) => {
    for (const group of fieldMap) {
      const [start, end] =
        group.range.length === 2
          ? group.range
          : [group.range[0], group.range[0]];
      if (index >= start && index <= end)
        return { fieldname: group.field, label: group.label };
    }
    return { fieldname: "otherImages", label: "Others" };
  };

  const handleImageChange = (fieldname: string, file: File) => {
    setImages((prev) => {
      const updated = { ...prev };
      const current = prev[fieldname] || [];
      updated[fieldname] = [...current, file];
      return updated;
    });

    const updatedField = [...(images[fieldname] || []), file];
    setValue(fieldname, updatedField);
  };

  return (
    <div className="dash_uploaddnd">
      <h1 className="dash_uploaddnd__title">Select images from device</h1>

      <div className="dash_uploaddnd__cover">
        <ArchDnd
          header="Drop your Cover image here"
          fieldname="coverImage"
          setValue={(fieldname: string, file: File) =>
            setValue(fieldname, file)
          }
        />
      </div>

      <div className="dash_uploaddnd__grid">
        {Array.from({ length: TOTAL_INSTANCES }, (_, i) => {
          const index = i + 1;
          const { fieldname, label } = getFieldInfoByIndex(index);
          const numberedLabel = `${label} ${index}`;

          return (
            <div
              key={index}
              className={`dash_uploaddnd__item dash_uploaddnd__item--${fieldname}`}
            >
              <ArchDnd
                header={numberedLabel}
                fieldname={fieldname}
                setValue={(fieldname: string, file: File) =>
                  handleImageChange(fieldname, file)
                }
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DashUploadDnd;

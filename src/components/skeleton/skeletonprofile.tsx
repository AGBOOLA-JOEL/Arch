import React from "react";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

const SkeletonProfile = () => {
  return (
    <Stack spacing={0.5}>
      <Skeleton
        variant="circular"
        width={170}
        height={170}
        style={{ marginBottom: "30px" }}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "33px",
          marginBottom: "10px",
        }}
      >
        <Skeleton variant="rounded" width={270} height={21} />
        <Skeleton variant="rounded" width={270} height={21} />
        <Skeleton variant="rounded" width={270} height={21} />
        <Skeleton variant="rounded" width={270} height={21} />
      </div>
    </Stack>
  );
};

export default SkeletonProfile;

import React from "react";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

const Skeletonside = () => {
  return (
    <Stack spacing={0.5} className="skeleton_side">
      <Skeleton
        className="skeleton_siderect"
        variant="rectangular"
        animation="wave"
      />
    </Stack>
  );
};

export default Skeletonside;

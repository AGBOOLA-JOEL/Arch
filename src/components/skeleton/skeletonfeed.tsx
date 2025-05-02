import React from "react";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

const SkeletonFeed = () => {
  return (
    <>
      {" "}
      <Stack spacing={0.5}>
        <Skeleton variant="rectangular" width={257} height={235} />
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "3px",
            marginBottom: "10px",
          }}
        >
          <Skeleton variant="rectangular" width={49} height={51} />
          <Skeleton variant="rectangular" width={49} height={51} />
          <Skeleton variant="rectangular" width={49} height={51} />
          <Skeleton variant="rectangular" width={49} height={51} />
          <Skeleton variant="rectangular" width={49} height={51} />
        </div>
        {/* For variant="text", adjust the height via font-size */}
        <Skeleton variant="text" sx={{ fontSize: "0.5rem" }} width={150} />
        <Skeleton variant="text" sx={{ fontSize: "0.5rem" }} width={190} />
        <Skeleton variant="text" sx={{ fontSize: "0.5rem" }} width={150} />
        <Skeleton variant="text" sx={{ fontSize: "0.5rem" }} width={120} />

        {/* For other variants, adjust the size with `width` and `height` */}
        {/* <Skeleton variant="circular" width={40} height={40} /> */}

        <Skeleton
          variant="rounded"
          width={150}
          height={36}
          style={{ marginTop: "10px" }}
        />
      </Stack>{" "}
      <Stack spacing={0.5}>
        <Skeleton variant="rectangular" width={257} height={235} />
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "3px",
            marginBottom: "10px",
          }}
        >
          <Skeleton variant="rectangular" width={49} height={51} />
          <Skeleton variant="rectangular" width={49} height={51} />
          <Skeleton variant="rectangular" width={49} height={51} />
          <Skeleton variant="rectangular" width={49} height={51} />
          <Skeleton variant="rectangular" width={49} height={51} />
        </div>
        {/* For variant="text", adjust the height via font-size */}
        <Skeleton variant="text" sx={{ fontSize: "0.5rem" }} width={150} />
        <Skeleton variant="text" sx={{ fontSize: "0.5rem" }} width={190} />
        <Skeleton variant="text" sx={{ fontSize: "0.5rem" }} width={150} />
        <Skeleton variant="text" sx={{ fontSize: "0.5rem" }} width={120} />

        {/* For other variants, adjust the size with `width` and `height` */}
        {/* <Skeleton variant="circular" width={40} height={40} /> */}

        <Skeleton
          variant="rounded"
          width={150}
          height={36}
          style={{ marginTop: "10px" }}
        />
      </Stack>{" "}
      <Stack spacing={0.5}>
        <Skeleton variant="rectangular" width={257} height={235} />
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "3px",
            marginBottom: "10px",
          }}
        >
          <Skeleton variant="rectangular" width={49} height={51} />
          <Skeleton variant="rectangular" width={49} height={51} />
          <Skeleton variant="rectangular" width={49} height={51} />
          <Skeleton variant="rectangular" width={49} height={51} />
          <Skeleton variant="rectangular" width={49} height={51} />
        </div>
        {/* For variant="text", adjust the height via font-size */}
        <Skeleton variant="text" sx={{ fontSize: "0.5rem" }} width={150} />
        <Skeleton variant="text" sx={{ fontSize: "0.5rem" }} width={190} />
        <Skeleton variant="text" sx={{ fontSize: "0.5rem" }} width={150} />
        <Skeleton variant="text" sx={{ fontSize: "0.5rem" }} width={120} />

        {/* For other variants, adjust the size with `width` and `height` */}
        {/* <Skeleton variant="circular" width={40} height={40} /> */}

        <Skeleton
          variant="rounded"
          width={150}
          height={36}
          style={{ marginTop: "10px" }}
        />
      </Stack>{" "}
    </>
  );
};

export default SkeletonFeed;

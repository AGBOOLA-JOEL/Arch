"use client";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

const ProjectGallery = () => {
  return (
    <ImageGallery
      items={[]}
      // items={
      //   // Map over the rest of the images starting from index 1
      //   singleData.images.map((sub) => ({
      //     original: sub.imageUrl,

      //     thumbnail: sub.imageUrl,
      //     thumbnailHeight: "70px",
      //     thumbnailWidth: "140px",
      //     loading: "eager",
      //     originalAlt: "loading",
      //   }))
      // }
      // showNav={plan === "PREMIUM"}
      thumbnailPosition={"bottom"}
      showPlayButton={false}
      // onErrorImageURL={ }
      disableThumbnailScroll={true}
      slideOnThumbnailOver={true}
    />
  );
};

export default ProjectGallery;

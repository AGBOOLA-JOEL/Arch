// import UploadIcon from "assets/svg/UploadIcon";
// import { mainContext } from "pages/hooks/Context";
// import { useContext, useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";

import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Link from "next/link";
import ArchArrow from "../../general/ArchArrow";
import Skeletonside from "../../skeleton/skeletonside";

const ComicSide = () => {
  // const { comicSlice } = useContext(mainContext);
  // const data = comicSlice;

  // const [apiData, setApiData] = useState([]);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       // Replace 'your-api-endpoint' with the actual endpoint you want to call
  //       const response = await axios.get(
  //         `${process.env.REACT_APP_CACHE_URL}/comic/all-comic`
  //       );
  //       setApiData(response.data);
  //       // setApiData((prevData) => [...prevData, ...response.data]);
  //       console.log("API Response:", response.data);
  //       // console.log(apiData + " apidata");
  //     } catch (error) {
  //       // Handle errors
  //       console.error("API Error:", error);
  //     }
  //   };

  //   // Call the fetchData function when the component mounts
  //   fetchData();
  // }, []);

  // const singleComic = apiData;
  // const formatCalendarDate = (dateString) => {
  //   const options = {
  //     weekday: "long",
  //     year: "numeric",
  //     month: "long",
  //     day: "numeric",
  //   };

  //   const formattedDate = new Date(dateString);
  //   return new Intl.DateTimeFormat("en-US", options).format(formattedDate);
  // };
  return (
    <div className="comicside">
      <div className="comicside_head">
        <p>comic</p>
      </div>

      {/* {singleComic.length > 0 ? (
        singleComic.slice(0, 1).map((singleData) => {
          return (
            <div key={singleData.comicId} className="comicside_info">
              <div className="comicside_image">
                <img src={singleData.image} alt="" />
              </div>

              <div className="comicside_text">
                <p>{singleData.title}</p>
                <p>
                  By {singleData.user.username} on{" "}
                  {formatCalendarDate(singleData.date)}
                </p>
              </div>
            </div>
          );
        })
      ) : ( */}
      <div className="comicside_skel">
        <Skeletonside />
      </div>

      {/* )} */}

      <div className="comicside_link">
        <ArchArrow text="See more" route="/all/comic" />
      </div>
    </div>
  );
};

export default ComicSide;

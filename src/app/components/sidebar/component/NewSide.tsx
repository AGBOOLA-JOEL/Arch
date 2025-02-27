import { FaArrowRight } from "react-icons/fa";

import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Link from "next/link";
import ArchArrow from "../../general/ArchArrow";

const NewSide = () => {
  // const [apiData, setApiData] = useState([]);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get(
  //         `${process.env.REACT_APP_CACHE_URL}/news/public/all`
  //       );
  //       setApiData(response.data.data.newsArray);
  //       console.log("single API Response:", response.data);
  //     } catch (error) {
  //       console.error(error.message);
  //     }
  //   };
  //   fetchData();
  // }, []);

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
    <div className="newside">
      <div className="newside_head">
        <p>top news</p>
      </div>
      {/* {apiData.length > 0 ? (
        apiData.slice(0, 2).map((singleData) => {
          return (
            <div key={singleData.postId} className="newside_Info">
              <div className="newside_image">
                <img src={singleData.image} alt="" />
              </div>

              <div className="newside_text">
                <p>{singleData.title}</p>
                <p>{singleData.desc}</p>
                <p>
                  {" "}
                  By {singleData.user.username} on{" "}
                  {formatCalendarDate(singleData.date)}{" "}
                </p>
              </div>
            </div>
          );
        })
      ) : ( */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Stack spacing={0.5}>
          <Skeleton
            variant="rectangular"
            width={400}
            height={235}
            animation="wave"
          />
        </Stack>
      </div>
      <div className="newside_link">
        <ArchArrow text="See more" route="/all/news" />
      </div>

      {/* <Link
        href="/all/news"
        style={{ textDecoration: "none", listStyleType: "none" }}
      >
        <div className="newside_link">
          <p>See more</p>
          <FaArrowRight />
        </div>
      </Link> */}
    </div>
  );
};

export default NewSide;

import Skeleton from "@mui/material/Skeleton";
import ArchArrow from "../../general/ArchArrow";
import Skeletonside from "../../skeleton/skeletonside";
import { fullFormatDate } from "@/_utils/formatdate";
import Image from "next/image";

const NewSide = ({ news }: { news: any }) => {
  const apiData = news;

  return (
    <div className="newside">
      <div className="newside_head">
        <p>top news</p>
      </div>
      {apiData?.length > 0 ? (
        apiData.slice(0, 2).map((singleData: any) => {
          const formattedDate = fullFormatDate(singleData?.date);
          return (
            <div key={singleData?.postId} className="newside_info">
              <div className="newside_image">
                <Image
                  priority
                  src={singleData?.image || "/assets/images/noimage.png"}
                  width={0}
                  height={0}
                  alt="feed image"
                  sizes="100vw"
                />
              </div>

              <div className="newside_text">
                <p>{singleData?.title}</p>
                <p>{singleData?.desc}</p>
                <p>
                  {" "}
                  By {singleData?.user?.username} on {formattedDate}{" "}
                </p>
              </div>
            </div>
          );
        })
      ) : (
        <div className="newside_skel">
          <Skeletonside />
        </div>
      )}

      <div className="newside_link">
        <ArchArrow text="See more" route="/news" />
      </div>
    </div>
  );
};

export default NewSide;

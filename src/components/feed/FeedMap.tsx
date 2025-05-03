import Image from "next/image";
import ArchArrow from "../general/ArchArrow";
import { formatTime, fullFormatDate } from "@/_utils/formatdate";

const FeedMap = ({ data }: { data: any }) => {
  return (
    <div className="feed_map">
      <div className="feed_mapdata">
        <div className="feed_mapimg">
          <Image
            priority
            src={data?.image || "/assets/images/noimage.png"}
            alt={"project-coverimage"}
            width={0}
            height={0}
            sizes={"100vw"}
            unoptimized
          />
        </div>
        <div className="feed_mapinfo">
          <p className="feed_mapdate">
            {" "}
            Posted on {fullFormatDate(data?.date)} at {formatTime(data?.date)}
          </p>
          <p className="feed_maptitle">{data?.title}</p>
          <p className="feed_mapdesc">{data?.desc}</p>
          <div className="feed_maparrow">
            <ArchArrow text="Read more" route={`/news/${data?.postId}`} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedMap;

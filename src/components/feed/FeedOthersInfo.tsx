import { formatDate } from "@/_utils/formatdate";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const FeedOthersInfo = ({ data }: { data: any }) => {
  const formattedDate = formatDate(data?.date);
  return (
    <div className="feed_othersinfo">
      <Link href={`/${"news"}/${data?.postId}`}>
        <div className="feed_othersimage">
          <Image
            src={data?.image || "/assets/images/noimage.png"}
            width={0}
            height={0}
            alt="feed image"
            sizes="100vw"
          />
        </div>

        <div className="feed_otherstext">
          <p>{data?.title}</p>
          <p>
            By {data?.user?.username} on {formattedDate}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default FeedOthersInfo;

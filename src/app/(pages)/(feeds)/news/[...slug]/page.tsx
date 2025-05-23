"use client";
import React from "react";
import "react-quill-new/dist/quill.snow.css";
import { useNews, useNewsById } from "@/_hooks/useNews";
import { useUser } from "@/_hooks/useUser";
import FeedOthers from "@/components/feed/FeedOthers";
import { useParams } from "next/navigation";
import dynamic from "next/dynamic";
import { formatTime, fullFormatDate } from "@/_utils/formatdate";
import Image from "next/image";
import useModalStore from "@/_lib/store/modal-store";
import SkeletonFeed from "@/components/skeleton/skeletonfeed";

const Page = () => {
  const params = useParams();
  const { news } = useNews();
  const { user } = useUser();
  const { openModal, closeModal } = useModalStore();
  const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });
  const id = (params?.slug as string[])?.[0];
  const { newsid, isLoading, isError } = useNewsById(id);
  const name = "News";

  const offmodules = {
    toolbar: false,
  };

  const quillState = React.useMemo(() => {
    try {
      return JSON.parse(newsid?.body || "{}");
    } catch (error) {
      return "";
    }
  }, [newsid?.body]);

  return (
    <>
      {!isLoading ? (
        <div className="feed_single" key={newsid?.postId}>
          <div className="feed_singlemap">
            <div className="feed_singlehead">
              <p>
                Posted by {newsid?.user?.username} on{" "}
                {fullFormatDate(newsid?.date)} at {formatTime(newsid?.date)}
              </p>
              <p>{newsid?.title}</p>
            </div>
            <div className="feed_singleimg">
              <Image
                priority
                src={newsid?.image || "/assets/images/noimage.png"}
                alt={"project-coverimage"}
                width={0}
                height={0}
                sizes={"100vw"}
                unoptimized
              />
            </div>

            {newsid?.body && (
              <div className="feed_singledesc">
                <ReactQuill
                  theme="snow"
                  value={quillState}
                  readOnly
                  modules={offmodules}
                />
              </div>
            )}

            <div className="feed_singleauthor">
              {/* <p>By {newsid?.user?.username}</p> */}
              <button
                className="feed_singlereport"
                onClick={() => {
                  openModal("report");
                }}
              >
                Report
              </button>
            </div>
          </div>
          <div className="feed_singleothers">
            <FeedOthers name={name} data={news} />
          </div>
        </div>
      ) : (
        <div className="feed_singleskeleton">
          <SkeletonFeed />
        </div>
      )}
    </>
  );
};

export default Page;

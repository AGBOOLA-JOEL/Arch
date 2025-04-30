import React from "react";
import { AiOutlineClose } from "react-icons/ai";

const FeedArea = () => {
  return (
    <div className="feed_area">
      <div className="feed_areainput">
        <input type="number" placeholder="Area in m2" onChange={(e) => {}} />

        <button className="feed_areaapply" onClick={() => {}}>
          Apply
        </button>
      </div>
    </div>
  );
};

export default FeedArea;

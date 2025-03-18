// import ReactQuill from "react-quill";

import FeedOthers from "@/components/feed/FeedOthers";

// const page = async ({ params }: { params: Promise<{ newsid: string }> }) => {
//   const newsid = (await params).newsid;
//   const offmodules = {
//     toolbar: false,
//   };
//   const quillState = JSON.parse("body");
//   return (
//     <div className="feed_single">
//       <div className="feed_singlemap">
//         <div className="feed_singlehead">
//           <p>Posted by joel on 2-2-2024 at 5:08am</p>
//           <p>Why you should not buy a house in Nigeria</p>
//         </div>
//         <div className="feed_singleimg">
//           {/* <Image src="" width={0} height={0} alt="feed image" sizes="100vw" /> */}
//         </div>

//         <div className="feed_singledesc">
//           <ReactQuill
//             theme="snow"
//             value={quillState}
//             readOnly
//             modules={offmodules}
//           />
//         </div>

//         <div className="feed_singleauthor">
//           <p>By Archcache</p>
//         </div>

//         <button className="feed_singlereport">Report</button>
//       </div>
//       <div className="feed_singleothers"></div>
//     </div>
//   );
// };

// export default page;

// import ArchQuill from "@/components/general/ArchQuill";

const page = async ({ params }: { params: Promise<{ newsid: string }> }) => {
  const { newsid } = await params;
  const quillState = "<p>Body content goes here...</p>"; // Replace with actual content

  const name = "News";
  return (
    <div className="feed_single">
      <div className="feed_singlemap">
        <div className="feed_singlehead">
          <p>Posted by Joel on 2-2-2024 at 5:08am</p>
          <p>Why you should not buy a house in Nigeria</p>
        </div>
        <div className="feed_singleimg">
          {/* <Image src="" width={0} height={0} alt="feed image" sizes="100vw" /> */}
        </div>

        <div className="feed_singledesc">
          {/* <ArchQuill value={quillState} /> */}
        </div>

        <div className="feed_singleauthor">
          <p>By Archcache</p>
          <button className="feed_singlereport">Report</button>
        </div>
      </div>
      <div className="feed_singleothers">
        <FeedOthers name={name} />
      </div>
    </div>
  );
};

export default page;

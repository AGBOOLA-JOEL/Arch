// import ReactQuill from "react-quill";

const page = async ({ params }: { params: Promise<{ newsid: string }> }) => {
  const newsid = (await params).newsid;

  return (
    <div className="feed_single">
      <div className="feed_singlemap">
        <div className="feed_singlehead">
          <p>Posted by joel on 2-2-2024 at 5:08am</p>
          <p>Why you should not buy a house in Nigeria</p>
        </div>
        <div className="feed_singleimg">
          {/* <Image src="" width={0} height={0} alt="feed image" sizes="100vw" /> */}
        </div>

        <div className="feed_singledesc">
          {/* <ReactQuill
            theme="snow"
            value={quillState}
            readOnly
            modules={offmodules}
          /> */}
        </div>

        <div className="feed_singleauthor">
          <p>By Archcache</p>
        </div>

        <button>report</button>
      </div>
      <div className="feed_singleothers"></div>
    </div>
  );
};

export default page;

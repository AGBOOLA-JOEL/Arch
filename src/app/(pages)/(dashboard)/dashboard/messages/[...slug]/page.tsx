import ArchBack from "@/components/general/ArchBack";

const Page = async ({ params }: { params: Promise<{ slug: string[] }> }) => {
  const { slug } = await params;

  return (
    <div className="dash_view">
      {/* slug 1 {slug[0]}
      slug 2{slug[1]} */}
      <h1 className="dash_viewhead">
        <span>From: msgData.sender.username</span>
        <span>Date: Date</span>
      </h1>
      <div className="dash_viewcontent">
        <h2 className="dash_viewsubject">msgData.subject</h2>
        <p>
          Congratulations! Your project New contact project has been approved.
          It is now live on our website
        </p>
      </div>
      <div className="dash_viewbtn">
        <ArchBack variant="primary" />
      </div>
    </div>
  );
};

export default Page;

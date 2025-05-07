import ArchDnd from "@/components/general/ArchDnd";
import ArchPortDnd from "@/components/general/ArchPortdnd";

const Page = () => {
  return (
    <div className="dash_portfolio">
      <i className="dash_porttitle">Upload your portfolio image below:</i>
      <div className="dash_portcoverimg">
        <ArchDnd header={"Drop your image here"} />
      </div>

      <ArchPortDnd />

      <button className="dash_portbtn" disabled={true}>
        Submit
      </button>
    </div>
  );
};

export default Page;

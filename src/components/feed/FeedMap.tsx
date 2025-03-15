import Image from "next/image";
import ArchArrow from "../general/ArchArrow";

const FeedMap = () => {
  return (
    <div className="feed_map">
      {/* {comp.length > 0 ? (
        comp.map((singleData) => { */}
      {/* return ( */}
      <div className="feed_mapdata">
        <div className="feed_mapimg">
          {/* <Image src="" width={0} height={0} alt="feed image" sizes="100vw" /> */}
          {/* <img src={singleData.image} alt={"loading...."} /> */}
        </div>
        <div className="feed_mapinfo">
          {/* {singleData.user && ( */}
          <p className="feed_mapdate">Posted by Joel on 2-5-2022 at 5.00am</p>
          {/* )} */}
          <p className="feed_maptitle">
            Why you should not buy a house in Nigeria
          </p>
          <p className="feed_mapdesc">
            This is a short description of this product. This is a short
            description of this product. This is a short description of this
            product This is a short description of this product. This isa short
            description of this product.{" "}
          </p>
          {/* <div className="read_more"> */}
          {/* <NavLink
                  to={`/user/${navig}/${singleData.postId}`}
                  className="navigator"
                > */}
          <div className="feed_maparrow">
            <ArchArrow text="Read more" route="/" />
          </div>

          {/* <p> Read more </p> */}

          {/* <CompArrow /> */}
          {/* </NavLink> */}
          {/* </div> */}
        </div>
      </div>

      {/* ); */}
      {/* })
    //   ) : (
    //     <>
    //       <NewLoadingComponent />
    //     </>
    //   )} */}
    </div>
  );
};

export default FeedMap;

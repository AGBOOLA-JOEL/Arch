import ComicSide from "./component/ComicSide";
import GifSide from "./component/GifSide";
import NewSide from "./component/NewSide";

type sideProp = {
  news: any[];
};
const SideBar = ({ news }: sideProp) => {
  // const schBar = "scholarships";
  // const itBar = "it placements";
  // const schnav = "scholarships";
  // const itnav = "placement";
  return (
    <div className="sidebar">
      <GifSide />

      <NewSide news={news} />

      <ComicSide />

      {/* <div>
        <DisplayBar
          header={"show room"}
          img={"../../assets/images/ShowRoom/showPlaceholder.png"}
        />
      </div> */}

      {/* <div>
        <ArchVideo />
      </div> */}

      {/* <div>
        <DisplayBar
          header={"Adverts"}
          img={"../../assets/images/ShowRoom/showPlaceholder.png"}
        />
      </div> */}
      {/* <div>
        <Subscribe />
      </div> */}

      {/* <div>
        <ListingBar head={schBar} nav={schnav} />
      </div>

      <div>
        <ListingBar head={itBar} nav={itnav} />
      </div> */}
    </div>
  );
};

export default SideBar;

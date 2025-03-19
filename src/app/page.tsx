import HomeCarousel from "@/components/carousel/HomeCarousel";
import ArchSideSoon from "@/components/general/ArchSideSoon";
import HomeFeed from "@/components/homepage/HomeFeed";
import HomeProject from "@/components/homepage/HomeProject";
import SideBar from "@/components/sidebar/SideBar";
const Homepage = () => {
  return (
    <div className="home">
      <div className="home_carousel">
        <HomeCarousel
          deskimg={"/assets/images/carousel/homedesktop.png"}
          mobimg={"/assets/images/carousel/homemobile.png"}
        />
      </div>

      <div className="home_info">
        <div className="home_displays">
          <HomeProject header="recent projects" />
          <HomeProject header="top projects" />
          <HomeProject header="other projects" />
          <HomeFeed header="news" />
          <div className="home_soon">
            <ArchSideSoon />
          </div>
        </div>
        <div className="home_sidebar">
          <SideBar />
        </div>
      </div>
    </div>
  );
};

export default Homepage;

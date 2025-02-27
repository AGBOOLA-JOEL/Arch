import HomeCarousel from "./components/carousel/HomeCarousel";
import SideBar from "./components/sidebar/SideBar";
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
        <div className="home_displays">display</div>
        <div className="home_sidebar">
          <SideBar />
        </div>
      </div>
    </div>
  );
};

export default Homepage;

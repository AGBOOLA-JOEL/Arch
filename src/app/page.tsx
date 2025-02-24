import HomeCarousel from "./components/carousel/HomeCarousel";
const Homepage = () => {
  return (
    <div className="home">
      <div className="home_carousel">
        <HomeCarousel
          deskimg={"/assets/images/carousel/homedesktop.png"}
          mobimg={"/assets/images/carousel/homemobile.png"}
        />
      </div>

      <div className="home_info">hhhhhd</div>
    </div>
  );
};

export default Homepage;

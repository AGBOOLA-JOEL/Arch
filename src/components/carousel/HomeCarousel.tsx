"use client";
import { Carousel } from "react-responsive-carousel";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaGithub } from "react-icons/fa";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { homecarousel } from "@/data/carousel.db";
import Image from "next/image";
import { useUser } from "@/_hooks/useUser";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

// // import useRole from "pages/hooks/useRole";

type HomeImgProp = {
  deskimg: string;
  mobimg: string;
};
const HomeCarousel = ({ deskimg, mobimg }: HomeImgProp) => {
  //   const role = useRole();
  const { status } = useSession();
  const { user } = useUser();
  const navigate = useRouter();
  return (
    <div className="home_carousel">
      <div className="homecar_img">
        <Image
          src={deskimg}
          alt=""
          className="homecar_deskimg"
          width={0}
          height={0}
          sizes="100vw"
        />
        <Image
          src={mobimg}
          alt=""
          className="homecar_mobimg"
          sizes="100vw"
          width={0}
          height={0}
        />
      </div>
      <div className="homecar_map">
        <div className="homecar_info">
          <Carousel
            showArrows={false}
            autoPlay={true}
            showStatus={false}
            infiniteLoop={true}
            interval={4000}
            stopOnHover={true}
            showThumbs={false}
            preventMovementUntilSwipeScrollTolerance={true}
            swipeScrollTolerance={50}
          >
            {homecarousel.map((data) => {
              return (
                <div className="homecar_data" key={data.header}>
                  <h1>{data.header}</h1>
                  <p>{data.info}</p>

                  <button
                    onClick={() => {
                      if (status === "authenticated") {
                        navigate.push("/projects");
                      } else {
                        navigate.push("/register");
                      }
                    }}
                  >
                    {status === "authenticated"
                      ? "EXPLORE PROJECTS"
                      : "GET STARTED"}
                  </button>
                </div>
              );
            })}
          </Carousel>
        </div>

        <div className="homecar_media">
          <span>
            <FaFacebookF />
          </span>

          <span>
            <FaTwitter />
          </span>
          <span>
            <FaLinkedinIn />
          </span>
        </div>
      </div>
    </div>
  );
};

export default HomeCarousel;

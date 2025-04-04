"use client";
import { useGenselectors } from "@/_lib/store/general-store";
import useModalStore from "@/_lib/store/modal-store";
import HomeCarousel from "@/components/carousel/HomeCarousel";
import ArchSideSoon from "@/components/general/ArchSideSoon";
import HomeFeed from "@/components/homepage/HomeFeed";
import HomeProject from "@/components/homepage/HomeProject";
import SideBar from "@/components/sidebar/SideBar";
import { api } from "@/services/api";
import { useMutation } from "@tanstack/react-query";

const fetchUserDetails = async () => {
  const { data } = await api.get("/users/details");
  return data;
};
const Homepage = () => {
  const { openModal } = useModalStore();

  const openToast = useGenselectors.use.openToast();

  const userDetailsMutation = useMutation({
    mutationFn: fetchUserDetails,
    onSuccess: (data) => {
      console.log("User API Response:", data.data);
    },
    onError: (error) => {
      console.error("Fetch error:", error.message);
    },
  });

  return (
    <div className="home">
      <div className="home_carousel">
        <HomeCarousel
          deskimg={"/assets/images/carousel/homedesktop.png"}
          mobimg={"/assets/images/carousel/homemobile.png"}
        />
      </div>

      <button onClick={() => openModal("logout")}>Open Modal</button>
      <button
        onClick={() => {
          // const token = localStorage.getItem("accessToken");
          // axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
          userDetailsMutation.mutate();
          // console.log("headers", axios.defaults.headers);
        }}
      >
        fetchUSer
      </button>

      <button
        onClick={() =>
          openToast("sucesssssssssssssssssssssssssssssssssssssssssssss", 5000)
        }
      >
        Open toast
      </button>

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

"use client";
import { useCart } from "@/_hooks/useCart";
import { useUser } from "@/_hooks/useUser";
import { useDownloadTemplate } from "@/_utils/downloadtemplate";
import ArchButton from "@/components/general/ArchButton";
import ArchSpinner from "@/components/general/ArchSpinner";
import Image from "next/image";
import { ImCancelCircle } from "react-icons/im";

const Page = () => {
  const { cart, isLoading, deleteCart } = useCart();
  const { user } = useUser();

  const { download } = useDownloadTemplate({
    filename: "Project Download.zip",
  });
  const handleDownload = (id: any) => {
    download.mutate(`/cart/checkout/project/${id}`);
  };

  const removeCart = (id: any) => {
    deleteCart.mutate(id);
  };
  return (
    <div className="dash_archive">
      <div className="dash_archivehead">
        <p>Project</p>
        <p>Price</p>
      </div>
      {isLoading ? (
        <>
          <ArchSpinner />
        </>
      ) : (
        <>
          {cart?.length > 0 ? (
            <>
              <div className="dash_archiveinfo">
                <div className="dash_archivemap">
                  {cart?.map((data: any) => {
                    return (
                      <div key={data?.itemId}>
                        <div className="dash_archivedetails">
                          <div className="dash_archiveimg">
                            <span
                              onClick={() => {
                                removeCart(data?.itemId);
                              }}
                            >
                              <ImCancelCircle />
                            </span>

                            <Image
                              src={
                                data?.data?.coverImage ||
                                "/assets/images/noimage.png"
                              }
                              alt="cover image"
                              width={0}
                              height={0}
                              sizes="100vw"
                            />
                          </div>
                          <p className="dash_archivetitle">
                            {" "}
                            {data?.data?.projectName || "empty"}
                          </p>

                          <p>
                            {data?.data?.premium ? "Premium" : "free"}
                            {/* {user?.subscription?.premium ? "Premium" : "free"} */}
                          </p>
                        </div>

                        {user?.subscription?.premium && (
                          <div className="dash_archivebtn">
                            <ArchButton
                              name={"Download"}
                              variant="white"
                              type="button"
                              onClick={() => {
                                handleDownload(data?.data?.projectId);
                              }}
                            />
                          </div>
                        )}
                      </div>
                    );
                  })}
                  {!user?.subscription?.premium && (
                    <div className="dash_archivebtn">
                      <ArchButton
                        name="Contact support"
                        type="button"
                        variant="white"
                        onClick={() => {}}
                      />
                    </div>
                  )}
                </div>
              </div>
            </>
          ) : (
            <ArchButton
              name=" Add projects to cart"
              type="button"
              variant="white"
              onClick={() => {}}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Page;

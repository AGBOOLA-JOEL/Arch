"use client";
import ArchButton from "@/components/general/ArchButton";
import Image from "next/image";
import { ImCancelCircle } from "react-icons/im";

const Page = () => {
  return (
    <div className="dash_archive">
      <div className="dash_archivehead">
        <p>Project</p>
        <p>Price</p>
      </div>

      <div className="dash_archiveinfo">
        <div className="dash_archivemap">
          <div className="dash_archivedetails">
            <div className="dash_archiveimg">
              <span>
                <ImCancelCircle />
              </span>
              {/* 
            <Image
              src={""}
              alt="loading...."
              width={0}
              height={0}
              sizes="100vw"
            /> */}
            </div>
            <p> this is the titllllellelelekelelelelele</p>

            <p>free</p>
          </div>
        </div>

        <div className="dash_archivebtn">
          <ArchButton name={"Download"} variant="primary" onClick={() => {}} />
        </div>
      </div>
    </div>
  );
};

export default Page;

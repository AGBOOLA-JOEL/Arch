"use client";
import { useDownloadTemplate } from "@/_utils/downloadtemplate";
import Link from "next/link";

const SubmitInfo = () => {
  const { download } = useDownloadTemplate({
    filename: "Architectural submission template (ARCHCACHE).zip",
  });
  const handleDownload = (e: any) => {
    e.preventDefault();
    download.mutate("/format/download");
  };
  return (
    <div className="submit_info">
      <h1 className="submit_infotitle">SUBMIT A PROJECT</h1>
      <div className="submit_infopub">
        <h1>Publish your projects or comic on our platform</h1>
        <p>
          Ready to inspire and amuse our visitors with your work? Great ! We
          would require you to follow the instructions below carefully so that
          we can have your works available in the most superb way possible.
        </p>
      </div>
      <div className="submit_infocomic">
        <h1>Comic Submission</h1>
        <p>You can submit your comics via the post link on your dashboard. </p>
      </div>

      <div className="submit_infoarch">
        <h1>Architectural Submission</h1>
        <p>
          First, please download our template for your submission
          <span style={{ fontWeight: "700" }} onClick={handleDownload}>
            here
          </span>
          and upload them in your googledrive.
        </p>

        <p>
          Second, copy the link of the folder in the google drive and share it
          in the form below (please kindly ensure that the access link you
          provide is not restricted).
        </p>

        <p>
          Lastly, kindly fill out the form below and ensure you agree to our{" "}
          <Link href="/policy/terms">Terms of use</Link> and{" "}
          <Link href="/policy/privacy">privacy policy</Link> .
        </p>
      </div>
    </div>
  );
};

export default SubmitInfo;

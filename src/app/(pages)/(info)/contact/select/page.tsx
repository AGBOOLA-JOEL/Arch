"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function ContactPage() {
  const router = useRouter();

  return (
    <div className="contact_selcontainer">
      <div className="contact_sel">
        <div className="contact_selheader">
          <h1>STAY IN TOUCH</h1>
          <p>Register your complaints {">>"} </p>
        </div>
        <div className="contact_selbtnwrapper">
          <div className="contact_selbutton">
            <button
              className="contact_selbtn"
              onClick={() => router.push("/contact/general")}
            >
              General Account issues
            </button>
            <button className="contact_selbtn">Account Verification</button>
            <button className="contact_selbtn">Project Downloads</button>
            <button className="contact_selbtn">Get Project Commissions</button>
          </div>
          <div className="contact_selbutton">
            <button className="contact_selbtn">Report Submission</button>
            <button className="contact_selbtn">Partner With Us</button>
            <button
              className="contact_selbtn"
              onClick={() => router.push("/contact/general/title")}
            >
              Premium Plan Upgrade
            </button>
            <button
              className="contact_selbtn"
              onClick={() => router.push("/contact/more")}
            >
              Contact Us
            </button>
          </div>
        </div>

        <div className="contact_sellocation">
          <h1>OFFICES</h1>
          <div className="contact_seloffice">
            <div className="contact_selimg">
              <Image
                width={90}
                height={90}
                src={"/assets/svg/Archlogo.svg"}
                alt={"logo"}
                priority
              />
            </div>

            <div className="contact_seldesc">
              <h2>Nigeria office</h2>
              <p>16/18 Omerulu street</p>
              <p>500272</p>
              <p>Rivers</p>
            </div>
          </div>
        </div>
        <div className="contact_selphone">
          <h1>PHONE NUMBERS</h1>
          <h2> Hot lines:</h2>
          <p>
            {" "}
            <span>Line 1:</span> +234-8138580315
          </p>
          <p>
            <span>Line 2:</span> +234-8138580315
          </p>
        </div>
      </div>
    </div>
  );
}

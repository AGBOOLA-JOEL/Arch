"use client";
import useModalStore from "@/_lib/store/modal-store";
import { useRouter } from "next/navigation";
import type React from "react";
import { useState } from "react";

interface SubtitleItem {
  id: number;
  title: string;
  link: string;
}

interface ContactItem {
  id: number;
  title: string;
  link: string;
  subtitle?: SubtitleItem[];
}

const ContactGeneral: React.FC = () => {
  const { openModal } = useModalStore();
  const navigate = useRouter();
  const contactdata: ContactItem[] = [
    {
      id: 1,
      title: "I cannot log into my account",
      link: "/contact/general/title",
    },
    {
      id: 2,
      title: "My account cannot download projects",
      link: "/contact/general/title",
    },
    {
      id: 3,
      title: "My account cannot download projects",
      link: "/contact/general/title",
      subtitle: [
        {
          id: 4,
          title: "I cannot view the project i submitted",
          link: "/contact/general/title",
        },
        {
          id: 5,
          title: "There is a problem with the share link",
          link: "/contact/general/title",
        },
      ],
    },
    {
      id: 6,
      title: "I did not receive the email sent to my email",
      link: "/contact/general/title",
    },
  ];
  const [drop, setDrop] = useState<boolean>(false);

  return (
    <div className="contact_gen">
      <div className="contact_genheader">
        <h1>Contact us / About us</h1>
        <p>General Account Issues</p>
      </div>
      <div className="contact_genlinks">
        {contactdata.map((data) => {
          return (
            <div key={data.id} className="contact_genmap">
              {data.subtitle ? (
                <div
                  onClick={() => {
                    setDrop(!drop);
                  }}
                >
                  <p className="contact_genmain">{data.title}</p>
                  {drop &&
                    data.subtitle.map((subData) => {
                      return (
                        <p
                          className="contact_gensub"
                          key={subData.id}
                          onClick={(e: React.MouseEvent) => {
                            e.stopPropagation();
                            navigate.push(subData.link);
                          }}
                        >
                          {subData.title}
                        </p>
                      );
                    })}
                </div>
              ) : (
                <p
                  className="contact_genmain"
                  onClick={() => {
                    navigate.push(data.link);
                  }}
                >
                  {data.title}
                </p>
              )}
            </div>
          );
        })}
      </div>
      <p className="contact_genhelp">
        Did you find the options above helpful? Do you need more{" "}
        <span
          onClick={() => {
            openModal("help");
          }}
        >
          help?
        </span>
      </p>
    </div>
  );
};

export default ContactGeneral;

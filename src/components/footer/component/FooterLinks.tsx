"use client";
import { useUser } from "@/_hooks/useUser";
import { FooterPropType } from "@/types/footer.type";
import Link from "next/link";

const FooterLinks = ({ links }: FooterPropType) => {
  const { user } = useUser();
  return (
    <div className="footer_links">
      {links.map((data) => {
        return (
          <Link href={data.url} key={data.id}>
            {data.url === "/admin" ? (
              <> {user?.role === "ADMIN" ? data.name : ""}</>
            ) : (
              data.name
            )}
          </Link>
        );
      })}
    </div>
  );
};

export default FooterLinks;

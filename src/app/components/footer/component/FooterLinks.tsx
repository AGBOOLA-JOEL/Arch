import { FooterPropType } from "@/app/types/footer.type";
import Link from "next/link";

const FooterLinks = ({ links }: FooterPropType) => {
  return (
    <div className="footer_links">
      {links.map((data) => {
        return (
          <Link href={data.url} key={data.id}>
            {data.name}
          </Link>
        );
      })}
    </div>
  );
};

export default FooterLinks;

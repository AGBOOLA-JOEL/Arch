import NavLogo from "../general/ArchLogo";
import FooterSocials from "./component/FooterSocials";
import FooterLinks from "./component/FooterLinks";
import { footerFour, footerThree, footerTwo } from "@/db/components/footer.db";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer_info">
        <div className="footer_logo">
          <NavLogo type={"/assets/svg/ArchWhite.svg"} />
        </div>

        <FooterLinks links={footerTwo} />
        <FooterLinks links={footerThree} />
        <FooterLinks links={footerFour} />
        <FooterSocials />
      </div>

      <div className="footer_mark">
        <p> © 2022 ArchCache - All Rights Reserved</p>
      </div>
    </div>
  );
};

export default Footer;

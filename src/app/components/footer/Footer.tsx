import NavLogo from "../general/ArchLogo";
import FooterSocials from "./component/FooterSocials";
import FooterLinks from "./component/FooterLinks";
import {
  footerFour,
  footerThree,
  footerTwo,
} from "@/app/db/components/footer.db";

const Footer = () => {
  return (
    <div className="footer">
      <div>
        <NavLogo />
        <FooterLinks links={footerTwo} />
        <FooterLinks links={footerThree} />
        <FooterLinks links={footerFour} />
        <FooterSocials />
      </div>

      <div>
        <p> © 2022 ArchCache - All Rights Reserved</p>
      </div>
    </div>
  );
};

export default Footer;

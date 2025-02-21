import { FaFacebookF, FaTwitter, FaLinkedinIn, FaGithub } from "react-icons/fa";

const FooterSocials = () => {
  return (
    <div className="footer_socials">
      <p>Follow us on:</p>

      <div className="footer_media">
        <span>
          <FaFacebookF />
        </span>

        <span>
          <FaTwitter />
        </span>
        <span>
          <FaLinkedinIn />
        </span>

        <span>
          <FaGithub />
        </span>
      </div>
    </div>
  );
};

export default FooterSocials;

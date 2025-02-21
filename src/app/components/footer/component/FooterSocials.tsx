import { FaFacebookF, FaTwitter, FaLinkedinIn, FaGithub } from "react-icons/fa";

const FooterSocials = () => {
  return (
    <div>
      <p>Follow us on:</p>

      <div>
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

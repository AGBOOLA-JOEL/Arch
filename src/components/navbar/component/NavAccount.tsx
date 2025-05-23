import { RxAvatar } from "react-icons/rx";
import { RiLogoutBoxLine } from "react-icons/ri";
import Link from "next/link";
import useModalStore from "@/_lib/store/modal-store";
import { useDetectClickOutside } from "react-detect-click-outside";
type AccountProp = {
  session: any;
  setAccount: React.Dispatch<React.SetStateAction<boolean>>;
};
const NavAccount = ({ setAccount, session }: AccountProp) => {
  const { openModal } = useModalStore();

  const closeAccount = () => {
    setAccount((prev) => !prev);
  };
  const accountref = useDetectClickOutside({ onTriggered: closeAccount });
  return (
    <div className="nav_mobacc" ref={accountref}>
      {session?.user.role === "ADMIN" ? (
        <Link href={`/admin`}>
          <RxAvatar />
          Your Account
        </Link>
      ) : (
        <Link href={`/dashboard`}>
          <RxAvatar />
          Your Account
        </Link>
      )}

      <button
        onClick={() => {
          closeAccount();
          openModal("logout");
        }}
      >
        <RiLogoutBoxLine />
        Logout
      </button>
    </div>
  );
};

export default NavAccount;

// import { useAuthselectors } from "@/_lib/store/auth-store";
import { signOut } from "next-auth/react";
import { HiOutlineX } from "react-icons/hi";
import ArchButton from "../general/ArchButton";
import { useRouter } from "next/navigation";
import useModalStore from "@/_lib/store/modal-store";

interface ModalProp {
  isOpen: boolean;
  onClose: () => void;
}
const ModalLogout = ({ isOpen, onClose }: ModalProp) => {
  const { openModal, closeModal } = useModalStore();
  const router = useRouter();
  if (!isOpen) return null;
  const handleClick = async () => {
    onClose();
    openModal("loading");
    await signOut();
    await router.push("/login");
    closeModal();
  };
  return (
    <div className="modal_bg">
      <div className="modal_confirm">
        <p className="modal_confirmhead">
          <span>Logout confirmation</span>
          <span className="modal_confirmicon">
            <HiOutlineX onClick={onClose} />
          </span>
        </p>

        <p className="modal_confirmtitle">Are you sure you want to logout?</p>
        <div className="modal_confirmbtn">
          <ArchButton
            type="button"
            name="Yes"
            onClick={handleClick}
            variant="primary"
          />
          <ArchButton
            type="button"
            name="Cancel"
            onClick={onClose}
            variant="cancel"
          />
        </div>
      </div>
    </div>
  );
};

export default ModalLogout;

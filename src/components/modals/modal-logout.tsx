import { useAuthselectors } from "@/_lib/store/auth-store";
import { HiOutlineX } from "react-icons/hi";
import ArchButton from "../general/ArchButton";

interface ModalProp {
  isOpen: boolean;
  onClose: () => void;
}
const ModalLogout = ({ isOpen, onClose }: ModalProp) => {
  const logout = useAuthselectors.use.logout();
  if (!isOpen) return null;
  const handleClick = () => {
    logout();
    onClose();
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

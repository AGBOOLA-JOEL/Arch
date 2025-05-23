import { useRouter } from "next/router"; // Import router for navigation handling
import { HiOutlineX } from "react-icons/hi";
import ArchButton from "../general/ArchButton";

interface ModalProp {
  isOpen: boolean;
  onClose: () => void;
}

const ModalProfile = ({ isOpen, onClose }: ModalProp) => {
  const router = useRouter(); // useRouter to navigate programmatically

  const handleClick = () => {
    // Implement navigation behavior after confirmation
  };

  const handleCancel = () => {
    // Simply close the modal without navigating away
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal_bg">
      <div className="modal_confirm">
        <p className="modal_confirmhead">
          <span>Profile changes</span>
          <span className="modal_confirmicon">
            <HiOutlineX onClick={onClose} />
          </span>
        </p>

        <p className="modal_confirmtitle">You will lose unsaved changes?</p>
        <div className="modal_confirmbtn">
          <ArchButton
            name="Yes"
            onClick={handleClick}
            variant="primary"
            type="button"
          />
          <ArchButton
            name="Cancel"
            onClick={handleCancel}
            variant="cancel"
            type="button"
          />
        </div>
      </div>
    </div>
  );
};

export default ModalProfile;

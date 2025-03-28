import ArchLoader from "../general/ArchLoader";
import ModalPortal from "./modal-portal";

interface ModalProp {
  isOpen: boolean;
  onClose: () => void;
}

const ModalLoading = ({ isOpen, onClose }: ModalProp) => {
  if (!isOpen) return null;

  return (
    <ModalPortal>
      <div className="modal_loading">
        <ArchLoader />
        {/* <button onClick={onClose}>Close</button> */}
      </div>
    </ModalPortal>
  );
};

export default ModalLoading;

 
import { HiOutlineX } from "react-icons/hi";
import ArchButton from "../general/ArchButton";
import { useState } from "react";
import { useParams } from "next/navigation";
import { useActionPayment } from "@/_hooks/usePayment";
import useModalStore from "@/_lib/store/modal-store";
import ArchSpinner from "../general/ArchSpinner";

interface ModalProp {
  isOpen: boolean;
  onClose: () => void;
}
const ModalRejectPayment = ({ isOpen, onClose }: ModalProp) => {
  const params = useParams();
  const ref = (params?.slug as string[])?.[1];
  const [textArea, setTextArea] = useState("");
  const { rejectMutation } = useActionPayment();

  const handleClick = () => {
    rejectMutation.mutate({ data: textArea, ref });
  };
  if (!isOpen) return null;
  return (
    <div className="modal_bg">
      {rejectMutation.isPending ? (
        <div className="modal_spinner">
          <ArchSpinner />
          <p>Project Rejection in progress....</p>
        </div>
      ) : (
        <div className="modal_confirm">
          <p className="modal_confirmhead">
            <span>Reject payment</span>
            <span className="modal_confirmicon">
              <HiOutlineX onClick={onClose} />
            </span>
          </p>

          <p className="modal_confirmtitle">
            Are you sure you want to reject this payment?
          </p>
          <textarea
            className="modal_confirmtextarea"
            placeholder="Type in reason for rejection here"
            value={textArea}
            onChange={(e) => {
              setTextArea(e.target.value);
            }}
          ></textarea>
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
      )}
    </div>
  );
};

export default ModalRejectPayment;

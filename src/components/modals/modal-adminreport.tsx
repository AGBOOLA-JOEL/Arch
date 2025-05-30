import { useRouter } from "next/router"; // Import router for navigation handling
import { HiOutlineX } from "react-icons/hi";
import ArchButton from "../general/ArchButton";
import { usePostReportAction } from "@/_hooks/useReport";
import { useParams } from "next/navigation";

interface ModalProp {
  isOpen: boolean;
  onClose: () => void;
}

const ModalAdminReport = ({ isOpen, onClose }: ModalProp) => {
  const params = useParams();

  const reportId = params?.repId as string;
  const { unpublishMutation } = usePostReportAction();
  const handleClick = () => {
    unpublishMutation.mutate(reportId);
  };

  const handleCancel = () => {
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal_bg">
      <div className="modal_confirm">
        <p className="modal_confirmhead">
          <span>News Deletion-{reportId}</span>
          <span className="modal_confirmicon">
            <HiOutlineX onClick={onClose} />
          </span>
        </p>

        <p className="modal_confirmtitle">
          Are you sure you want to delete this news?
        </p>
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

export default ModalAdminReport;

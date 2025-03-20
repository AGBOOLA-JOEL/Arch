import { FaImage } from "react-icons/fa6";

type ArchDndProp = {
  header: string;
};

const ArchDnd = ({ header }: ArchDndProp) => {
  return (
    <div className="arch_dnd">
      <div className="arch_dndbrowse">
        <FaImage />
        <p>{header}</p>
        <p>or</p>
        <label>browse files</label>
        <p>supported formats jpg, png</p>
      </div>
    </div>
  );
};

export default ArchDnd;

import { useAuthselectors } from "@/_lib/store/auth-store";
import { HiOutlineX } from "react-icons/hi";
import ArchButton from "../general/ArchButton";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { FiX } from "react-icons/fi";
import { contactmoreschema } from "@/_utils/validation/forms";
import { useForm, FieldErrors } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ContactMoreData } from "@/types/forms.type";
import { useGenselectors } from "@/_lib/store/general-store";
import { useContact } from "@/_hooks/useContact";
import ArchSpinner from "../general/ArchSpinner";
interface ModalProp {
  isOpen: boolean;
  onClose: () => void;
}
const ModalHelp = ({ isOpen, onClose }: ModalProp) => {
  const openToast = useGenselectors.use.openToast();
  const { contactMutation } = useContact();
  const { register, handleSubmit, watch, setValue } = useForm({
    resolver: yupResolver(contactmoreschema),
    mode: "onSubmit",
  });
  const logout = useAuthselectors.use.logout();

  const handleClick = () => {
    logout();
    onClose();
  };

  const [showMore, setShowMore] = useState(false);
  const [more, setMore] = useState("");
  const onError = (errors: FieldErrors<ContactMoreData>) => {
    for (const [fieldName, err] of Object.entries(errors)) {
      if (err?.message) {
        openToast(err.message, 2500);
        break;
      }
    }
  };
  const onSubmit = (data: ContactMoreData) => {
    contactMutation.mutate(data);
    console.log(data, "contact more data");
  };
  if (!isOpen) return null;
  return (
    <form
      className="modal_helpbg"
      onSubmit={handleSubmit(onSubmit, onError)}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault(); // Prevent form submit on Enter
        }
      }}
    >
      <div className="modal_helpheader">
        <h1>
          Please tell us more about the issue you would like us to solve for you
        </h1>
        <span>
          <FiX onClick={onClose} />
        </span>
      </div>

      <div className="modal_helpmail">
        <p>Your Email:</p>
        <input
          type="email"
          {...register("email")}
          placeholder="email@gmail.com"
          name={"email"}
        />
      </div>

      <div className="modal_helpacc">
        <p className="modal_helpaccheader">Account Issue:</p>
        <div
          className="modal_helpaccinput"
          onClick={() => setShowMore(!showMore)}
        >
          <p>{more || "---Select account issue-----"}</p>
          <span>
            <ChevronDown />
          </span>
        </div>

        <div className="modal_helpaccdrop">
          {showMore &&
            contactmore.map((item) => (
              <p
                key={item.id}
                onClick={() => {
                  setShowMore(false);
                  setValue("issue", item.title);
                  setMore(item.title);
                }}
              >
                {item.title}
              </p>
            ))}
        </div>
      </div>

      <textarea
        className="modal_helptextarea"
        {...register("reportBody")}
        placeholder="Tell us more"
        name={"reportBody"}
      ></textarea>

      <input
        type="file"
        accept="image/*"
        placeholder="Attach file"
        className="modal_helpdrop"
        onChange={(e: any) => {
          setValue("image", e.target.files[0]);
        }}
      />

      <button className="modal_helpbtn" disabled={contactMutation.isPending}>
        {contactMutation.isPending ? <ArchSpinner /> : "Send"}{" "}
      </button>
    </form>
  );
};

export default ModalHelp;

export const contactmore = [
  { id: 1, title: "I want to be a partner" },
  { id: 2, title: "I want to get a commission on my submitted project" },
  { id: 3, title: "I want to upgrade my account" },
  { id: 4, title: "Others" },
];

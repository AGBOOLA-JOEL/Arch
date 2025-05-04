import { useNewsById } from "@/_hooks/useNews";
import { useGenselectors } from "@/_lib/store/general-store";
import { reportformschema } from "@/_utils/validation/forms";
import { reportradio } from "@/data/modal.db";
import { ReportData } from "@/types/forms.type";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import { useForm, FieldErrors } from "react-hook-form";
import { FiX } from "react-icons/fi";
import ArchSpinner from "../general/ArchSpinner";
import { useFeed } from "@/_hooks/useFeed";
interface ModalProp {
  isOpen: boolean;
  onClose: () => void;
}

const ModalReport = ({ isOpen, onClose }: ModalProp) => {
  const params = useParams();
  const { reportMutation } = useFeed();
  const openToast = useGenselectors.use.openToast();
  const { register, handleSubmit, watch } = useForm({
    resolver: yupResolver(reportformschema),
    mode: "onSubmit",
  });

  const id = (params?.slug as string[])?.[0];
  const { newsid, isLoading, isError } = useNewsById(id);
  const title = watch("title") || "";
  const desc = watch("desc") || "";

  const onError = (errors: FieldErrors<ReportData>) => {
    for (const [fieldName, err] of Object.entries(errors)) {
      if (err?.message) {
        openToast(err.message, 2500);
        break;
      }
    }
  };
  const onSubmit = (data: ReportData) => {
    const reportdata = {
      category: [data.title],
      reason: data.desc ?? null,
    };
    console.log(reportdata, "report data");
    reportMutation.mutate({ data: reportdata, id });
  };
  if (!isOpen) return null;
  return (
    <form
      className="modal_report"
      action=""
      onSubmit={handleSubmit(onSubmit, onError)}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault(); // Prevent form submit on Enter
        }
      }}
    >
      <div className="modal_rep">
        <div className="modal_rephead">
          <p>Report</p>
          <span onClick={onClose}>
            <FiX />
          </span>
        </div>
        <div className="modal_reptitle">
          <h1>{newsid?.title}</h1>
          <p>Posted by {newsid?.user.username}</p>
        </div>

        <div className="modal_repselect">
          {reportradio.map((data) => {
            return (
              <div key={data.id} className="modal_repradio">
                <input
                  type="radio"
                  value={data.title}
                  {...register("title")}
                  checked={title === data.title ? true : false}
                />
                <p>{data.title}</p>
              </div>
            );
          })}
        </div>

        <div className="modal_repdesc">
          <div className="modal_repdeschead">
            <h1>Additional information</h1>

            <span>{desc.length} / 300</span>
          </div>

          <textarea
            {...register("desc")}
            placeholder="Tell us more"
            name={"desc"}
            maxLength={300}
          ></textarea>
        </div>

        <div className="modal_repsubmit">
          <button type={"submit"} disabled={reportMutation.isPending}>
            {reportMutation.isPending ? <ArchSpinner /> : "Submit"}{" "}
          </button>
          <p>
            All postings are subject to our{" "}
            <Link href="/policy/terms">Terms of use</Link> and{" "}
            <Link href="/policy/privacy">Privacy policy</Link>. However we allow
            you to tag an information that maybe deemed incorrect, not accurate,
            offensive or outdated to enable us serve our users better provided
            it can be proven. But flagging an information does not guarantee{" "}
            {"it's"}
            removal.
          </p>
        </div>
      </div>
    </form>
  );
};

export default ModalReport;

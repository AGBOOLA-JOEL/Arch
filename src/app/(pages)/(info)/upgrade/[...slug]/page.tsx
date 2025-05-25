"use client";
import ArchDnd from "@/components/general/ArchDnd";
import { useParams } from "next/navigation";
import { usePaymentReceipt } from "@/_hooks/usePayment";
import type { UpgradePaymentData } from "@/types/forms.type";
import { type FieldErrors, useForm } from "react-hook-form";
import { useGenselectors } from "@/_lib/store/general-store";
import { yupResolver } from "@hookform/resolvers/yup";
import { upgradepaymentschema } from "@/_utils/validation/forms";

const PayConfirm = () => {
  const { handleSubmit, setValue } = useForm({
    resolver: yupResolver(upgradepaymentschema),
  });
  const params = useParams();
  const ref = (params?.slug as string[])?.[0];
  const openToast = useGenselectors.use.openToast();

  const { confirmMutation } = usePaymentReceipt();

  const onError = (errors: FieldErrors<UpgradePaymentData>) => {
    for (const [fieldName, err] of Object.entries(errors)) {
      if (err?.message) {
        openToast(err.message, 2500);
        break;
      }
    }
  };

  const onSubmit = (data: UpgradePaymentData) => {
    const { paymentReceipt } = data;
    const apiData = {
      paymentReceipt,
      paymentReference: ref,
    };
    console.log("payment receipt data", apiData);
    confirmMutation.mutate(apiData);
  };

  return (
    <div className="info_paymentreceipt">
      {confirmMutation.isSuccess ? (
        <div className="info_paymentreceipt__success">
          <div className="info_paymentreceipt__success-icon">✓</div>
          <h1 className="info_paymentreceipt__success-title">
            Receipt Submitted Successfully!
          </h1>
          <p className="info_paymentreceipt__success-text">
            Thank you! Your transaction receipt has been successfully submitted.
            Our team is now reviewing your payment. You will receive a
            confirmation shortly once the verification process is complete.
          </p>
        </div>
      ) : (
        <div className="info_paymentreceipt__form-container">
          <div className="info_paymentreceipt__header">
            <div className="info_paymentreceipt__reference">
              Reference: {ref}
            </div>
            <h1 className="info_paymentreceipt__title">
              Upload Transaction Receipt
            </h1>
            <p className="info_paymentreceipt__description">
              Submit your transaction receipt to finalize your plan activation.
              Once {"you've"} completed the payment, simply paste the receipt
              below, and our team will promptly verify and confirm your
              subscription.
            </p>
          </div>

          <form
            className="info_paymentreceipt__form"
            onSubmit={handleSubmit(onSubmit, onError)}
          >
            <div className="info_paymentreceipt__upload-wrapper">
              <ArchDnd
                header="Paste receipt image here"
                fieldname={"paymentReceipt"}
                setValue={setValue}
              />
            </div>

            <button
              type="submit"
              className="info_paymentreceipt__submit-btn"
              disabled={confirmMutation.isPending}
            >
              {confirmMutation.isPending ? "Submitting..." : "Submit Receipt"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default PayConfirm;

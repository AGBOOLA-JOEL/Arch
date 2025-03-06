import Image from "next/image";

const FormGoogle = () => {
  return (
    <div className="form_google">
      <Image
        src={"/assets/images/form/google.png"}
        alt="google"
        width={0}
        height={0}
      />

      <p>Continue with Google</p>
    </div>
  );
};

export default FormGoogle;

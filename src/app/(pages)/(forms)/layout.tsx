import Image from "next/image";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="forms">
      <div className="form_bg">
        <Image
          src={"/assets/images/form/formbg.png"}
          alt="form"
          width={0}
          height={0}
          sizes="100vw"
        />
      </div>
      <div className="form_child">{children}</div>
    </div>
  );
}

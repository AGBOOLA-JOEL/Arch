import DashSidebar from "@/components/dashboard/DashSidebar";
import { IoIosArrowDown } from "react-icons/io";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="dashboard">
      <div className="dashboard_head">
        <span>Dashboard</span>
        <IoIosArrowDown />
      </div>
      <div className="dashboard_display">
        <div className="dashboard_side">
          <DashSidebar />
        </div>
        <div className="dashboard_child">{children}</div>
      </div>
    </div>
  );
}

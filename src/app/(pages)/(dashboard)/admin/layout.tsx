import AdminHead from "@/components/dashboard/AdminHead";
import AdminSidebar from "@/components/dashboard/AdminSidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="dashboard">
      <AdminHead />
      <div className="dashboard_display">
        <div className="dashboard_side">
          <AdminSidebar />
        </div>
        <div className="dashboard_child">{children}</div>
      </div>
    </div>
  );
}

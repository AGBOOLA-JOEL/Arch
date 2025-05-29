"use client";
import Footer from "@/components/footer/Footer";
import ArchFade from "@/components/general/ArchFade";
import ArchScrollTop from "@/components/general/ArchScrollTop";
import ArchToast from "@/components/general/ArchToast";
import ModalProvider from "@/components/modals/modal-provider";
import Navbar from "@/components/navbar/Navbar";
import { usePathname } from "next/navigation";

const App = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  // Define paths or path prefixes where footer should show
  const showFooterPaths = ["/", "/submit", "/login", "/register", "/forgot"];
  // const showFooterPaths = ["/", "/about", "/projects"];
  const showFooterStartsWith = ["/admin", "/newpass"]; // match any route starting with

  const shouldShowFooter =
    showFooterPaths.includes(pathname) ||
    showFooterStartsWith.some((prefix) => pathname.startsWith(prefix));
  return (
    <body className="app">
      <ArchScrollTop />
      <ArchToast />
      <ModalProvider />
      <header className="app_navbar">
        <Navbar />
      </header>

      <main className="app_children">{children}</main>
      {shouldShowFooter && (
        <footer className="app_footer">
          <Footer />
        </footer>
      )}
    </body>
  );
};

export default App;

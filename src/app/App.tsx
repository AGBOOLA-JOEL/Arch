import Footer from "@/components/footer/Footer";
import ArchToast from "@/components/general/ArchToast";
import ModalProvider from "@/components/modals/modal-provider";
import Navbar from "@/components/navbar/Navbar";

const App = ({ children }: { children: React.ReactNode }) => {
  return (
    <body className="app">
      <ArchToast />
      <ModalProvider />
      <header className="app_navbar">
        <Navbar />
      </header>

      <main className="app_children">{children}</main>
      <footer className="app_footer">
        <Footer />
      </footer>
    </body>
  );
};

export default App;

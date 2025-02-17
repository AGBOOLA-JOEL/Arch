import Navbar from "./components/navbar/Navbar";

const App = ({ children }: { children: React.ReactNode }) => {
  return (
    <body className="app">
      <header className="app_navbar">
        <Navbar />
      </header>

      <main className="app_children">{children}</main>
      <footer className="app_footer">.</footer>
    </body>
  );
};

export default App;

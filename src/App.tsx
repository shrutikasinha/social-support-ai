import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Outlet } from "react-router-dom";

import Header from "./components/Header";

function App() {
  const { i18n } = useTranslation();
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const dir = i18n.language === "ar" ? "rtl" : "ltr";
    document.documentElement.dir = dir;
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  return (
    <>
      <header>
        <Header />
      </header>
      <Outlet />

      <footer className="bg-slate-900 text-white text-center py-4 mt-8">
        <p className="text-sm">
          © {currentYear} Your Company. All rights reserved.
        </p>
      </footer>
    </>
  );
}

export default App;

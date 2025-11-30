import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { LanguageContext } from "../../hooks/LanguageProvider";
import { Typography } from "antd";

const Header = () => {
  const { t } = useTranslation();
  const { lang, setLang } = useContext(LanguageContext);

  return (
    <header className="bg-slate-900 text-white p-8 flex justify-between">
      <div className="gap-2 flex">
        <img src={"/public-service.png"} width={40} height={20} />
        <h1 className="text-2xl">Social Support Form</h1>
      </div>
      <Typography
        onClick={setLang}
        className="text-white font-semibold cursor-pointer"
      >
        {t(`locale.${lang}`)}
      </Typography>
    </header>
  );
};

export default Header;

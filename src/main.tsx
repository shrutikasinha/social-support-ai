import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";

import appStore from "./redux/appStore.ts";
import "../src/localization/i18n.ts";
import "./index.css";
import LanguageProvider from "./hooks/LanguageProvider.tsx";
import { RouterProvider } from "react-router-dom";
import router from "./routes/router.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={appStore}>
      <LanguageProvider>
        <RouterProvider router={router} />
      </LanguageProvider>
    </Provider>
  </StrictMode>,
);

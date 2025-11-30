import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../App";
import Body from "../components/Body/index";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Navigate to="/step/1" replace />,
      },
      {
        path: "step/:stepId",
        element: <Body />,
      },
    ],
  },
]);

export default router;

import { createBrowserRouter, RouterProvider } from "react-router";
import Home from "./pages/Home";
import PilotTablePage from "./pages/PilotsTablePage";
import RootLayout from "./RootLayout";
import NotFoundPage from "./pages/NotFoundPage";
import PilotCardPage from "./pages/PilotCardPage";
import RaceTablePage from "./pages/RacesTablePage";
import RaceCardPage from "./pages/RaceCardPage";
import PrivacyPage from "./pages/Privacy";
import ErrorPage from "./pages/ErrorPage";
import I18nProvider from "./i18n/I18nProvider";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: "pilots", element: <PilotTablePage /> },
      { path: "pilots/:id", element: <PilotCardPage /> },
      { path: "races", element: <RaceTablePage /> },
      { path: "races/:id", element: <RaceCardPage /> },
      { path: "privacy", element: <PrivacyPage /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);

function App() {
  return (
    <I18nProvider>
      <RouterProvider router={router} />
    </I18nProvider>
  );
}

export default App;

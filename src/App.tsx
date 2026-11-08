import { createBrowserRouter, RouterProvider } from "react-router";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./queryClient";
import I18nProvider from "./i18n/I18nProvider";
import RootLayout from "./RootLayout";
import Home from "./pages/Home";
import PilotTablePage from "./pages/PilotsTablePage";
import PilotCardPage from "./pages/PilotCardPage";
import RaceTablePage from "./pages/RacesTablePage";
import RaceCardPage from "./pages/RaceCardPage";
import PrivacyPage from "./pages/Privacy";
import NotFoundPage from "./pages/NotFoundPage";
import ErrorPage from "./pages/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        // A page that crashes shows the error inside the layout, so header
        // and footer stay usable; the outer errorElement only catches
        // failures of the layout itself
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
    ],
  },
]);

// App-wide providers live here, above the router, so every route (the error
// page included) gets data and translations
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <I18nProvider>
        <RouterProvider router={router} />
      </I18nProvider>
    </QueryClientProvider>
  );
}

export default App;

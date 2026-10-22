import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import { Outlet, ScrollRestoration } from "react-router";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./queryClient";

function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <div id="app-layout" className="min-vh-100 d-flex flex-column app-layout">
        <Header />
        <main id="app-main" className="flex-fill">
          <Outlet />
        </main>
        <Footer />
        <ScrollRestoration />
      </div>
    </QueryClientProvider>
  );
}

export default RootLayout;

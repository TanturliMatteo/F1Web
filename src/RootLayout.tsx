import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import { Outlet } from "react-router";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./queryClient";

function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen flex flex-col f1-bg">
        <Header />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
    </QueryClientProvider>
  );
}

export default RootLayout;

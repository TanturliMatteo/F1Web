import { Outlet } from "react-router";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

function RootLayout() {
  return (
    <div className="min-h-screen flex flex-col f1-bg">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default RootLayout;

import { Outlet, ScrollRestoration } from "react-router";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

// Header, page, footer: the footer sits at the bottom even on short pages
function RootLayout() {
  return (
    <div id="app-layout" className="app-layout">
      <Header />
      <main id="app-main" className="app-main">
        <Outlet />
      </main>
      <Footer />
      <ScrollRestoration />
    </div>
  );
}

export default RootLayout;

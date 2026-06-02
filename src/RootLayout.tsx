import { Outlet } from "react-router";
import Header from "./components/layout/Header";

function RootLayout() {
  return (
    <div className="min-h-screen flex flex-col f1-bg">
      <Header />

      <main className="flex-1 flex justify-center">
        <div className="w-full max-w-6xl px-4">
          <Outlet />
        </div>
      </main>

      <footer className="w-full text-center py-4">Footer comune</footer>
    </div>
  );
}

export default RootLayout;

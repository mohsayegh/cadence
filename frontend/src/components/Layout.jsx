import { Outlet } from "react-router";
import Header from "./Header";

function Layout() {
  return (
    <div className="min-h-screen bg-stone-100">
      <Header />
      <main className="mx-auto w-full max-w-md px-4 py-10">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;

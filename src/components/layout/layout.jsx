import { Outlet } from "react-router-dom";
import { Header } from "./header";
import { Sidebar } from "./sidebar";

export function Layout() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="w-64 flex-shrink-0 shadow-lg">
        <Sidebar />
      </div>
      <div className="grow overflow-hidden w-full">
        {/* <Header /> */}
        <main className="grow overflow-y-auto bg-gray-50 p-6">
          <div className="mx-auto max-w-7xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

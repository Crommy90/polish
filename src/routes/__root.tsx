import { Sidebar } from "@/components/app-ui/sidebar";
import { createRootRoute, Outlet } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="flex h-screen w-screen bg-gray-50 dark:bg-gray-950 font-inter overflow-hidden print:block print:h-auto">
        <Sidebar />
        <main className="flex-1 min-w-0 overflow-y-auto p-4 sm:p-8 print:overflow-visible">
          <div className="w-full max-w-4xl mx-auto space-y-12">
            <Outlet />
          </div>
        </main>
      </div>
    </>
  ),
});

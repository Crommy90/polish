import { Sidebar } from "@/components/app-ui/sidebar";
import { Theme } from '@radix-ui/themes';
import { createRootRoute, Outlet } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: () => (
    <>
      <Theme>
        <div className="flex h-screen w-screen bg-gray-50 dark:bg-gray-950 font-inter overflow-hidden print:block print:h-auto">
          <Sidebar />
          <main className="flex-1 w-full min-w-0 overflow-y-auto p-4 print:overflow-visible">
            <div className="w-full space-y-12">
              <Outlet />
            </div>
          </main>
        </div>
      </Theme>
    </>
  ),
});

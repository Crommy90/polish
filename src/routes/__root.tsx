import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { createRootRoute, Outlet } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: () => (
    <>
      <SidebarProvider>
        <AppSidebar className="noprint" />
        <SidebarInset>
          <div className="flex justify-center p-4 sm:p-8 min-h-screen w-full">
            <div className="flex-1 space-y-12">
              <Outlet />
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </>
  ),
});

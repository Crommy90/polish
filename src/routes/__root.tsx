import { createRootRoute, Outlet } from '@tanstack/react-router'

export const Route = createRootRoute({
  component: () => (
    <>
      {/* Optional: Add a Navbar/Header here */}
      <Outlet /> {/* This renders the child routes (e.g., index, unit) */}
      {/* Optional: Add a DevTools for debugging */}
    </>
  ),
})
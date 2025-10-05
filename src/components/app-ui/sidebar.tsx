import { Link } from "@tanstack/react-router";

// --- SIDEBAR DATA AND COMPONENT ---
const SIDEBAR_LINKS = [
  { 
    name: "Cheat Sheet",
    href: "/"

   },
  { name: "Colour Game", href: "/games/colours" },];

export function Sidebar() {
  return (
    // Sidebar styling: Fixed width on md screens and up, hidden on mobile.
    <div className="hidden md:block w-64 flex-shrink-0 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 h-full overflow-y-auto p-4 shadow-xl print:hidden">
      <h3 className="text-xl font-bold mb-6 pt-2 text-red-600 dark:text-red-400 border-b pb-2">
        Po Polsku!
      </h3>
      <nav className="space-y-2">
        {SIDEBAR_LINKS.map((link) => (
          <Link
            key={link.href}
            to={link.href}
            className="flex items-center p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-red-900/50 hover:text-red-700 dark:hover:text-red-300 transition-colors duration-150 font-medium"
          >
            {link.name}
          </Link>
        ))}
      </nav>
    </div>
  );
}

import { Separator } from '@radix-ui/themes';
import { Link } from '@tanstack/react-router';
import { useState } from 'react';
import PolishFlag from '../../assets/polish_flag.svg';

interface SidebarLink {
  name: string;
  href: string;
  isHeading?: boolean;
}

// --- SIDEBAR DATA AND COMPONENT ---
const SIDEBAR_LINKS: SidebarLink[] = [
  {
    name: 'Cheat Sheet',
    href: '/',
  },
  { name: 'Grammar', href: '', isHeading: true },
  { name: 'Cases', href: '/lists/cases' },
  { name: 'Verbs', href: '/lists/verbs' },
  { name: 'Vocab', href: '/lists/vocab' },

  { name: 'Topics', href: '', isHeading: true },
  { name: 'Sports', href: '/topics/sports' },
  { name: 'Colours', href: '/topics/colours' },

  { name: 'Games', href: '', isHeading: true },

  { name: 'Colour Game', href: '/games/colours' },
  { name: 'Number Game', href: '/games/numbers' },
  { name: 'Adjective Game', href: '/games/adjectives' },
  { name: 'Sports Game', href: '/games/sports' },
];

export function Sidebar() {
  // State to manage the open/closed status of the sidebar
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Function to toggle the sidebar state
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      {/* ======================================================= */}
      {/* MOBILE MENU BUTTON (No change needed here) */}
      {/* ======================================================= */}
      <button
        className="fixed top-4 left-4 z-40 p-2 md:hidden text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-900 rounded-lg shadow-md"
        onClick={toggleSidebar}
        aria-label="Toggle sidebar"
      >
        {isSidebarOpen ? (
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        ) : (
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        )}
      </button>

      {/* ======================================================= */}
      {/* MOBILE OVERLAY (No change needed here) */}
      {/* ======================================================= */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-20 md:hidden bg-black opacity-50"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* ======================================================= */}
      {/* 2. THE SIDEBAR: ABSOLUTELY positioned on mobile */}
      {/* ======================================================= */}
      <div
        className={`
          w-64 flex-shrink-0 h-full overflow-y-auto p-4 shadow-xl print-hidden
          bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800
          transition-transform duration-300 ease-in-out z-30 flex-col
          
          // DESKTOP: Static, part of the flex flow, takes up w-64
          md:static md:translate-x-0

          // MOBILE: Fixed/Absolute to be outside of flow, allowing main content to fill space
          fixed top-0 left-0 bottom-0
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* ... Sidebar Content (same as before) ... */}
        <h3 className="text-xl font-bold mb-6 pt-2 text-red-600 dark:text-red-400 border-b pb-2">
          Po Polsku{' '}
          <img
            src={PolishFlag}
            alt="Polish Flag"
            className="inline-block w-6 h-4 ml-2 -mt-1"
          />
        </h3>
        <nav className="space-y-2">
          {SIDEBAR_LINKS.map((link, linkIndex) => (
            <div key={linkIndex}>
              {link.isHeading === true ? (
                <>
                  <Separator size={'4'} />
                  <b>{link.name}</b>
                </>
              ) : (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setIsSidebarOpen(false)}
                  className="flex items-center p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-red-900/50 hover:text-red-700 dark:hover:text-red-300 transition-colors duration-150 font-medium"
                >
                  {link.name}
                </Link>
              )}
            </div>
          ))}
        </nav>
      </div>
    </>
  );
}

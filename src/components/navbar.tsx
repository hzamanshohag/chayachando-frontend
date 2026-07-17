import { useState } from 'react'
import {  NavLink } from 'react-router-dom'

import logoDark from "../assets/images/chayachando.png";
import logoLight from "../assets/images/chayachando.png";

export default function Navbar({
  navLight,
  playBtn,
  bgLight,
  navCenter,
}: {
  navLight: boolean;
  playBtn: boolean;
  bgLight: boolean;
  navCenter: boolean;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: "মূলপাতা", path: "/" },
    { name: "বিনোদন", path: "/entertainment" },
    { name: "খেলাধুলা", path: "/sports" },
    { name: "সাক্ষাৎকার", path: "/interview" },
    { name: "ব্যক্তিত্ব", path: "/personality" },
  ];


  return (
    <nav
      className={`${
        bgLight ? "bg-white" : "bg-gray-900"
      } sticky top-0 z-50 shadow-md`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <NavLink to="/" className="flex-shrink-0">
            <img
              className="h-8 w-auto"
              src={navLight ? logoDark : logoLight}
              alt="Logo"
            />
          </NavLink>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  end={item.path === "/"}
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                      isActive
                        ? "text-white bg-purple-700"
                        : `${
                            navLight
                              ? "text-gray-700 hover:bg-gray-100"
                              : "text-gray-300 hover:bg-gray-700"
                          }`
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              ))}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md focus:outline-none"
              aria-controls="mobile-menu"
              aria-expanded={isMenuOpen}
              style={{
                color: navLight ? "#374151" : "#fff",
                backgroundColor: isMenuOpen
                  ? navLight
                    ? "#f3f4f6"
                    : "#4b5563"
                  : "transparent",
              }}
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden ${isMenuOpen ? "block" : "hidden"}`}
        id="mobile-menu"
      >
        <div
          className={`px-2 pt-2 pb-3 space-y-1 sm:px-3 ${
            bgLight ? "bg-white" : "bg-gray-900"
          }`}
        >
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.path === "/"}
              className={({ isActive }) =>
                `block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                  isActive
                    ? "text-white bg-purple-700"
                    : `${
                        navLight
                          ? "text-gray-700 hover:bg-gray-100"
                          : "text-gray-300 hover:bg-gray-700"
                      }`
                }`
              }
              onClick={() => setIsMenuOpen(false)}
            >
              {item.name}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
}

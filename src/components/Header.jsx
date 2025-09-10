import React, { useState } from "react";
import { Menu, ChevronDown } from "lucide-react";
import axios from "axios";

export default function Header({ children, onSearchResults }) {
  const initialMenuItems = [
    { name: "Home", hasSubmenu: false, isOpen: false },
    { name: "About", hasSubmenu: true, isOpen: false },
    { name: "Pricing", hasSubmenu: false, isOpen: false },
  ];

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menuItems, setMenuItems] = useState(initialMenuItems);

  // For mobile: toggle submenu open/close
  const handleMobileItemClick = (index) => {
    setMenuItems((prev) =>
      prev.map((item, i) =>
        i === index && item.hasSubmenu
          ? { ...item, isOpen: !item.isOpen }
          : item
      )
    );
  };

  const [query, setQuery] = useState("");
  const [shows, setShows] = useState([]);

  const searchTV = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get("https://api.tvmaze.com/search/shows", {
        params: { q: query },
      });
      setShows(res.data);
      onSearchResults(res.data);
    } catch (error) {
      console.log("Oops, terjadi kesalahan!", error);
    }
  };

  // For desktop: open submenu on hover
  const handleMouseEnter = (index) => {
    setMenuItems((prev) =>
      prev.map((item, i) =>
        i === index && item.hasSubmenu ? { ...item, isOpen: true } : item
      )
    );
  };

  const handleMouseLeave = (index) => {
    setMenuItems((prev) =>
      prev.map((item, i) =>
        i === index && item.hasSubmenu ? { ...item, isOpen: false } : item
      )
    );
  };

  return (
    <div>
      <header className="h-16 text-[15px] fixed inset-0 flex items-center justify-center bg-[#18181A] z-50">
        <nav className="px-3.5 flex items-center justify-between w-full max-w-7xl mx-auto">
          <div className="flex items-center gap-x-3 z-[999] relative">
            <img src="/vite.svg" alt="Logo" className="size-8" />
            <h3 className="text-lg font-semibold text-white">Ray Films</h3>
          </div>

          {/* Search Bar */}
          <form
            className=" flex-1 max-w-md mx-8  flex items-center gap-2"
            onSubmit={searchTV}
          >
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search..."
              className="w-full px-4 py-2 rounded-lg bg-[#2A2A2D] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Search
            </button>
          </form>

          {/* Mobile Menu */}
          <div className="lg:hidden">
            <Menu
              onClick={() => setIsMenuOpen((v) => !v)}
              className="w-6 h-6 text-white cursor-pointer"
            />
            {/* Mobile Sidebar */}
            <div
              className={`fixed top-16 left-0 w-64 h-[calc(100vh-4rem)] bg-[#18181A] z-50 transition-transform duration-300 ${
                isMenuOpen ? "translate-x-0" : "-translate-x-full"
              }`}
            >
              <ul className="flex flex-col p-4 space-y-4">
                {menuItems.map((item, index) => (
                  <li
                    key={index}
                    className="relative cursor-pointer"
                    onClick={() => handleMobileItemClick(index)}
                  >
                    <div className="flex items-center justify-between">
                      {item.name}
                      {item.hasSubmenu && (
                        <ChevronDown
                          className={`w-4 h-4 transition-transform ${
                            item.isOpen ? "rotate-180" : ""
                          }`}
                        />
                      )}
                    </div>
                    {item.hasSubmenu && item.isOpen && (
                      <div className="pl-4 mt-2 space-y-2">
                        <div className="py-2">Submenu Item 1</div>
                        <div className="py-2">Submenu Item 2</div>
                        <div className="py-2">Submenu Item 3</div>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Desktop Menu */}
          <ul className="hidden lg:flex items-center space-x-6 text-white">
            {menuItems.map((item, index) => (
              <li
                key={index}
                className="relative cursor-pointer"
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={() => handleMouseLeave(index)}
              >
                <div className="flex items-center gap-x-1">
                  {item.name}
                  {item.hasSubmenu && (
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${
                        item.isOpen ? "rotate-180" : ""
                      }`}
                    />
                  )}
                </div>
                {item.hasSubmenu && item.isOpen && (
                  <div className="absolute top-full left-0 bg-[#18181A] py-2 px-4 rounded-md min-w-[150px] mt-2">
                    <ul className="space-y-2">
                      <li>Submenu Item 1</li>
                      <li>Submenu Item 2</li>
                      <li>Submenu Item 3</li>
                    </ul>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </header>
      <div className="pt-16">{children}</div>
    </div>
  );
}

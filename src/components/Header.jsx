import React, { useState } from "react";
import { Menu, ChevronDown } from "lucide-react";
import axios from "axios";

export default function Header({ children, onSearchResults }) {
  const initialMenuItems = [
    { name: "Home", hasSubmenu: false, isOpen: false, href: "/" },
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

  const searchTV = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get("https://api.tvmaze.com/search/shows", {
        params: { q: query },
      });
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
      <header className="h-16 text-[15px] fixed inset-0 flex items-center justify-center bg-gradient-to-r from-[#0f172a] via-[#1e293b] to-[#0f172a] shadow-lg z-50 border-b border-indigo-700/40">
        <nav className="px-3.5 flex items-center justify-between w-full max-w-7xl mx-auto">
          <div className="flex items-center gap-x-3 z-[999] relative">
            <img
              src="/vite.svg"
              alt="Logo"
              className="size-8 drop-shadow-glow"
            />
            <h3 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-cyan-400 to-purple-500 tracking-widest futuristic-font">
              Ray's Film
            </h3>
          </div>

          {/* Search Bar */}
          <form
            className="flex-1 max-w-md mx-8 flex items-center gap-2"
            onSubmit={searchTV}
          >
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search..."
              className="w-full px-4 py-2 rounded-lg bg-[#18181A] text-white placeholder-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 border border-indigo-700/40 shadow-inner"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-cyan-500 text-white rounded-lg hover:from-cyan-500 hover:to-indigo-500 transition-all focus:outline-none focus:ring-2 focus:ring-cyan-400 shadow-md"
            >
              Search
            </button>
          </form>

          {/* Desktop Menu */}
          <ul className="hidden lg:flex items-center space-x-8 text-white">
            {menuItems.map((item, index) => (
              <li
                key={index}
                className="relative cursor-pointer group"
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={() => handleMouseLeave(index)}
              >
                <div className="flex items-center gap-x-1 px-2 py-1 futuristic-font">
                  {item.href ? (
                    <a href={item.href} className="relative">
                      {item.name}
                      <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-gradient-to-r from-cyan-400 to-indigo-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full"></span>
                    </a>
                  ) : (
                    <span className="relative">
                      {item.name}
                      <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-gradient-to-r from-cyan-400 to-indigo-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full"></span>
                    </span>
                  )}
                  {item.hasSubmenu && (
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${
                        item.isOpen ? "rotate-180" : ""
                      }`}
                    />
                  )}
                </div>
                {item.hasSubmenu && item.isOpen && (
                  <div className="absolute top-full left-0 bg-[#18181A] py-2 px-4 rounded-md min-w-[150px] mt-2 border border-cyan-400/20 shadow-xl">
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
        </nav>
      </header>
      <div className="pt-16 bg-gradient-to-br from-[#0f172a] via-[#18181A] to-[#1e293b] min-h-screen">
        {children}
      </div>
      <style>{`
        .futuristic-font {
          font-family: 'Orbitron', 'Montserrat', 'Segoe UI', Arial, sans-serif;
          letter-spacing: 0.08em;
        }
        .drop-shadow-glow {
          filter: drop-shadow(0 0 8px #38bdf8) drop-shadow(0 0 16px #6366f1);
        }
      `}</style>
    </div>
  );
}

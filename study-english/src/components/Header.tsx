import Logo from "@/assets/apple.svg?react";
import {
  AiOutlineMenu,
  AiOutlineSearch,
  AiOutlineShopping,
} from "react-icons/ai";
import { useState, type KeyboardEvent } from "react";
import DarkToggle from "./DarkToggle";
import { NavLink, useNavigate } from "react-router-dom";
import { SHOPPING_PAGES } from "@/assets/data/path.js";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (query.trim()) {
        navigate(`/search?query=${encodeURIComponent(query)}`);
        setQuery("");
      }
    }
  };
  return (
    <nav className="flex items-center justify-between sticky px-4 h-16 top-0 z-50 bg-apple-light dark:bg-apple-dark backdrop-blur-xl shadow-md">
      <NavLink to="/" className="text-xl font-bold">
        <Logo className="w-6 h-6 hover:scale-105 transition-transform duration-200 dark:fill-white" />
      </NavLink>
      <div
        className="gap-6 hidden md:flex mx-auto   text-apple-text-light
       dark:text-apple-text-dark"
      >
        {SHOPPING_PAGES.map((page) => (
          <NavLink
            key={page.path}
            to={page.path}
            end
            className={({ isActive }) =>
              `hover:text-apple-blue  ${isActive ? "text-apple-blue font-extrabold" : "text-apple-text-light dark:text-apple-text-dark"}`
            }
          >
            {page.title}
          </NavLink>
        ))}
      </div>
      {isSearchOpen && (
        <div className="relative">
          <input
            type="text"
            className="peer border border-gray-300 rounded-lg px-4 py-2 width-64 focus:outline-none focus:ring-2 focus:ring-apple-blue transition duration-300"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <label
            className="absolute  left-4 top-2 peer-focus:-top-2 peer-focus:text-sm peer-focus:text-apple-blue
            transition
            text-apple-text-light
            dark:text-apple-text-dark transition-all duration-300 pointer-events-none"
          >
            搜索...
          </label>
        </div>
      )}
      <div className="gap-2 text-apple-text-light dark:text-apple-text-dark space-x-2">
        <button>
          <AiOutlineSearch
            size={24}
            onClick={() => {
              setIsSearchOpen(!isSearchOpen);
            }}
          />
        </button>
        <DarkToggle />
        <button
          className=""
          onClick={() => {
            navigate("/cart");
          }}
        >
          <AiOutlineShopping size={24} />
        </button>
        <button
          className="md:hidden"
          onClick={() => {
            setIsMenuOpen(!isMenuOpen);
          }}
        >
          <AiOutlineMenu size={24} />
        </button>
      </div>

      <div
        className={`md:hidden fixed top-0 right-0 h-full w-64 ${!isMenuOpen && "hidden"}`}
      >
        <div
          className="flex flex-col mt-17 space-y-6 bg-apple-light dark:bg-apple-dark text-center p-6 rounded-lg shadow-lg   text-apple-text-light
       dark:text-apple-text-dark"
        >
          {SHOPPING_PAGES.map((page) => (
            <NavLink
              key={page.path}
              to={page.path}
              end
              className={({ isActive }) =>
                `hover:text-apple-blue  ${isActive ? "text-apple-blue font-extrabold" : "text-apple-text-light dark:text-apple-text-dark"}`
              }
              onClick={() => setIsMenuOpen(false)}
            >
              {page.title}
            </NavLink>
          ))}
        </div>
        {isMenuOpen && (
          <div
            className="fixed inset-0 bg-apple-black/50 dark:bg-apple-white/50 backdrop-blur-md z-40"
            onClick={() => {
              setIsMenuOpen(false);
            }}
          ></div>
        )}
      </div>
    </nav>
  );
}

export default Header;

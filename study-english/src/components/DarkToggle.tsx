import { FiMoon, FiSun } from "react-icons/fi";
import { useEffect, useState } from "react";

function DarkToggle() {
  const [isDark, setIsDark] = useState(() => {
    // 优先读取用户上次的选择
    const saved = localStorage.getItem("theme");
    if (saved) return saved === "dark";
    // 否则跟随系统主题
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  const toggleDark = () => {
    setIsDark((prev) => !prev);
  };

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  return (
    <button
      type="button"
      aria-label={isDark ? "切换为浅色模式" : "切换为深色模式"}
      className="p-1 bg-gray-200 dark:bg-gray-600 rounded-full
    hover:bg-gray-300 dark:hover:bg-gray-400 transition-all duration-300
    hover:rotate-12
    "
      onClick={toggleDark}
    >
      {!isDark ? (
        <FiMoon
          size={24}
          className="text-gray-800 dark:text-gray-200 animate-pulse"
        />
      ) : (
        <FiSun size={24} className="text-yellow-600 animate-pulse" />
      )}
    </button>
  );
}

export default DarkToggle;

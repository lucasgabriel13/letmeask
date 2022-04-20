import { useEffect, useState } from "react";
import "../styles/buttonTheme.scss";

export function ButtonTheme() {
  const [theme, setTheme] = useState(() => {
    const storageTheme = localStorage.getItem("theme");

    if (storageTheme) {
      return storageTheme;
    }
    return "light";
  });

  useEffect(() => {
    const html = document.querySelector("html");

    if (theme === "dark") {
      html?.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      html?.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [theme]);

  function toggleTheme() {
    setTheme(theme === "light" ? "dark" : "light");
  }

  return (
    <div className="toggle">
      <input
        id="switch"
        type="checkbox"
        name="theme"
        onChange={toggleTheme}
        checked={theme === "dark" ? true : false}
      />
      <label htmlFor="switch"></label>
    </div>
  );
}

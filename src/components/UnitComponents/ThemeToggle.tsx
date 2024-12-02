"use client";

import { useTheme } from "next-themes";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import { Switch } from "@/components/ui/switch";

const ThemeToggle = () => {
  const { setTheme } = useTheme();
  const [darkTheme, setDarkTheme] = useState<boolean>(true);
  
  const handleThemeChange = () => {
    const theme = darkTheme ? "light" : "dark";
    setTheme(theme);
    setDarkTheme((prev) => !prev);
  };

  return (
    <div className="absolute top-5 right-5 flex flex-row gap-5 ">
      {!darkTheme ? (
        <FontAwesomeIcon icon={faMoon} />
      ) : (
        <div className="w-[20px]"> </div>
      )}
      <Switch onClick={handleThemeChange} />
      {darkTheme ? (
        <FontAwesomeIcon icon={faSun} />
      ) : (
        <div className="w-[20px]"> </div>
      )}
    </div>
  );
};

export default ThemeToggle;

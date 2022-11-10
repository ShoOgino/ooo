import React, { useEffect, useState, useRef } from "react";
import Header from "../components/header";
import styles from "../styles/Index.module.css";

export default function Index() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    if (localStorage.getItem("dark-mode-settings") === "dark") {
      setIsDarkMode(true);
    } else if (localStorage.getItem("dark-mode-settings") === "light") {
      setIsDarkMode(false);
    }
  }, []);

  return (
    <div className={`${isDarkMode ? styles.dark : styles.light}`}>
      <Header isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}></Header>
      <div>aa</div>
      <div>test</div>
    </div>
  );
}

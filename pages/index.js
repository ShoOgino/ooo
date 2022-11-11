import React, { useEffect, useState, useRef } from "react";
import Header from "../components/header";
import styles from "../styles/Index.module.css";

export default function Index() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("isDarkMode") === "dark") {
      setIsDarkMode(true);
    } else if (localStorage.getItem("isDarkMode") === "light") {
      setIsDarkMode(false);
    }
  }, []);

  return (
    <div
      className={`${isDarkMode ? styles.dark : styles.light} ${styles.back}`}
    >
      <Header isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}></Header>
      <div>aa</div>
      <div>test</div>
    </div>
  );
}

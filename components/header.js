import React, { useEffect, useState, useRef } from "react";
import styles from "../styles/Header.module.css";
import MaterialUISwitch from "../components/switch.js";
import FormControlLabel from "@mui/material/FormControlLabel";
import Link from "next/link";

const Header = (props) => {
  const [isShow, setIsShow] = useState(true);
  const [scrollY, setScrollY] = useState(0);
  const scrollYRef = useRef(null);
  scrollYRef.current = scrollY;

  const handleScroll = () => {
    setIsShow(window.scrollY < scrollYRef.current);
    setScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <br />
      <br />
      <div
        id={styles.scrollArea}
        className={`${isShow ? "" : styles.hide}
          ${scrollY == 0 ? styles.fixed : styles.fixed}
          `}
        style={{ display: "flex" }}
      >
        <Link href={`/`}>タイトル</Link>
      </div>
    </>
  );
};
export default Header;

import React, { useEffect, useState, useRef } from "react";
import styles from "../styles/Header.module.css";
import MaterialUISwitch from "../components/switch.js";
import FormControlLabel from "@mui/material/FormControlLabel";

const Header = (props) => {
  const [isShow, setIsShow] = useState(true);
  const [scrollY, setScrollY] = useState(0);
  const scrollYRef = useRef(null);
  scrollYRef.current = scrollY;

  const handleScroll = () => {
    setIsShow(window.scrollY < scrollYRef.current);
    setScrollY(window.scrollY);
  };

  const handleToggle = (event) => {
    props.setIsDarkMode(event.target.checked);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div
        id={styles.scrollArea}
        className={`${isShow ? "" : styles.hide}
          ${scrollY == 0 ? styles.top : styles.fixed}
          `}
        style={{ display: "flex" }}
      >
        タイトル
        <FormControlLabel
          control={<MaterialUISwitch sx={{ m: 1 }} defaultChecked />}
          className={styles.switch}
          onChange={handleToggle}
        />
      </div>
    </>
  );
};
export default Header;

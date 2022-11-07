import React, { useEffect, useState, useRef } from "react";
import styles from "../styles/Header.module.css";
import Switch from "@mui/material/Switch";
import MaterialUISwitch from "../components/switch.js";
import FormControlLabel from "@mui/material/FormControlLabel";
import { positions } from "@mui/system";

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
      <div
        id={styles.scrollArea}
        className={`${isShow ? "" : styles.hide}
          ${scrollY == 0 ? styles.top : styles.fixed}`}
        style={{ display: "flex" }}
      >
        objective oriented optimizer
        <FormControlLabel
          control={<MaterialUISwitch sx={{ m: 1 }} defaultChecked />}
          className={styles.switch}
        />
      </div>
    </>
  );
};
export default Header;

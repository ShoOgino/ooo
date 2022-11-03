import React, { useEffect, useState, useRef } from "react";
import styles from "../styles/Header.module.css";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";

const Header = (props) => {
  const [isShow, setIsShow] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const scrollYRef = useRef(null);
  scrollYRef.current = scrollY;

  const handleScroll = () => {
    setIsShow(window.scrollY < scrollYRef.current);
    setScrollY(window.scrollY);
  };

  useEffect(() => {
    setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div id={styles.scrollArea}>
        <div>objective oriented optimizer</div>
        <FormControlLabel
          control={<Switch defaultChecked />}
          label="Darkmode"
        />
      </div>
      <div
        id={styles.scrollArea}
        className={`${isShow ? "" : styles.hide}`}
        style={{ position: "fixed" }}
      >
        <div>objective oriented optimizer</div>
        <FormControlLabel
          control={<Switch defaultChecked />}
          style={{ marginRight: 0, marginLeft: "auto", display: "block" }}
        />
      </div>
    </>
  );
};
export default Header;

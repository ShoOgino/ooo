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
    window.addEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div
        id={styles.scrollArea}
        className={`${isShow ? "" : styles.hide}
          ${scrollY == 0 ? styles.top : styles.fixed}`}
      >
        <div>
          objective oriented optimizer
          <FormControlLabel
            control={<Switch defaultChecked />}
            style={{ marginRight: 0, marginLeft: "auto" }}
          />
        </div>
      </div>
    </>
  );
};
export default Header;

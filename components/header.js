import React, { useEffect, useState, useRef } from "react";
import styles from "../styles/Header.module.css";
import Link from "next/link";

const Header = (props) => {
  const [isShow, setIsShow] = useState(true);
  const [scrollY, setScrollY] = useState(0);
  const scrollYRef = useRef(null);
  scrollYRef.current = scrollY;

  const handleScroll = () => {
    setIsShow(
      (window.scrollY < scrollYRef.current) | (scrollYRef.current < 30)
    );
    setScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div style={{ height: "20px" }}></div>
      <div
        id={styles.scrollArea}
        className={`${isShow ? "" : styles.hide}
          ${scrollY == 0 ? styles.fixed : styles.fixed} ${styles.marginLeft}
          `}
        style={{ display: "flex" }}
      >
        <div className={styles.title}>
          <Link href={`/`}>タイトル</Link>
        </div>
      </div>
    </>
  );
};
export default Header;

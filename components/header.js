import React, { useEffect, useState, useRef } from "react";
import styles from "../styles/Header.module.css";
import Link from "next/link";
import ImageBack from "../public/back.png";

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
      <div style={{ height: "21px" }}></div>
      <div
        id={styles.scrollArea}
        className={`${isShow ? "" : styles.hide}
          ${scrollY == 0 ? styles.fixed : styles.fixed} ${styles.marginLeft}
          `}
        style={{ display: "flex" }}
      >
        <div className={styles.outer}>
          {!props.flag && (
            <Link
              href={`/`}
              style={{ fontSize: 18, verticalAlign: -3, marginRight: 5 }}
            >
              ⮐
            </Link>
          )}
          タイトル
        </div>
      </div>
    </>
  );
};
export default Header;

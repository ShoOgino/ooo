import React, { useEffect, useState } from "react";
import Header from "../components/header";
import styles from "../styles/Index.module.css";
import Link from "next/link";

export default function Index(props) {
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
      {props.posts.map((post) => (
        <div>
          <Link href={`/article/${post.filename}`}>{post.title}</Link>
        </div>
      ))}
    </div>
  );
}

export const getStaticProps = async () => {
  const res = await fetch("http://localhost:3000/api/articles");
  const posts = await res.json();
  console.log(posts);
  const test = await Promise.all(posts);
  return {
    props: {
      posts: test,
    },
  };
};

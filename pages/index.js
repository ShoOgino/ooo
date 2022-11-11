import React, { useEffect, useState, useRef } from "react";
import Header from "../components/header";
import styles from "../styles/Index.module.css";
import Link from "next/link";
import path from "path";
import { promises as fs } from "fs";
import { simpleGit } from "simple-git";

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
      <div>
        {props.posts.map((post) => (
          <li>
            <h3>{post.filename}</h3>
            <p>{post.content}</p>
          </li>
        ))}
        <Link href="article">{props.data}</Link>
      </div>
    </div>
  );
}

export const getStaticProps = async () => {
  const options = {
    baseDir: process.cwd(),
    binary: "git",
    maxConcurrentProcesses: 6,
    trimmed: false,
  };
  // when setting all options in a single object
  const git = simpleGit(options);
  console.log(git.log());
  const postsDirectory = path.join(process.cwd(), "public");
  const filenames = await fs.readdir(postsDirectory);
  const posts = filenames.map(async (filename) => {
    const filePath = path.join(postsDirectory, filename);
    const fileContents = await fs.readFile(filePath, "utf8");
    return {
      filename,
      content: fileContents,
    };
  });
  return {
    props: {
      posts: await Promise.all(posts),
    },
  };
};

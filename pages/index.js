import React, { useEffect, useState } from "react";
import Header from "../components/header";
import styles from "../styles/Index.module.css";
import Link from "next/link";

export default function Index(props) {
  return (
    <div className={`${styles.back}`}>
      <Header></Header>
      <div className={styles.posts}>
        {props.posts.map((post) => (
          <div>
            <Link href={`/article/${post.filename}`}>{post.title}</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export const getStaticProps = async () => {
  const res = await fetch("http://localhost:3000/api/articles");
  const posts = await res.json();
  const test = await Promise.all(posts);
  return {
    props: {
      posts: test,
    },
  };
};

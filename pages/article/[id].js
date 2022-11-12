import React, { useEffect, useState, useRef } from "react";
import ReactMarkdown from "react-markdown";
import Header from "../../components/header";

export default function Article(props) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("isDarkMode") === "dark") {
      setIsDarkMode(true);
    } else if (localStorage.getItem("isDarkMode") === "light") {
      setIsDarkMode(false);
    }
  }, []);

  return (
    <>
      <Header isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}></Header>
      {props.revs.map((rev) => (
        <ReactMarkdown>{rev.content}</ReactMarkdown>
      ))}
    </>
  );
}
export const getStaticPaths = async () => {
  const res = await fetch("http://localhost:3000/api/articles");
  const json = await res.json();
  const paths = json.map((content) => `/article/${content.filename}`);
  return { paths, fallback: false };
};

export const getStaticProps = async (context) => {
  const id = context.params.id;
  const res = await fetch(`http://localhost:3000/api/article/${id}`);
  const json = await res.json();
  return {
    props: {
      revs: json.revs,
    },
  };
};

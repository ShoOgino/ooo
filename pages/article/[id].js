import React, { useEffect, useState, useRef } from "react";
import ReactMarkdown from "react-markdown";
import styles from "../../styles/Article.module.css";
import Header from "../../components/header";

export default function Article(props) {
  console.log(props.revs);
  const [isSelecteds, setIsSelecteds] = useState(
    [...Array(props.revs.length)].map((_, i) => i == props.revs.length - 1)
  );

  const handleSelect = (event) => {
    console.log(event.target.value);
    setIsSelecteds(isSelecteds.map((_, i) => i == event.target.value));
  };

  return (
    <>
      <Header></Header>
      <div className="col-auto my-1">
        <select className="form-control" id="sample" onChange={handleSelect}>
          {props.revs.map((rev) => (
            <option
              value={rev.id}
              key={rev.id}
              selected={isSelecteds[Number(rev.id)]}
            >
              {rev.id}
            </option>
          ))}
        </select>
      </div>
      {props.revs.map((rev) => (
        <div
          key={rev.id}
          className={styles.md}
          style={{ display: isSelecteds[rev.id] ? "block" : "none" }}
        >
          <ReactMarkdown>{rev.content}</ReactMarkdown>
        </div>
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

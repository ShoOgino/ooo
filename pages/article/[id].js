import React, { useEffect, useState, useRef } from "react";
import ReactMarkdown from "react-markdown";
import styles from "../../styles/Article.module.css";
import Header from "../../components/header";
import path from "path";
import { promises as fs } from "fs";
import { simpleGit } from "simple-git";

export default function Article(props) {
  const [isSelecteds, setIsSelecteds] = useState(
    [...Array(props.revs.length)].map((_, i) => i == props.revs.length - 1)
  );

  const handleSelect = (event) => {
    console.log(event.target.value);
    setIsSelecteds(isSelecteds.map((_, i) => i == event.target.value));
  };

  const selecter = (
    <select id="sample" onChange={handleSelect}>
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
  );

  return (
    <>
      <Header selecter={selecter}></Header>
      <div className={styles.background}>
        {props.revs.map((rev) => (
          <div
            key={rev.id}
            className={styles.md}
            style={{ display: isSelecteds[rev.id] ? "block" : "none" }}
          >
            <ReactMarkdown>{rev.content}</ReactMarkdown>
          </div>
        ))}
      </div>
    </>
  );
}
export const getStaticPaths = async () => {
  const postsDirectory = path.join(process.cwd(), "public", "articles");
  const filenames = await fs.readdir(postsDirectory);
  const posts = filenames.map(async (filename) => {
    const filePath = path.join(postsDirectory, filename);
    const workingDirectory = process.cwd();
    const git = simpleGit(workingDirectory);
    const log = await git.log({ file: filePath });
    const logs = log.all;
    //console.log(logs);
    let filepathNow = filePath.replace(/\\/, "/").replace("\\", "/");
    const revs = [];
    let p = Promise.resolve();
    logs.forEach((item) => {
      p = p.then(async () => {
        let tt = path
          .relative(process.cwd(), filepathNow)
          .replace(/\\/, "/")
          .replace("\\", "/")
          .replace("\n", "");
        const o = ["-p", item.hash + ":" + tt];
        const test = await git.catFile(o);

        const x = [
          item.hash + "^",
          item.hash,
          "--name-status",
          "--follow",
          "--",
          tt,
        ];
        const result = await git.diff(x);
        filepathNow = path.join(process.cwd(), result.split("\t")[1]);

        const rev = {
          content: test,
          date: item.date,
          message: item.message,
        };
        revs.push(rev);
      });
    });
    await p;
    const test = await Promise.all(revs);
    await test.sort(function (a, b) {
      var dateA = new Date(a.date);
      var dateB = new Date(b.date);
      if (dateA <= dateB) {
        return -1;
      } else {
        return 1;
      }
    });
    return {
      filename: filename,
      title: (await test[test.length - 1]).content
        .matchAll("^# [^\\n]*")
        .next()
        .value[0].substr(2),
      dateCreated: (await test[0]).date,
    };
  });
  const json = await Promise.all(posts);
  const paths = json.map((content) => `/article/${content.filename}`);
  return { paths, fallback: false };
};

export const getStaticProps = async (context) => {
  const postsDirectory = path.join(process.cwd(), "public", "articles");
  const filename = context.params.id;
  const filePath = path.join(postsDirectory, filename);
  const workingDirectory = process.cwd();
  const git = simpleGit(workingDirectory);
  const log = await git.log({ file: filePath });
  const logs = log.all;
  let revs = [];
  let p = Promise.resolve();
  let filepathNow = filePath.replace(/\\/, "/").replace("\\", "/");
  logs.forEach((item, index) => {
    p = p.then(async () => {
      let tt = path
        .relative(process.cwd(), filepathNow)
        .replace(/\\/, "/")
        .replace("\\", "/")
        .replace("\n", "");
      const o = ["-p", item.hash + ":" + tt];
      const test = await git.catFile(o);

      const x = [
        item.hash + "^",
        item.hash,
        "--name-status",
        "--follow",
        "--",
        tt,
      ];
      const result = await git.diff(x);
      filepathNow = path.join(process.cwd(), result.split("\t")[1]);

      const rev = {
        id: logs.length - 1 - index,
        content: test,
        date: item.date,
        message: item.message,
      };
      revs.push(rev);
    });
  });
  await p;
  const test = await Promise.all(revs);
  test.sort(function (a, b) {
    var dateA = new Date(a.date);
    var dateB = new Date(b.date);
    if (dateA < dateB) {
      return -1;
    } else {
      return 1;
    }
  });
  const result = {
    title: (await test[test.length - 1].content)
      .matchAll("^# [^\\n]*")
      .next()
      .value[0].substr(2),
    revs: await test,
  };
  return {
    props: {
      revs: result.revs,
    },
  };
};

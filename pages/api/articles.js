import path from "path";
import { promises as fs } from "fs";
import { simpleGit } from "simple-git";

export default async function hello(req, res) {
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
        console.log(item.hash);
        console.log(filepathNow);

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
        console.log(filepathNow);

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
  const test = await Promise.all(posts);
  res.status(200).json(test);
}

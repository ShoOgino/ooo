import path from "path";
import { simpleGit } from "simple-git";

export default async function hello(req, res) {
  const postsDirectory = path.join(process.cwd(), "public", "articles");
  const filename = req.query.id;
  const filePath = path.join(postsDirectory, filename);
  const workingDirectory = process.cwd();
  const git = simpleGit(workingDirectory);
  const log = await git.log({ file: filePath });
  const logs = log.all;
  let revs = [];
  let p = Promise.resolve();
  let filepathNow = filePath.replace(/\\/, "/").replace("\\", "/");
  console.log(logs);
  logs.forEach((item, index) => {
    p = p.then(async () => {
      console.log(item.hash);
      console.log(filepathNow);
      let tt = path
        .relative(process.cwd(), filepathNow)
        .replace(/\\/, "/")
        .replace("\\", "/")
        .replace("\n", "");
      console.log(tt);
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
  res.status(200).json(result);
}

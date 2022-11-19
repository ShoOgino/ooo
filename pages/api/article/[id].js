import path from "path";
import { simpleGit } from "simple-git";

export default async function hello(req, res) {
  const postsDirectory = path.join(process.cwd(), "public");
  const filename = req.query.id;
  const filePath = path.join(postsDirectory, filename);
  const workingDirectory = process.cwd();
  const git = simpleGit(workingDirectory);
  const log = await git.log({ file: filePath });
  const logs = log.all.reverse();
  const revs = logs.map(async (item, index) => {
    const o = [
      "-p",
      item.hash +
        ":" +
        path.relative(process.cwd(), filePath).replace("\\", "/"),
    ];
    const content = await git.catFile(o);
    const rev = {
      id: index,
      content: content,
      date: item.date,
      message: item.message,
    };
    return rev;
  });
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

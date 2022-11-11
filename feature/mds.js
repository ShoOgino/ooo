import fs from "fs";

const print = () => {
  let text = fs.readFileSync("public/20221112_054600.md");
  console.log(text);
  return text;
};

export default print;

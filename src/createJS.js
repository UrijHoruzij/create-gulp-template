import fs from "fs";
import { promisify } from "util";
const writeFile = promisify(fs.writeFile);

const createJS = async (options) => {
  const contentMain = `/**
        * название функции
        *
        * @param {number} first - первое число
        * @returns {number}
        */`;
  switch (options.js) {
    case "JavaScript":
      writeFile(`${process.cwd()}/js/main.js`, contentMain, "utf8");
      break;
    case "TypeScript":
      writeFile(`${process.cwd()}/ts/main.ts`, contentMain, "utf8");
      break;
    case "CoffeeScript":
      writeFile(`${process.cwd()}/coffee/main.coffee`, contentMain, "utf8");
      break;
  }
};
export default createJS;

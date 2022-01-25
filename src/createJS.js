import fs from "fs";
import { promisify } from "util";
const writeFile = promisify(fs.writeFile);

const createJS = async (options) => {
  const contentGlobal = `console.log("global");`;
  const contentMain = `/**
        * название функции
        *
        * @param {number} first - первое число
        * @returns {number}
        */`;
  switch (options.js) {
    case "JavaScript":
      writeFile(`${process.cwd()}/js/global.js`, contentGlobal, "utf8");
      writeFile(`${process.cwd()}/js/main.js`, contentMain, "utf8");
      break;
    case "TypeScript":
      writeFile(`${process.cwd()}/ts/global.ts`, contentGlobal, "utf8");
      writeFile(`${process.cwd()}/ts/main.ts`, contentMain, "utf8");
      break;
    case "CoffeeScript":
      writeFile(`${process.cwd()}/coffee/global.coffee`, contentGlobal, "utf8");
      writeFile(`${process.cwd()}/coffee/main.coffee`, contentMain, "utf8");
      break;
  }
};
export default createJS;

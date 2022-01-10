import fs from "fs";
import { promisify } from "util";
const writeFile = promisify(fs.writeFile);

const createJS = async (options) => {
  switch (options.js) {
    case "JavaScript":
      writeFile(
        `${process.cwd()}/js/global.js`,
        `console.log("global");`,
        "utf8"
      );
      writeFile(
        `${process.cwd()}/js/main.js`,
        `/**
        * название функции
        *
        * @param {number} first - первое число
        * @returns {number}
        */`,
        "utf8"
      );
      break;
    case "TypeScript":
      break;
  }
};
export default createJS;

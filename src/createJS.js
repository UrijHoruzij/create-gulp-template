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
      writeFile(
        `${process.cwd()}/js/global.ts`,
        `console.log("global");`,
        "utf8"
      );
      writeFile(
        `${process.cwd()}/js/main.ts`,
        `/**
        * название функции
        *
        * @param {number} first - первое число
        * @returns {number}
        */`,
        "utf8"
      );
      break;
    case "CoffeeScript":
      writeFile(
        `${process.cwd()}/coffee/global.coffee`,
        `console.log("global");`,
        "utf8"
      );
      writeFile(
        `${process.cwd()}/coffee/main.coffee`,
        `/**
        * название функции
        *
        * @param {number} first - первое число
        * @returns {number}
        */`,
        "utf8"
      );
      break;
  }
};
export default createJS;

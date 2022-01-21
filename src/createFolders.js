import fs from "fs";

const createCssFolders = (prefix) => {
  fs.mkdirSync(prefix);
  fs.mkdirSync(`${prefix}/components`);
  fs.mkdirSync(`${prefix}/vendor`);
};
const createJsFolders = (prefix) => {
  fs.mkdirSync(prefix);
  fs.mkdirSync(`${prefix}/components`);
  fs.mkdirSync(`${prefix}/vendor`);
};
const createFolders = async (options) => {
  fs.mkdirSync("img");
  fs.mkdirSync("img/svg");
  fs.mkdirSync("partials");
  fs.mkdirSync("resources");
  fs.mkdirSync("resources/fonts");
  switch (options.css) {
    case "SASS":
      createCssFolders("scss");
      fs.mkdirSync("scss/mixins");
      break;
    case "LESS":
      createCssFolders("less");
      fs.mkdirSync("less/mixins");
      break;
    case "Stylus":
      createCssFolders("stylus");
      fs.mkdirSync("stylus/mixins");
      break;
    case "CSS3":
      createCssFolders("css");
      break;
  }
  switch (options.js) {
    case "JavaScript":
      createJsFolders("js");
      break;
    case "TypeScript":
      createJsFolders("ts");
      break;
    case "CoffeeScript":
      createJsFolders("coffee");
      break;
  }
};
export default createFolders;

import fs from "fs";

const createFolders = async (options) => {
  fs.mkdirSync("img");
  fs.mkdirSync("img/svg");
  fs.mkdirSync("partials");
  fs.mkdirSync("resources");
  fs.mkdirSync("resources/fonts");
  switch (options.css) {
    case "SASS":
      fs.mkdirSync("scss");
      fs.mkdirSync("scss/components");
      fs.mkdirSync("scss/mixins");
      fs.mkdirSync("scss/vendor");
      break;
    case "LESS":
      fs.mkdirSync("less");
      fs.mkdirSync("less/components");
      fs.mkdirSync("less/mixins");
      fs.mkdirSync("less/vendor");
      break;
    case "Stylus":
      fs.mkdirSync("stylus");
      fs.mkdirSync("stylus/components");
      fs.mkdirSync("stylus/mixins");
      fs.mkdirSync("stylus/vendor");
      break;
    case "CSS3":
      fs.mkdirSync("css");
      fs.mkdirSync("css/components");
      fs.mkdirSync("css/vendor");
      break;
  }
  switch (options.js) {
    case "JavaScript":
      fs.mkdirSync("js");
      fs.mkdirSync("js/components");
      fs.mkdirSync("js/vendor");
      break;
    case "TypeScript":
      fs.mkdirSync("ts");
      fs.mkdirSync("ts/components");
      fs.mkdirSync("ts/vendor");
      break;
    case "CoffeeScript":
      fs.mkdirSync("coffee");
      fs.mkdirSync("coffee/components");
      fs.mkdirSync("coffee/vendor");
      break;
  }
};
export default createFolders;

import fs from "fs";
import { promisify } from "util";
const writeFile = promisify(fs.writeFile);

const createHTML = async (options) => {
  const htmlTemplate = `<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="shortcut icon" href="img/favicon.ico" type="image/x-icon">
    <meta name="theme-color" content="#111111">
    <title>Document</title>
    <link rel="stylesheet" href="css/global.css">
    <link rel="stylesheet" href="css/vendor.css">
    <link rel="stylesheet" href="css/main.css">
</head>
<body>
    <!-- @include('partials/header.html') пример инклуда -->
    <script src="js/vendor.js"></script>
    <script src="js/main.js"></script>
</body>
</html>`;
  const htmlHeaderTemplate = `<header>
  </header>
`;
  const htmlFooterTemplate = `<footer>
  </footer>`;
  const pugTemplate = `doctype html
html(lang="ru")
  head
    meta(charset="utf-8")
    meta(http-equiv="X-UA-Compatible" content="IE=edge")
    meta(name="viewport" content="width=device-width, initial-scale=1.0")
    link(rel="shortcut icon" href="img/favicon.ico" type="image/x-icon")
    meta(name="theme-color" content="#111111")
    title= "Document"
    link(rel="stylesheet" href="css/global.css)
    link(rel="stylesheet" href="css/vendor.css")
    link(rel="stylesheet" href="css/main.css")
  body
      // include partials/header.pug
      script(src="js/vendor.js")
      script(src="js/main.js")`;
  const pugHeaderTemplate = `header`;
  const pugFooterTemplate = `footer`;
  const hamlTemplate = `!!! 5
%html
  %head
    %meta{charset: "utf-8"}
    %meta{name:"viewport", content:"width:device-width, initial-scale=1.0"}
    %link{href:"img/favicon.ico", type:"image/x-icon", rel:"shortcut icon"}
    %meta{name:"theme-color", content:"#111111"}
    %title Document
    %link{href:"css/global.css", type:"text/css", rel:"stylesheet"}
    %link{href:"css/vendor.css", type: "text/css", rel:"stylesheet"}
    %link{href:"css/main.css", type:"text/css", rel:"stylesheet"}
  %body 
    %script{src:"js/vendor.js"}
    %script{src:"js/main.js"}
  `;
  const nunjucksTemplate = `<!doctype html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="shortcut icon" href="img/favicon.ico" type="image/x-icon">
    <meta name="theme-color" content="#111111">
    <title>Document</title>
    <link rel="stylesheet" href="css/global.css">
    <link rel="stylesheet" href="css/vendor.css">
    <link rel="stylesheet" href="css/main.css">
</head>
<body>        
  <script src="js/vendor.js"></script>
  <script src="js/main.js"></script>
</body>
</html>
  `;
  switch (options.html) {
    case "HTML5":
      writeFile(`${process.cwd()}/index.html`, htmlTemplate, "utf8");
      writeFile(
        `${process.cwd()}/partials/header.html`,
        htmlHeaderTemplate,
        "utf8"
      );
      writeFile(
        `${process.cwd()}/partials/footer.html`,
        htmlFooterTemplate,
        "utf8"
      );
    case "Pug":
      writeFile(`${process.cwd()}/index.pug`, pugTemplate, "utf8");
      writeFile(
        `${process.cwd()}/partials/header.pug`,
        pugHeaderTemplate,
        "utf8"
      );
      writeFile(
        `${process.cwd()}/partials/footer.pug`,
        pugFooterTemplate,
        "utf8"
      );
    case "HAML":
      return writeFile(`${process.cwd()}/index.haml`, hamlTemplate, "utf8");
    case "Nunjucks":
      return writeFile(`${process.cwd()}/index.html`, nunjucksTemplate, "utf8");
  }
};
export default createHTML;

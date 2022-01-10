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
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="theme-color" content="#111111">
    <title>Document</title>
    <link rel="stylesheet" href="css/global.css">
    <link rel="stylesheet" href="css/vendor.css">
    <link rel="stylesheet" href="css/main.css">
</head>
<body>
    <!-- @include('html/h1.html') пример инклуда -->
    <script src="js/vendor.js"></script>
    <script src="js/main.js"></script>
</body>
</html>`;
  switch (options.html) {
    case "HTML5":
      return writeFile(`${process.cwd()}/index.html`, htmlTemplate, "utf8");
    case "Pug":
      return;
  }
};
export default createHTML;

import fs from "fs";
import { promisify } from "util";
const writeFile = promisify(fs.writeFile);

const createCSS = async (options) => {
  switch (options.css) {
    case "SASS":
      writeFile(
        `${process.cwd()}/scss/vendor/normalize.css`,
        fs.readFileSync(__dirname + "/normalize.css", (err, data) => {
          if (err) console.log(err);
          return data;
        }),
        "utf8"
      );
      writeFile(
        `${process.cwd()}/scss/mixins/_font-face.scss`,
        `@mixin font-face($font-family, $url, $weight, $style) {
  @font-face {
    font-family: "#{$font-family}";
    src: url("../fonts/#{$url}.woff2") format("woff2");
    font-weight: #{$weight};
    font-display: swap;
    font-style: $style;
  }
}`,
        "utf8"
      );
      writeFile(
        `${process.cwd()}/scss/_fonts.scss`,
        `// @include font-face("Muller", "../fonts/MullerRegular", 400, normal);`,
        "utf8"
      );
      writeFile(
        `${process.cwd()}/scss/_mixins.scss`,
        `@import "./mixins/font-face";`,
        "utf8"
      );
      writeFile(
        `${process.cwd()}/scss/_vars.scss`,
        `:root {
  --color-black: #000;
  --color-white: #fff;
}`,
        "utf8"
      );
      writeFile(
        `${process.cwd()}/scss/global.scss`,
        `@import "vars";
@import "mixins";
@import "fonts";`,
        "utf8"
      );
      writeFile(
        `${process.cwd()}/scss/main.scss`,
        ` @import 'vars';
// @import "./components/header";`,
        "utf8"
      );
      writeFile(
        `${process.cwd()}/scss/vendors.scss`,
        `@import "./vendor/normalize";`,
        "utf8"
      );
      break;
    case "LESS":
      writeFile(
        `${process.cwd()}/less/vendor/normalize.less`,
        fs.readFileSync(__dirname + "/normalize.css", (err, data) => {
          if (err) console.log(err);
          return data;
        }),
        "utf8"
      );
      writeFile(
        `${process.cwd()}/less/mixins/font-face.less`,
        `.font-face(@font-family, @url, @weight, @style) {
  @font-face {
    font-family: @font-family;
    src: url("../fonts/{@url}.woff2") format("woff2");
    font-weight: @weight;
    font-display: swap;
    font-style: $style;
  }
}`,
        "utf8"
      );
      writeFile(
        `${process.cwd()}/less/fonts.less`,
        `// @include font-face("Muller", "../fonts/MullerRegular", 400, normal);`,
        "utf8"
      );
      writeFile(
        `${process.cwd()}/less/mixins.less`,
        `@import "./mixins/font-face";`,
        "utf8"
      );
      writeFile(
        `${process.cwd()}/less/vars.less`,
        `:root {
  --color-black: #000;
  --color-white: #fff;
}`,
        "utf8"
      );
      writeFile(
        `${process.cwd()}/less/global.less`,
        `@import "vars";
@import "mixins";
@import "fonts";`,
        "utf8"
      );
      writeFile(
        `${process.cwd()}/less/main.less`,
        ` @import 'vars';
// @import "./components/header";`,
        "utf8"
      );
      writeFile(
        `${process.cwd()}/less/vendors.less`,
        `@import "./vendor/normalize";`,
        "utf8"
      );
      break;
    case "Stylus":
      writeFile(
        `${process.cwd()}/stylus/vendor/normalize.styl`,
        fs.readFileSync(__dirname + "/normalize.css", (err, data) => {
          if (err) console.log(err);
          return data;
        }),
        "utf8"
      );
      writeFile(
        `${process.cwd()}/stylus/mixins/font-face.styl`,
        `font-url(file)
  return '../fonts/' + file

webfont(family, file,weight, style)
  @font-face
    font-family family
    src url(font-url(file + '.woff2')) format('woff2'), 
    font-weight weight
    font-style normal
    font-display swap
    font-style style
      `,
        "utf8"
      );
      writeFile(
        `${process.cwd()}/stylus/fonts.styl`,
        `// webfont("Muller", "../fonts/MullerRegular", 400, normal);`,
        "utf8"
      );
      writeFile(
        `${process.cwd()}/stylus/mixins.styl`,
        `@import "./mixins/font-face";`,
        "utf8"
      );
      writeFile(
        `${process.cwd()}/stylus/vars.styl`,
        `:root {
  --color-black: #000;
  --color-white: #fff;
}`,
        "utf8"
      );
      writeFile(
        `${process.cwd()}/stylus/global.styl`,
        `@import "vars";
@import "mixins";
@import "fonts";`,
        "utf8"
      );
      writeFile(
        `${process.cwd()}/stylus/main.styl`,
        ` @import 'vars';
      // @import "./components/header";`,
        "utf8"
      );
      writeFile(
        `${process.cwd()}/stylus/vendors.styl`,
        `@import "./vendor/normalize";`,
        "utf8"
      );
      break;
    case "CSS3":
      writeFile(
        `${process.cwd()}/css/vendor/normalize.css`,
        fs.readFileSync(__dirname + "/normalize.css", (err, data) => {
          if (err) console.log(err);
          return data;
        }),
        "utf8"
      );
      writeFile(
        `${process.cwd()}/css/fonts.css`,
        `/* @font-face {
          font-family: "#{$font-family}";
          src: url("../fonts/#{$url}.woff2") format("woff2");
          font-weight: #{$weight};
          font-display: swap;
          font-style: $style;
        } */`,
        "utf8"
      );
      writeFile(
        `${process.cwd()}/css/global.css`,
        `/* @import "vars";
        @import "fonts"; */`,
        "utf8"
      );
      writeFile(
        `${process.cwd()}/css/main.css`,
        `@import 'vars';
        /* @import "./components/header"; */`,
        "utf8"
      );
      writeFile(
        `${process.cwd()}/css/vars.css`,
        `:root {
          --color-black: #000;
          --color-white: #fff;
        }`,
        "utf8"
      );
      writeFile(
        `${process.cwd()}/css/vendor.css`,
        `@import "./vendor/normalize.css";`,
        "utf8"
      );
      break;
  }
};
export default createCSS;

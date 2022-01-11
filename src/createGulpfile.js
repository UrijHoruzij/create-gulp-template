import fs from "fs";
import { promisify } from "util";
const writeFile = promisify(fs.writeFile);

const htmlLibrary = (options) => {
  switch (options.html) {
    case "HTML5":
      return `import fileInclude from "gulp-file-include";`;
    case "Pug":
      return `import pug from 'gulp-pug';`;
  }
};
const cssLibrary = (options) => {
  switch (options.css) {
    case "CSS3":
      return ``;
    case "SASS":
      return `import dartSass from "sass";
import gulpSass from "gulp-sass";
const sass = gulpSass(dartSass);`;
    case "LESS":
      return `import less from "gulp-less";`;
    case "Stylus":
      return `import stylus from "gulp-stylus";`;
  }
};
const jsLibrary = (options) => {
  switch (options.js) {
    case "JavaScript":
      return ``;
    case "TypeScript":
      return ``;
  }
};
const html = (options) => {
  switch (options.html) {
    case "HTML5":
      return `const html = () => {
      return src(["./*.html"])
        .pipe(
          fileInclude({
            prefix: "@",
            basepath: "@file",
          })
        )
        .pipe(dest("./public"))
        .pipe(browserSync.stream());
    };`;
    case "Pug":
      return `const html = () => {
      return src(["./*.pug"])
        .pipe(
          pug()
        )
        .pipe(dest("./public"))
        .pipe(browserSync.stream());
    };`;
  }
};
const styles = (options) => {
  switch (options.css) {
    case "CSS3":
      return `const styles = () => {
  return src("./css/**/*.css")
    .pipe(gulpif(!isProd, sourcemaps.init()))
    .pipe(
      autoprefixer({
        cascade: false,
      })
    )
    .pipe(gulpif(isProd, cleanCSS({ level: 2 })))
    .pipe(gulpif(!isProd, sourcemaps.write(".")))
    .pipe(dest("./public/css/"))
    .pipe(browserSync.stream());
};`;
    case "SASS":
      return `const styles = () => {
  return src("./scss/**/*.scss")
    .pipe(gulpif(!isProd, sourcemaps.init()))
    .pipe(sass().on("error", notify.onError()))
    .pipe(
      autoprefixer({
        cascade: false,
      })
    )
    .pipe(gulpif(isProd, cleanCSS({ level: 2 })))
    .pipe(gulpif(!isProd, sourcemaps.write(".")))
    .pipe(dest("./public/css/"))
    .pipe(browserSync.stream());
};`;
    case "LESS":
      return `const styles = () => {
  return src("./less/**/*.less")
    .pipe(gulpif(!isProd, sourcemaps.init()))
    .pipe(less().on("error", notify.onError()))
    .pipe(
      autoprefixer({
        cascade: false,
      })
    )
    .pipe(gulpif(isProd, cleanCSS({ level: 2 })))
    .pipe(gulpif(!isProd, sourcemaps.write(".")))
    .pipe(dest("./public/css/"))
    .pipe(browserSync.stream());
};`;
    case "Stylus":
      return `const styles = () => {
  return src("./stylus/**/*.styl")
    .pipe(gulpif(!isProd, sourcemaps.init()))
    .pipe(stylus().on("error", notify.onError()))
    .pipe(
      autoprefixer({
        cascade: false,
      })
    )
    .pipe(gulpif(isProd, cleanCSS({ level: 2 })))
    .pipe(gulpif(!isProd, sourcemaps.write(".")))
    .pipe(dest("./public/css/"))
    .pipe(browserSync.stream());
};`;
  }
};
const scripts = (options) => {
  switch (options.js) {
    case "JavaScript":
      return `const scripts = () => {
  src("./js/vendor/**.js")
    .pipe(concat("vendor.js"))
    .pipe(gulpif(isProd, uglify().on("error", notify.onError())))
    .pipe(dest("./public/js/"));
  return src([
    "./js/global.js",
    "./js/components/**.js",
    "./js/main.js",
  ])
    .pipe(gulpif(!isProd, sourcemaps.init()))
    .pipe(
      babel({
        presets: ["@babel/env"],
      })
    )
    .pipe(concat("main.js"))
    .pipe(gulpif(isProd, uglify().on("error", notify.onError())))
    .pipe(gulpif(!isProd, sourcemaps.write(".")))
    .pipe(dest("./public/js"))
    .pipe(browserSync.stream());
};`;
    case "TypeScript":
      return ``;
  }
};
const watchCSS = (options) => {
  switch (options.css) {
    case "CSS3":
      return `watch("./css/**/*.css", styles);`;
    case "SASS":
      return `watch("./scss/**/*.scss", styles);`;
    case "LESS":
      return `watch("./less/**/*.less", styles);`;
    case "Stylus":
      return `watch("./stylus/**/*.styl", styles);`;
  }
};
const watchJS = (options) => {
  switch (options.js) {
    case "JavaScript":
      return `watch("./js/**/*.js", scripts);`;
    case "TypeScript":
      return ``;
  }
};
const watchHTML = (options) => {
  switch (options.html) {
    case "HTML5":
      return `watch("./partials/*.html", html);
  watch("./*.html", html);`;
    case "Pug":
      return `watch("./partials/*.pug", html);
  watch("./*.pug", html);`;
  }
};
const createGulpFile = async (options) => {
  let gulpfileTemplate = `import gulp from "gulp";
import autoprefixer from "gulp-autoprefixer";
import babel from "gulp-babel";
import cleanCSS from "gulp-clean-css";
import uglifyES from "gulp-uglify-es";
import del from "del";
import browserSync from "browser-sync";
import svgSprite from "gulp-svg-sprite";
import sourcemaps from "gulp-sourcemaps";
import rev from "gulp-rev";
import revRewrite from "gulp-rev-rewrite";
import revDel from "gulp-rev-delete-original";
import gulpif from "gulp-if";
import notify from "gulp-notify";
import image from "gulp-imagemin";
import { readFileSync } from "fs";
import concat from "gulp-concat";
import htmlmin from "gulp-htmlmin";
${htmlLibrary(options)}
${jsLibrary(options)}
${cssLibrary(options)}

browserSync.create();
const { src, dest, series, watch } = gulp;
const uglify = uglifyES.default;

let isProd = false;

const toProd = (done) => {
  isProd = true;
  done();
};
const clean = () => {
  return del(["public/*"]);
};
const cachePublic = () => {
  return src("public/**/*.{css,js,svg,png,jpg,jpeg,woff2}", {
    base: "public",
  })
    .pipe(rev())
    .pipe(revDel())
    .pipe(dest("public"))
    .pipe(rev.manifest("rev.json"))
    .pipe(dest("public"));
}
const rewrite = () => {
  const manifest = readFileSync("public/rev.json");
  src("public/css/*.css")
    .pipe(
      revRewrite({
        manifest,
      })
    )
    .pipe(dest("public/css"));
  return src("public/**/*.html")
    .pipe(
      revRewrite({
        manifest,
      })
    )
    .pipe(dest("public"));
};
const htmlMinify = () => {
  return src("public/**/*.html")
    .pipe(
      htmlmin({
        collapseWhitespace: true,
      })
    )
    .pipe(dest("public"));
};
const resources = () => {
  return src("./resources/**").pipe(dest("./public"));
};
const images = () => {
  return src([
    "./img/**.jpg",
    "./img/**.png",
    "./img/**.jpeg",
    "./img/*.svg",
    "./img/**/*.jpg",
    "./img/**/*.png",
    "./img/**/*.jpeg",
  ])
    .pipe(gulpif(isProd, image()))
    .pipe(dest("./public/img"));
};
const svgSprites = () => {
  return src("./img/svg/**.svg")
    .pipe(
      svgSprite({
        mode: {
          stack: {
            sprite: "../sprite.svg",
          },
        },
      })
    )
    .pipe(dest("./public/img"));
};

${html(options)}
${styles(options)}
${scripts(options)}

const watchFiles = () => {
  browserSync.init({
    server: {
      baseDir: "./public",
    },
  });
  ${watchCSS(options)}
  ${watchHTML(options)}
  ${watchJS(options)}
  watch("./resources/**", resources);
  watch("./img/*.{jpg,jpeg,png,svg}", images);
  watch("./img/**/*.{jpg,jpeg,png}", images);
  watch("./img/svg/**.svg", svgSprites);
};

export default series(
  clean,
  html,
  scripts,
  styles,
  resources,
  images,
  svgSprites,
  watchFiles
);

export const build = series(
  toProd,
  clean,
  html,
  scripts,
  styles,
  resources,
  images,
  svgSprites,
  htmlMinify
);

export const cache = series(cachePublic, rewrite);
  `;
  writeFile(`${process.cwd()}/gulpfile.js`, gulpfileTemplate, "utf8");
};

export default createGulpFile;

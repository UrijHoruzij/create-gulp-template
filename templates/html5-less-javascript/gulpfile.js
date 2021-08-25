const { src, dest, series, watch } = require("gulp");
const autoprefixer = require("gulp-autoprefixer");
const babel = require("gulp-babel");
const cleanCSS = require("gulp-clean-css");
const uglify = require("gulp-uglify-es").default;
const del = require("del");
const browserSync = require("browser-sync").create();
const less = require("gulp-less");
const svgSprite = require("gulp-svg-sprite");
const fileInclude = require("gulp-file-include");
const sourcemaps = require("gulp-sourcemaps");
const rev = require("gulp-rev");
const revRewrite = require("gulp-rev-rewrite");
const revDel = require("gulp-rev-delete-original");
const htmlmin = require("gulp-htmlmin");

const gulpif = require("gulp-if");
const notify = require("gulp-notify");
const image = require("gulp-image");
const { readFileSync } = require("fs");
const concat = require("gulp-concat");

let isProd = false; // dev by default

const clean = () => {
  return del(["public/*"]);
};

//svg sprite
const svgSprites = () => {
  return src("./src/img/svg/**.svg")
    .pipe(
      svgSprite({
        mode: {
          stack: {
            sprite: "../sprite.svg", //sprite file name
          },
        },
      })
    )
    .pipe(dest("./public/img"));
};

const styles = () => {
  return src("./src/less/**/*.less")
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
};

const scripts = () => {
  src("./src/js/vendor/**.js")
    .pipe(concat("vendor.js"))
    .pipe(gulpif(isProd, uglify().on("error", notify.onError())))
    .pipe(dest("./public/js/"));
  return src([
    "./src/js/global.js",
    "./src/js/components/**.js",
    "./src/js/main.js",
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
};

const resources = () => {
  return src("./src/resources/**").pipe(dest("./public"));
};

const images = () => {
  return src([
    "./src/img/**.jpg",
    "./src/img/**.png",
    "./src/img/**.jpeg",
    "./src/img/*.svg",
    "./src/img/**/*.jpg",
    "./src/img/**/*.png",
    "./src/img/**/*.jpeg",
  ])
    .pipe(gulpif(isProd, image()))
    .pipe(dest("./public/img"));
};

const htmlInclude = () => {
  return src(["./src/*.html"])
    .pipe(
      fileInclude({
        prefix: "@",
        basepath: "@file",
      })
    )
    .pipe(dest("./public"))
    .pipe(browserSync.stream());
};

const watchFiles = () => {
  browserSync.init({
    server: {
      baseDir: "./public",
    },
  });

  watch("./src/less/**/*.less", styles);
  watch("./src/js/**/*.js", scripts);
  watch("./src/partials/*.html", htmlInclude);
  watch("./src/*.html", htmlInclude);
  watch("./src/resources/**", resources);
  watch("./src/img/*.{jpg,jpeg,png,svg}", images);
  watch("./src/img/**/*.{jpg,jpeg,png}", images);
  watch("./src/img/svg/**.svg", svgSprites);
};

const cache = () => {
  return src("public/**/*.{css,js,svg,png,jpg,jpeg,woff2}", {
    base: "public",
  })
    .pipe(rev())
    .pipe(revDel())
    .pipe(dest("public"))
    .pipe(rev.manifest("rev.json"))
    .pipe(dest("public"));
};

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
    .pipe(dest("dist"));
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

const toProd = (done) => {
  isProd = true;
  done();
};

exports.default = series(
  clean,
  htmlInclude,
  scripts,
  styles,
  resources,
  images,
  svgSprites,
  watchFiles
);

exports.build = series(
  toProd,
  clean,
  htmlInclude,
  scripts,
  styles,
  resources,
  images,
  svgSprites,
  htmlMinify
);

exports.cache = series(cache, rewrite);

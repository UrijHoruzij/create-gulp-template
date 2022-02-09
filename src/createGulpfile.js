import fs from "fs";
import { promisify } from "util";
const writeFile = promisify(fs.writeFile);

const htmlLibrary = (options) => {
  switch (options.html) {
    case "HTML5":
      return `import fileInclude from "gulp-file-include";`;
    case "Pug":
      return `import pug from 'gulp-pug';`;
    case "HAML":
      return `import haml from 'gulp-haml';`;
    case "Nunjucks":
      return `import nunjucks from 'gulp-nunjucks';`;
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
      return `import ts from 'gulp-typescript';`;
    case "CoffeeScript":
      return `import coffee from 'gulp-coffee';`;
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
        .pipe(gulpif(isProd, htmlmin({
        collapseWhitespace: true,
      })))
        .pipe(dest("./public"))
        .pipe(browserSync.stream());
    };`;
    case "Pug":
      return `const html = () => {
      return src(["./*.pug"])
        .pipe(pug())
        .pipe(gulpif(isProd, htmlmin({
        collapseWhitespace: true,
      })))
        .pipe(dest("./public"))
        .pipe(browserSync.stream());
    };`;
    case "HAML":
      return `const html = () => {
      return src(["./*.haml"])
        .pipe(haml({
				compiler: 'visionmedia',
			}))
      .pipe(gulpif(isProd, htmlmin({
        collapseWhitespace: true,
      })))
        .pipe(dest("./public"))
        .pipe(browserSync.stream());
    };`;
    case "Nunjucks":
      return `const html = () => {
      return src(["./*.html"])
        .pipe(nunjucks.compile())
        .pipe(gulpif(isProd, htmlmin({
        collapseWhitespace: true,
      })))
        .pipe(dest("./public"))
        .pipe(browserSync.stream());
    };`;
  }
};
const styles = (options) => {
  const plugins = `const plugins = [autoprefixer({ browsers: ["last 1 version"] })]`;
  const stylesTemplate = `
  .pipe(postcss(plugins))
  .pipe(gulpif(isProd, cleanCSS({ level: 2 })))
  .pipe(gulpif(!isProd, sourcemaps.write(".")))
  .pipe(dest("./public/css/"))
  .pipe(browserSync.stream());
  `;
  switch (options.css) {
    case "CSS3":
      return `const styles = () => {
  ${plugins}
  return src("./css/**/*.css")
    .pipe(gulpif(!isProd, sourcemaps.init()))
    ${stylesTemplate}
};`;
    case "SASS":
      return `const styles = () => {
  ${plugins}
  return src("./scss/**/*.scss")
    .pipe(gulpif(!isProd, sourcemaps.init()))
    .pipe(sass().on("error", notify.onError()))
   ${stylesTemplate}
};`;
    case "LESS":
      return `const styles = () => {
  ${plugins}
  return src("./less/**/*.less")
    .pipe(gulpif(!isProd, sourcemaps.init()))
    .pipe(less().on("error", notify.onError()))
    ${stylesTemplate}
};`;
    case "Stylus":
      return `const styles = () => {
  ${plugins}
  return src("./stylus/**/*.styl")
    .pipe(gulpif(!isProd, sourcemaps.init()))
    .pipe(stylus().on("error", notify.onError()))
    ${stylesTemplate}
};`;
  }
};
const scripts = (options) => {
  const scriptsTempalte = `
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
  `;
  switch (options.js) {
    case "JavaScript":
      return `const scripts = () => {
  src("./js/vendor/**.js")
    .pipe(concat("vendor.js"))
    .pipe(gulpif(isProd, uglify().on("error", notify.onError())))
    .pipe(dest("./public/js/"));
  return src([
    "./js/components/**.js",
    "./js/main.js",
  ])
    .pipe(gulpif(!isProd, sourcemaps.init()))
    ${scriptsTempalte}
};`;
    case "TypeScript":
      return `const scripts = () => {
  src("./ts/vendor/**.js")
    .pipe(concat("vendor.js"))
    .pipe(gulpif(isProd, uglify().on("error", notify.onError())))
    .pipe(dest("./public/js/"));
  return src([
    "./ts/components/**.ts",
    "./ts/main.ts",
  ])
    .pipe(gulpif(!isProd, sourcemaps.init()))
    .pipe(ts())
    ${scriptsTempalte}
};`;
    case "CoffeeScript":
      return `const scripts = () => {
  src("./coffee/vendor/**.js")
    .pipe(concat("vendor.js"))
    .pipe(gulpif(isProd, uglify().on("error", notify.onError())))
    .pipe(dest("./public/js/"));
  return src([
    "./coffee/components/**.coffee",
    "./coffee/main.coffee",
  ])
    .pipe(gulpif(!isProd, sourcemaps.init()))
    .pipe(coffee({bare: true})))
    ${scriptsTempalte}
};`;
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
      return `watch("./ts/**/*.ts", scripts);`;
    case "CoffeeScript":
      return `watch("./coffee/**/*.coffee", scripts);`;
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
    case "HAML":
      return `watch("./partials/*.haml", html);
  watch("./*.haml", html);`;
    case "Nunjucks":
      return `watch("./partials/*.html", html);
  watch("./*.html", html);`;
  }
};
const createGulpFile = async (options) => {
  let gulpfileTemplate = `import gulp from "gulp";
import babel from "gulp-babel";
import cleanCSS from "gulp-clean-css";
import postcss from "gulp-postcss";
import autoprefixer from "autoprefixer";
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
import imagemin from "gulp-imagemin";
import { readFileSync } from "fs";
import concat from "gulp-concat";
import htmlmin from "gulp-htmlmin";
import rsync from "gulp-rsync"

${htmlLibrary(options)}
${jsLibrary(options)}
${cssLibrary(options)}

browserSync.create();
const { src, dest, series, watch, parallel } = gulp;
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
const resources = () => {
  return src("./resources/**").pipe(dest("./public"));
};
const images = () => {
  return src([
    "./img/**/*"
  ])
    .pipe(gulpif(isProd, imagemin()))
    .pipe(dest("./public/img"));
};

const deployBuild = () => {
	return src('public/')
		.pipe(rsync({
			root: 'public/',
			hostname: 'username@yousite.com',
			destination: 'yousite/public_html/',
			clean: true,
			recursive: true,
			archive: true,
			silent: false,
			compress: true
		}))
}

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
  parallel(html, scripts, styles, resources, images, svgSprites),
  watchFiles
);

export const build = series(
  parallel(toProd, clean),
  parallel(html, scripts, styles, resources, images, svgSprites),
);

export const deploy = series(deployBuild);
export const cache = series(cachePublic, rewrite);
  `;
  writeFile(`${process.cwd()}/gulpfile.js`, gulpfileTemplate, "utf8");
};

export default createGulpFile;

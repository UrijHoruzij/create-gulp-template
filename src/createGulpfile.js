import fs from 'fs';
import { promisify } from 'util';
import { changePathHTML, changePathCSS, changePathJS } from './util';
const writeFile = promisify(fs.writeFile);

const htmlLibrary = (options) => {
	switch (options.html) {
		case 'HTML5':
			return `import fileInclude from "gulp-file-include";`;
		case 'Pug':
			return `import pug from 'gulp-pug';`;
		case 'HAML':
			return `import haml from 'gulp-haml';`;
		case 'Nunjucks':
			return `import nunjucks from 'gulp-nunjucks';`;
	}
};
const cssLibrary = (options) => {
	switch (options.css) {
		case 'CSS3':
			return ``;
		case 'SASS':
			return `import dartSass from "sass";
import gulpSass from "gulp-sass";
const sass = gulpSass(dartSass);`;
		case 'LESS':
			return `import less from "gulp-less";`;
		case 'Stylus':
			return `import stylus from "gulp-stylus";`;
	}
};
const jsLibrary = (options) => {
	switch (options.js) {
		case 'JavaScript':
			return ``;
		case 'TypeScript':
			return `import ts from 'gulp-typescript';`;
		case 'CoffeeScript':
			return `import coffee from 'gulp-coffee';`;
	}
};
const html = (options) => {
  let pathHtml = changePathHTML(options);
	let extHtml = pathHtml == 'njk' ? 'html' : pathHtml;
	return `const html = () => {
      return src(["./*.${extHtml}"])
      ${pathHtml == 'html' ? '.pipe(
        fileInclude({
          prefix: "@",
          basepath: "@file",
        })
      )' : ''}
      ${pathHtml == 'pug' ? '.pipe(pug())' : ''}
      ${pathHtml == 'haml' ? '.pipe(haml({
        compiler: "visionmedia",
      }))' : ''}
      ${pathHtml == 'njk' ? '.pipe(nunjucks.compile())' : ''}
      .pipe(gulpif(isProd, htmlmin({
        collapseWhitespace: true,
      })))
      .pipe(dest("./public"))
      .pipe(browserSync.stream());
    };`;
};
const styles = (options) => {
  let pathCss = changePathCSS(options);
	let extCss = pathCss == 'stylus' ? 'styl' : pathCss;
	const plugins = `const plugins = [autoprefixer()]`;
  return `const styles = () => {
  ${plugins}
  return src("./${pathCss}/**/*.${extCss}")
    .pipe(gulpif(!isProd, sourcemaps.init()))
    ${pathCss == 'scss' ? '.pipe(sass().on("error", notify.onError()))' : ''}
    ${pathCss == 'less' ? '.pipe(less().on("error", notify.onError()))' : ''}
    ${pathCss == 'stylus' ? '.pipe(stylus().on("error", notify.onError()))' : ''}
    .pipe(postcss(plugins))
    .pipe(gulpif(isProd, cleanCSS({ level: 2 })))
    .pipe(gulpif(!isProd, sourcemaps.write(".")))
    .pipe(dest("./public/css/"))
    .pipe(browserSync.stream());
};`;
};
const scripts = (options) => {
	let pathJs = changePathJS(options);
	return `const scripts = () => {
  src("./${pathJs}/vendor/**.js")
    .pipe(concat("vendor.js"))
    .pipe(gulpif(isProd, uglify().on("error", notify.onError())))
    .pipe(dest("./public/js/"));
  src("./${pathJs}/*.js")
    .pipe(gulpif(isProd, uglify().on("error", notify.onError())))
    .pipe(dest("./public/js/"));
  return src("./${pathJs}/main.${pathJs}")
    .pipe(gulpif(!isProd, sourcemaps.init()))
    ${pathJs == 'ts' ? '.pipe(ts())' : ''}
    ${pathJs == 'coffee' ? '.pipe(coffee({bare: true}))' : ''}
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
};
const watchCSS = (options) => {
	let pathCss = changePathCSS(options);
	let extCss = pathCss == 'stylus' ? 'styl' : pathCss;
	return `watch("./${pathCss}/**/*.${extCss}", styles);`;
};
const watchJS = (options) => {
	let pathJs = changePathJS(options);
	return `watch("./${pathJs}/**/*.${pathJs}", scripts);`;
};
const watchHTML = (options) => {
	let pathHtml = changePathHTML(options);
  let extHtml = pathHtml == 'njk' ? 'html' : pathHtml;
	return `watch("./partials/*.${extHtml}", html);
  watch("./*.${extHtml}", html);`;
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
  watch("./img/**/*.{jpg,jpeg,png,svg}", images);
};

export default series(
  clean,
  parallel(html, scripts, styles, resources, images),
  watchFiles
);

export const build = series(
  parallel(toProd, clean),
  parallel(html, scripts, styles, resources, images),
);

export const deploy = series(deployBuild);
export const cache = series(cachePublic, rewrite);
  `;
	writeFile(`${process.cwd()}/gulpfile.js`, gulpfileTemplate, 'utf8');
};

export default createGulpFile;

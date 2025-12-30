import fs from 'fs';
import { extentionsHtml, extentionsCss, extentionsJs } from './util';
import type { CssResults, HtmlResults, JsResults, Options } from '@/types';

const htmlLibrary: Record<HtmlResults, string> = {
	HTML5: `import fileInclude from "gulp-file-include";`,
	Pug: `import pug from 'gulp-pug';`,
	Nunjucks: `import nunjucks from 'gulp-nunjucks';`,
};

const cssLibrary: Record<CssResults, string> = {
	CSS: ``,
	SASS: `import dartSass from "sass";
import gulpSass from "gulp-sass";
const sass = gulpSass(dartSass);`,
	LESS: `import less from "gulp-less";`,
	Stylus: `import stylus from "gulp-stylus";`,
};

const jsLibrary: Record<JsResults, string> = {
	JavaScript: `import babel from '@rollup/plugin-babel';`,
	TypeScript: `import typescript from 'rollup-plugin-typescript2';`,
	CoffeeScript: `import coffeescript from 'rollup-plugin-coffee-script';`,
};

const html = (options: Options) => {
	const extHtml = extentionsHtml[options.html] == 'njk' ? extentionsHtml['HTML5'] : extentionsHtml[options.html];
	return `const html = () => {
      return src(["./*.${extHtml}"])
      ${options.html === 'HTML5' ? `.pipe(fileInclude({prefix: "@",basepath: "@file"}))` : ``}
      ${options.html === 'Pug' ? `.pipe(pug())` : ``}
      ${options.html === 'Nunjucks' ? `.pipe(nunjucks.compile())` : ``}
      .pipe(gulpif(isProd, htmlmin({
        collapseWhitespace: true,
      })))
      .pipe(dest("./public"))
      .pipe(browserSync.stream());
    };`;
};

const styles = (options: Options) => {
	const pathCss = options.css.toLowerCase();
	const extCss = extentionsCss[options.css];
	const plugins = `const plugins = [autoprefixer(), atImport()]`;
	return `const styles = () => {
  ${plugins}
  return src("./${pathCss}/**/*.${extCss}")
    .pipe(gulpif(!isProd, sourcemaps.init()))
    ${options.css == 'SASS' ? `.pipe(sass().on("error", notify.onError()))` : ``}
    ${options.css == 'LESS' ? `.pipe(less().on("error", notify.onError()))` : ``}
    ${options.css == 'Stylus' ? `.pipe(stylus().on("error", notify.onError()))` : ``}
    .pipe(postcss(plugins))
    .pipe(gulpif(isProd, cleanCSS({ level: 2 })))
    .pipe(gulpif(!isProd, sourcemaps.write(".")))
    .pipe(dest("./public/css/"))
    .pipe(browserSync.stream());
};`;
};

const scripts = (options: Options) => {
	let pathJs = extentionsJs[options.js];
	return `
  const rollupConfig = {
    output: {
      format: 'iife', 
      name: 'App', 
      sourcemap: true
    },
    plugins: [
      resolve({
        browser: true,
        preferBuiltins: false
      }),
      commonjs({
        include: /node_modules/
      }),
    ]
  };
  
  const scripts = () => {
  src('./${pathJs}/vendor/vendor.${pathJs}')
    .pipe(gulpif(!isProd, sourcemaps.init()))
    .pipe(rollup2.rollup({
      ...rollupConfig,
      output: {
        ...rollupConfig.output,
        file: 'vendor.js',
      },
      input: './${pathJs}/vendor/vendor.${pathJs}',
      plugins: [
        ...rollupConfig.plugins,
        ${
					options.js === 'JavaScript'
						? `babel({
        babelHelpers: 'bundled',
        presets: ['@babel/preset-env'],
        exclude: 'node_modules/**'
      }),`
						: ``
				}
        ${
					options.js === 'TypeScript'
						? `typescript({
				tsconfig: './tsconfig.json',
				clean: true,
			}),`
						: ``
				}
        ${options.js === 'CoffeeScript' ? `coffeescript(),` : ``}
        terser()
      ]
    }))
    .pipe(rename('vendor.min.js'))
    .pipe(gulpif(!isProd, sourcemaps.write('.')))
    .pipe(dest('./public/js/'));

  src(["./${pathJs}/vendor/**.js", "!./${pathJs}/vendor/vendor.js"])
    .pipe(dest("./public/js/"));

  return src("./${pathJs}/main.${pathJs}")
    .pipe(gulpif(!isProd, sourcemaps.init()))
    .pipe(rollup2.rollup({
      ...rollupConfig,
      output: {
        ...rollupConfig.output,
        file: 'main.js',
      },
      input: './${pathJs}/main.${pathJs}',
      plugins: [
        ...rollupConfig.plugins,
        ${
					options.js === 'JavaScript'
						? `babel({
        babelHelpers: 'bundled',
        presets: ['@babel/preset-env'],
        exclude: 'node_modules/**'
      }),`
						: ``
				}
        ${
					options.js === 'TypeScript'
						? `typescript({
				tsconfig: './tsconfig.json',
				clean: true,
			}),`
						: ``
				}
        ${options.js === 'CoffeeScript' ? `coffeescript(),` : ``}
      ]
    }))
    .pipe(rename('main.js'))
    .pipe(gulpif(!isProd, sourcemaps.write(".")))
    .pipe(dest("./public/js"))
    .pipe(browserSync.stream());
};`;
};

const watchCSS = (options: Options) => {
	const pathCss = options.css.toLowerCase();
	const extCss = extentionsCss[options.css];
	return `watch("./${pathCss}/**/*.${extCss}", styles);`;
};

const watchJS = (options: Options) => {
	const pathJs = extentionsJs[options.js];
	return `watch("./${pathJs}/**/*.${pathJs}", scripts);`;
};

const watchHTML = (options: Options) => {
	const extHtml = extentionsHtml[options.html] === 'njk' ? extentionsHtml['HTML5'] : extentionsHtml[options.html];
	return `watch("./partials/*.${extHtml}", html);
  watch("./*.${extHtml}", html);`;
};

const createGulpFile = async (options: Options) => {
	const gulpfileTemplate = `import gulp from "gulp";
import cleanCSS from "gulp-clean-css";
import postcss from "gulp-postcss";
import autoprefixer from "autoprefixer";
import atImport from 'postcss-import';
import rename from 'gulp-rename';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import rollup2 from 'gulp-rollup-2';
import sourcemaps from "gulp-sourcemaps";
import { deleteAsync } from "del";
import browserSync from "browser-sync";
import rev from "gulp-rev";
import revRewrite from "gulp-rev-rewrite";
import revDel from "gulp-rev-delete-original";
import gulpif from "gulp-if";
import notify from "gulp-notify";
import imagemin from "gulp-imagemin";
import { readFileSync } from "fs";
import htmlmin from "gulp-htmlmin";
${htmlLibrary[options.html]}
${jsLibrary[options.js]}
${cssLibrary[options.css]}

browserSync.create();
const { src, dest, series, watch, parallel } = gulp;

let isProd = false;

const toProd = (done) => {
  isProd = true;
  done();
};

const clean = async () => {
	return await deleteAsync(['public/*']);
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

export const cache = series(cachePublic, rewrite);
  `;
	fs.writeFileSync(`${process.cwd()}/gulpfile.js`, gulpfileTemplate, 'utf8');
};

export default createGulpFile;

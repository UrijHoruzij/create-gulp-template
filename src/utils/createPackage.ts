import fs from 'fs';
import { installPackages, npmInit } from './util';
import libs from '@/utils/libs';
import type { CssResults, HtmlResults, JsResults, LibResults, Options, ResetCssResults } from '@/types';
import frameworks from './frameworks';

const devDependencies = [
	'prettier',
	'postcss',
	'gulp-postcss',
	'autoprefixer',
	'gulp',
	'browser-sync',
	'del',
	'gulp-if',
	'gulp-notify',
	'gulp-imagemin',
	'node-w3c-validator',
	'gulp-sourcemaps',
	'gulp-rev',
	'gulp-rev-rewrite',
	'gulp-rev-delete-original',
	'gulp-clean-css',
	'gulp-htmlmin',
	'gulp-rename',
	'rollup',
	'gulp-rollup-2',
	'@rollup/plugin-node-resolve',
	'@rollup/plugin-commonjs',
	'rollup-plugin-terser',
	'@babel/core',
	'postcss-import',
];

const devDependenciesHtml: Record<HtmlResults, string[]> = {
	HTML5: ['gulp-file-include'],
	Pug: ['pug', 'gulp-pug'],
	Nunjucks: ['gulp-nunjucks'],
};

const devDependenciesCss: Record<CssResults, string[]> = {
	CSS: [],
	SASS: ['sass', 'gulp-sass'],
	LESS: ['gulp-less'],
	Stylus: ['gulp-stylus'],
};

const dependenciesResetCss: Record<ResetCssResults, string[]> = {
	'normalize.css': ['normalize.css'],
	'modern-normalize.css': ['modern-normalize'],
	'reset.css': ['reset-css'],
};

const devDependenciesJs: Record<JsResults, string[]> = {
	JavaScript: ['@rollup/plugin-babel', '@babel/preset-env'],
	TypeScript: ['typescript', 'rollup-plugin-typescript2'],
	CoffeeScript: ['rollup-plugin-coffee-script'],
};

const createPackage = async (options: Options) => {
	await npmInit();
	devDependencies.push(
		...devDependenciesHtml[options.html],
		...devDependenciesCss[options.css],
		...devDependenciesJs[options.js],
	);
	await installPackages(devDependencies, options.packageManager, { dev: true });
	await installPackages(dependenciesResetCss[options.resetCss], options.packageManager);
	const libsDependencies = options.lib.reduce((acc: string[], lib: LibResults) => acc.concat(libs[lib].install), []);
	if (libsDependencies.length) {
		await installPackages(libsDependencies, options.packageManager);
	}
	if (frameworks[options.framework]?.install?.length) {
		await installPackages(frameworks[options.framework]?.install, options.packageManager);
	}
	const data = await fs.readFileSync(`${process.cwd()}/package.json`, 'utf8');
	const json = JSON.parse(data);
	json.scripts = {
		html: 'node-w3c-validator -f lint -evH -i public/**/*.html',
		dev: 'gulp',
		build: 'gulp build',
		cache: 'gulp cache',
		deploy: 'gulp deploy',
		prettier: 'prettier',
	};
	json.license = 'MIT';
	json.main = 'gulpfile.js';
	fs.writeFileSync(`${process.cwd()}/package.json`, JSON.stringify(json, null, 4), 'utf8');
};

export default createPackage;

import fs from 'fs';
import { promisify } from 'util';
const writeFile = promisify(fs.writeFile);

const createPackage = (options) => {
	let devDependencies = [
		{
			prettier: '^2.5.1',
			postcss: '^8.4.5',
			'gulp-postcss': '^9.0.1',
			autoprefixer: '^10.4.2',
			gulp: '^4.0.2',
			'browser-sync': '^2.27.5',
			del: '^6.0.0',
			'gulp-if': '^3.0.0',
			'gulp-notify': '^4.0.0',
			'gulp-imagemin': '^8.0.0',
			'gulp-concat': '^2.6.1',
			'node-w3c-validator': '^2.0.1',
			'gulp-sourcemaps': '^3.0.0',
			'gulp-rev': '^9.0.0',
			'gulp-rev-rewrite': '^5.0.0',
			'gulp-rev-delete-original': '^0.2.3',
			'gulp-babel': '^8.0.0',
			'gulp-clean-css': '^4.3.0',
			'gulp-uglify-es': '^3.0.0',
			'gulp-htmlmin': '^5.0.1',
			'gulp-rsync': '^0.0.9',
		},
	];
	switch (options.html) {
		case 'HTML5':
			devDependencies.push({
				'gulp-file-include': '^2.3.0',
			});
			break;
		case 'Pug':
			devDependencies.push({
				pug: '^3.0.2',
				'gulp-pug': '^5.0.0',
			});
			break;
		case 'HAML':
			devDependencies.push({
				'gulp-haml': '^1.0.1',
			});
			break;
		case 'Nunjucks':
			devDependencies.push({
				'gulp-nunjucks': '^5.1.0',
			});
			break;
	}
	switch (options.css) {
		case 'SASS':
			devDependencies.push({
				sass: '^1.47.0',
				'gulp-sass': '^5.0.0',
			});
			break;
		case 'LESS':
			devDependencies.push({
				'gulp-less': '^5.0.0',
			});
			break;
		case 'Stylus':
			devDependencies.push({
				'gulp-stylus': '^2.7.0',
			});
			break;
		case 'CSS3':
			break;
	}
	switch (options.js) {
		case 'JavaScript':
			devDependencies.push({
				'@babel/preset-env': '^7.16.7',
			});
			break;
		case 'TypeScript':
			devDependencies.push({
				typescript: '^4.5.4',
				'gulp-typescript': '^6.0.0-alpha.1',
				'@babel/preset-env': '^7.16.7',
			});
			break;
		case 'CoffeeScript':
			devDependencies.push({
				'gulp-coffee': '^3.0.3',
				'@babel/preset-env': '^7.16.7',
			});
			break;
	}
	let dependencies = Object.assign({}, ...devDependencies);
	let packageTemplate = {
		name: 'create-gulp-template',
		description: '',
		version: '1.0.0',
		main: 'gulpfile.js',
		type: 'module',
		scripts: {
			html: 'node-w3c-validator -f lint -evH -i public/**/*.html',
			dev: 'gulp',
			build: 'gulp build',
			cache: 'gulp cache',
			deploy: 'gulp deploy',
			prettier: 'prettier',
		},
		author: 'Urij Horuzij',
		license: 'MIT',
		devDependencies: dependencies,
	};
	return writeFile(`${process.cwd()}/package.json`, JSON.stringify(packageTemplate, null, 4), 'utf8');
};

export default createPackage;

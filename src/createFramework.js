import fs from 'fs';
import path from 'path';
import { changePathCSS, changePathJS, pathNodeModules } from './util';

const createFramework = async (options) => {
	let pathCSS = changePathCSS(options);
	let pathJS = changePathJS(options);
	let fileJS, fileCSS;
	for (let framework of options.framework) {
		switch (framework) {
			case 'Materialize':
				fileJS = fs.readFileSync(
					pathNodeModules(path, '../node_modules/materialize-css/dist/js/materialize.min.js'),
					'utf8',
				);
				fileCSS = fs.readFileSync(
					pathNodeModules(path, '../node_modules/materialize-css/dist/css/materialize.min.css'),
					'utf8',
				);
				fs.writeFileSync(`${process.cwd()}/${pathJS}/vendor/materialize.min.js`, fileJS, 'utf8');
				fs.writeFileSync(`${process.cwd()}/${pathCSS}/vendor/materialize.min.css`, fileCSS, 'utf8');
				break;
			case 'Bootstrap 3':
				fileJS = fs.readFileSync(pathNodeModules(path, '../node_modules/bootstrap3/dist/js/bootstrap.min.js'), 'utf8');
				fileCSS = fs.readFileSync(
					pathNodeModules(path, '../node_modules/bootstrap3/dist/css/bootstrap.min.css'),
					'utf8',
				);
				fs.writeFileSync(`${process.cwd()}/${pathJS}/vendor/bootstrap.min.js`, fileJS, 'utf8');
				fs.writeFileSync(`${process.cwd()}/${pathCSS}/vendor/bootstrap.min.css`, fileCSS, 'utf8');
				break;
			case 'Bootstrap 4':
				fileJS = fs.readFileSync(pathNodeModules(path, '../node_modules/bootstrap4/dist/js/bootstrap.min.js'), 'utf8');
				fileCSS = fs.readFileSync(
					pathNodeModules(path, '../node_modules/bootstrap4/dist/css/bootstrap.min.css'),
					'utf8',
				);
				fs.writeFileSync(`${process.cwd()}/${pathJS}/vendor/bootstrap.min.js`, fileJS, 'utf8');
				fs.writeFileSync(`${process.cwd()}/${pathCSS}/vendor/bootstrap.min.css`, fileCSS, 'utf8');
				break;
			case 'Bootstrap 5':
				fileJS = fs.readFileSync(pathNodeModules(path, '../node_modules/bootstrap5/dist/js/bootstrap.min.js'), 'utf8');
				fileCSS = fs.readFileSync(
					pathNodeModules(path, '../node_modules/bootstrap5/dist/css/bootstrap.min.css'),
					'utf8',
				);
				fs.writeFileSync(`${process.cwd()}/${pathJS}/vendor/bootstrap.min.js`, fileJS, 'utf8');
				fs.writeFileSync(`${process.cwd()}/${pathCSS}/vendor/bootstrap.min.css`, fileCSS, 'utf8');
				break;
		}
	}
};
export default createFramework;

import fs from 'fs';
import path from 'path';
import { changePathCSS, changePathJS, pathModule } from './util';

const createFramework = (options) => {
	let pathCSS = changePathCSS(options);
	let pathJS = changePathJS(options);
	for (let framework of options.framework) {
		switch (framework) {
			case 'Materialize':
				fs.copyFileSync(
					pathModule(path, '../node_modules/materialize-css/dist/js/materialize.min.js'),
					`${process.cwd()}/${pathJS}/vendor/materialize.min.js`,
				);
				fs.copyFileSync(
					pathModule(path, '../node_modules/materialize-css/dist/css/materialize.min.css'),
					`${process.cwd()}/${pathCSS}/vendor/materialize.min.css`,
				);
				break;
			case 'Bootstrap 3':
				fs.copyFileSync(
					pathModule(path, '../node_modules/bootstrap3/dist/js/bootstrap.min.js'),
					`${process.cwd()}/${pathJS}/vendor/bootstrap.min.js`,
				);
				fs.copyFileSync(
					pathModule(path, '../node_modules/bootstrap3/dist/css/bootstrap.min.css'),
					`${process.cwd()}/${pathCSS}/vendor/bootstrap.min.css`,
				);
				break;
			case 'Bootstrap 4':
				fs.copyFileSync(
					pathModule(path, '../node_modules/bootstrap4/dist/js/bootstrap.min.js'),
					`${process.cwd()}/${pathJS}/vendor/bootstrap.min.js`,
				);
				fs.copyFileSync(
					pathModule(path, '../node_modules/bootstrap4/dist/css/bootstrap.min.css'),
					`${process.cwd()}/${pathCSS}/vendor/bootstrap.min.css`,
				);
				break;
			case 'Bootstrap 5':
				fs.copyFileSync(
					pathModule(path, '../node_modules/bootstrap5/dist/js/bootstrap.min.js'),
					`${process.cwd()}/${pathJS}/vendor/bootstrap.min.js`,
				);
				fs.copyFileSync(
					pathModule(path, '../node_modules/bootstrap5/dist/css/bootstrap.min.css'),
					`${process.cwd()}/${pathCSS}/vendor/bootstrap.min.css`,
				);
				break;
		}
	}
};
export default createFramework;

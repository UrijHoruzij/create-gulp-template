import fs from 'fs';
import chalk from 'chalk';
import { promisify } from 'util';
import { changePathCSS, changePathJS } from './util';
const writeFile = promisify(fs.writeFile);

const createLib = async (options) => {
	let pathCSS = changePathCSS(options);
	let pathJS = changePathJS(options);
	let fileJS, fileCSS;
	try {
		for (let lib of options.lib) {
			switch (lib) {
				case 'locomotive scroll':
					fileCSS = fs.readFileSync('../node_modules/locomotive-scroll/dist/locomotive-scroll.min.css', 'utf8');
					fileJS = fs.readFileSync('../node_modules/locomotive-scroll/dist/locomotive-scroll.min.js', 'utf8');
					writeFile(`${process.cwd()}/${pathCSS}/vendor/locomotive-scroll.min.css`, fileCSS, 'utf8');
					writeFile(`${process.cwd()}/${pathJS}/vendor/locomotive-scroll.min.js`, fileJS, 'utf8');
					break;
				case 'Jquery':
					fileJS = fs.readFileSync('../node_modules/jquery/dist/jquery.min.js', 'utf8');
					writeFile(`${process.cwd()}/${pathJS}/vendor/jquery.min.js`, fileJS, 'utf8');
					break;
				case 'GSAP':
					fileJS = fs.readFileSync('../node_modules/gsap/dist/gsap.min.js', 'utf8');
					writeFile(`${process.cwd()}/${pathJS}/vendor/gsap.min.js`, fileJS, 'utf8');
					break;
				case 'Slick.js':
					fileJS = fs.readFileSync('../node_modules/jquery/dist/jquery.min.js', 'utf8');
					writeFile(`${process.cwd()}/${pathJS}/vendor/jquery.min.js`, fileJS, 'utf8');
					fileCSS = fs.readFileSync('../node_modules/slick-carousel/slick/slick.css', 'utf8');
					writeFile(`${process.cwd()}/${pathCSS}/vendor/slick.css`, fileCSS, 'utf8');
					fileCSS = fs.readFileSync('../node_modules/slick-carousel/slick/slick-theme.css', 'utf8');
					writeFile(`${process.cwd()}/${pathCSS}/vendor/slick-theme.css`, fileCSS, 'utf8');
					fileJS = fs.readFileSync('../node_modules/slick-carousel/slick/slick.min.js', 'utf8');
					writeFile(`${process.cwd()}/${pathJS}/vendor/slick.min.js`, fileJS, 'utf8');
					break;
				case 'Fotorama.js':
					fileJS = fs.readFileSync('../node_modules/jquery/dist/jquery.min.js', 'utf8');
					writeFile(`${process.cwd()}/${pathJS}/vendor/jquery.min.js`, fileJS, 'utf8');
					fileCSS = fs.readFileSync('../node_modules/fotorama/fotorama.css', 'utf8');
					fileJS = fs.readFileSync('../node_modules/fotorama/fotorama.js', 'utf8');
					writeFile(`${process.cwd()}/${pathCSS}/vendor/fotorama.css`, fileCSS, 'utf8');
					writeFile(`${process.cwd()}/${pathJS}/vendor/fotorama.js`, fileJS, 'utf8');
					break;
				case 'fullPage.js':
					fileCSS = fs.readFileSync('../node_modules/fullpage-js-geek/dist/fullpage.min.css', 'utf8');
					fileJS = fs.readFileSync('../node_modules/fullpage-js-geek/dist/fullpage.min.js', 'utf8');
					writeFile(`${process.cwd()}/${pathCSS}/vendor/fullpage.min.css`, fileCSS, 'utf8');
					writeFile(`${process.cwd()}/${pathJS}/vendor/fullpage.min.js`, fileJS, 'utf8');
					break;
			}
		}
	} catch (err) {
		console.log(chalk.red.bold('ERROR'));
		console.log(chalk.red(err));
	}
};
export default createLib;

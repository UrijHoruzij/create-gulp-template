import fs from 'fs';
import path from 'path';
import { changePathCSS, changePathJS, pathNodeModules } from './util';

const createLib = async (options) => {
	let pathCSS = changePathCSS(options);
	let pathJS = changePathJS(options);
	let fileJS, fileCSS;
	for (let lib of options.lib) {
		switch (lib) {
			case 'locomotive scroll':
				fileCSS = await fs.readFileSync(
					pathNodeModules(path, '../node_modules/locomotive-scroll/dist/locomotive-scroll.min.css'),
					'utf8',
				);
				fileJS = await fs.readFileSync(
					pathNodeModules(path, '../node_modules/locomotive-scroll/dist/locomotive-scroll.min.js'),
					'utf8',
				);
				await fs.writeFile(`${process.cwd()}/${pathCSS}/vendor/locomotive-scroll.min.css`, fileCSS, 'utf8');
				await fs.writeFile(`${process.cwd()}/${pathJS}/vendor/locomotive-scroll.min.js`, fileJS, 'utf8');
				break;
			case 'Jquery':
				fileJS = fs.readFileSync(pathNodeModules(path, '../node_modules/jquery/dist/jquery.min.js'), 'utf8');
				fs.writeFileSync(`${process.cwd()}/${pathJS}/jquery.min.js`, fileJS, 'utf8');
				break;
			case 'GSAP':
				fileJS = fs.readFileSync(pathNodeModules(path, '../node_modules/gsap/dist/gsap.min.js'), 'utf8');
				fs.writeFileSync(`${process.cwd()}/${pathJS}/vendor/gsap.min.js`, fileJS, 'utf8');
				break;
			case 'Swiper.js':
				fileJS = fs.readFileSync(pathNodeModules(path, '../node_modules/swiper/swiper-bundle.min.js'), 'utf8');
				fs.writeFileSync(`${process.cwd()}/${pathJS}/swiper-bundle.min.js`, fileJS, 'utf8');
				fileCSS = fs.readFileSync(pathNodeModules(path, '../node_modules/swiper/swiper-bundle.min.css'), 'utf8');
				fs.writeFileSync(`${process.cwd()}/${pathCSS}/vendor/swiper-bundle.min.css`, fileCSS, 'utf8');
				break;
			case 'Slick.js':
				fileJS = fs.readFileSync(pathNodeModules(path, '../node_modules/jquery/dist/jquery.min.js'), 'utf8');
				fs.writeFileSync(`${process.cwd()}/${pathJS}/jquery.min.js`, fileJS, 'utf8');
				fileCSS = fs.readFileSync(pathNodeModules(path, '../node_modules/slick-carousel/slick/slick.css'), 'utf8');
				fs.writeFileSync(`${process.cwd()}/${pathCSS}/vendor/slick.css`, fileCSS, 'utf8');
				fileCSS = fs.readFileSync(
					pathNodeModules(path, '../node_modules/slick-carousel/slick/slick-theme.css'),
					'utf8',
				);
				fs.writeFileSync(`${process.cwd()}/${pathCSS}/vendor/slick-theme.css`, fileCSS, 'utf8');
				fileJS = fs.readFileSync(pathNodeModules(path, '../node_modules/slick-carousel/slick/slick.min.js'), 'utf8');
				fs.writeFileSync(`${process.cwd()}/${pathJS}/vendor/slick.min.js`, fileJS, 'utf8');
				break;
			case 'Fotorama.js':
				fileJS = fs.readFileSync(pathNodeModules(path, '../node_modules/jquery/dist/jquery.min.js'), 'utf8');
				fs.writeFileSync(`${process.cwd()}/${pathJS}/jquery.min.js`, fileJS, 'utf8');
				fileCSS = fs.readFileSync(pathNodeModules(path, '../node_modules/fotorama/fotorama.css'), 'utf8');
				fileJS = fs.readFileSync(pathNodeModules(path, '../node_modules/fotorama/fotorama.js'), 'utf8');
				fs.writeFileSync(`${process.cwd()}/${pathCSS}/vendor/fotorama.css`, fileCSS, 'utf8');
				fs.writeFileSync(`${process.cwd()}/${pathJS}/vendor/fotorama.js`, fileJS, 'utf8');
				break;
			case 'fullPage.js':
				fileCSS = fs.readFileSync(
					pathNodeModules(path, '../node_modules/fullpage-js-geek/dist/fullpage.min.css'),
					'utf8',
				);
				fileJS = fs.readFileSync(
					pathNodeModules(path, '../node_modules/fullpage-js-geek/dist/fullpage.min.js'),
					'utf8',
				);
				fs.writeFileSync(`${process.cwd()}/${pathCSS}/vendor/fullpage.min.css`, fileCSS, 'utf8');
				fs.writeFileSync(`${process.cwd()}/${pathJS}/vendor/fullpage.min.js`, fileJS, 'utf8');
				break;
			case 'popper.js':
				fileJS = fs.readFileSync(pathNodeModules(path, '../node_modules/@popperjs/dist/cjs/popper.js'), 'utf8');
				fs.writeFileSync(`${process.cwd()}/${pathJS}/vendor/popper.js`, fileJS, 'utf8');
				break;
		}
	}
};
export default createLib;

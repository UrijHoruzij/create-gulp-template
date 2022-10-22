import fs from 'fs';
import path from 'path';
import { changePathCSS, changePathJS, pathModule } from './util';

const createLib = (options) => {
	let pathCSS = changePathCSS(options);
	let pathJS = changePathJS(options);
	for (let lib of options.lib) {
		switch (lib) {
			case 'locomotive scroll':
				fs.copyFileSync(
					pathModule(path, '../node_modules/locomotive-scroll/dist/locomotive-scroll.min.css'),
					`${process.cwd()}/${pathCSS}/vendor/locomotive-scroll.min.css`,
				);
				fs.copyFileSync(
					pathModule(path, '../node_modules/locomotive-scroll/dist/locomotive-scroll.min.js'),
					`${process.cwd()}/${pathJS}/vendor/locomotive-scroll.min.js`,
				);
				break;
			case 'Jquery':
				fs.copyFileSync(
					pathModule(path, '../node_modules/jquery/dist/jquery.min.js'),
					`${process.cwd()}/${pathJS}/jquery.min.js`,
				);
				break;
			case 'GSAP':
				fs.copyFileSync(
					pathModule(path, '../node_modules/gsap/dist/gsap.min.js'),
					`${process.cwd()}/${pathJS}/vendor/gsap.min.js`,
				);
				break;
			case 'Swiper.js':
				fs.copyFileSync(
					pathModule(path, '../node_modules/swiper/swiper-bundle.min.js'),
					`${process.cwd()}/${pathJS}/vendor/swiper-bundle.min.js`,
				);
				fs.copyFileSync(
					pathModule(path, '../node_modules/swiper/swiper-bundle.min.css'),
					`${process.cwd()}/${pathCSS}/vendor/swiper-bundle.min.css`,
				);
				break;
			case 'Slick.js':
				fs.copyFileSync(
					pathModule(path, '../node_modules/jquery/dist/jquery.min.js'),
					`${process.cwd()}/${pathJS}/jquery.min.js`,
				);
				fs.copyFileSync(
					pathModule(path, '../node_modules/slick-carousel/slick/slick.css'),
					`${process.cwd()}/${pathCSS}/vendor/slick.css`,
				);
				fs.copyFileSync(
					pathModule(path, '../node_modules/slick-carousel/slick/slick-theme.css'),
					`${process.cwd()}/${pathCSS}/vendor/slick-theme.css`,
				);
				fs.copyFileSync(
					pathModule(path, '../node_modules/slick-carousel/slick/slick.min.js'),
					`${process.cwd()}/${pathJS}/vendor/slick.min.js`,
				);
				break;
			case 'Fotorama.js':
				fs.copyFileSync(
					pathModule(path, '../node_modules/jquery/dist/jquery.min.js'),
					`${process.cwd()}/${pathJS}/jquery.min.js`,
				);
				fs.copyFileSync(
					pathModule(path, '../node_modules/fotorama/fotorama.css'),
					`${process.cwd()}/${pathCSS}/vendor/fotorama.css`,
				);
				fs.copyFileSync(
					pathModule(path, '../node_modules/fotorama/fotorama.js'),
					`${process.cwd()}/${pathJS}/vendor/fotorama.js`,
				);
				break;
			case 'fullPage.js':
				fs.copyFileSync(
					pathModule(path, '../node_modules/fullpage-js-geek/dist/fullpage.min.css'),
					`${process.cwd()}/${pathCSS}/vendor/fullpage.min.css`,
				);
				fs.copyFileSync(
					pathModule(path, '../node_modules/fullpage-js-geek/dist/fullpage.min.js'),
					`${process.cwd()}/${pathJS}/vendor/fullpage.min.js`,
				);
				break;
			case 'popper.js':
				fs.copyFileSync(
					pathModule(path, '../node_modules/@popperjs/dist/cjs/popper.js'),
					`${process.cwd()}/${pathJS}/vendor/popper.js`,
				);
				break;
		}
	}
};
export default createLib;

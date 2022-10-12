import fs from 'fs';
import { changePathJS } from './util';

const createJS = async (options) => {
	const contentMain = `/**
        * название функции
        *
        * @param {number} first - первое число
        * @returns {number}x
        */`;
	const pathJS = changePathJS(options);
	switch (options.js) {
		case 'JavaScript':
			fs.writeFileSync(`${process.cwd()}/${pathJS}/main.js`, contentMain, 'utf8');
			break;
		case 'TypeScript':
			fs.writeFileSync(`${process.cwd()}/${pathJS}/main.ts`, contentMain, 'utf8');
			break;
		case 'CoffeeScript':
			fs.writeFileSync(`${process.cwd()}/${pathJS}/main.coffee`, contentMain, 'utf8');
			break;
	}
};
export default createJS;

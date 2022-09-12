import fs from 'fs';
import { promisify } from 'util';
import { changePathJS } from './util';
const writeFile = promisify(fs.writeFile);

const createJS = async (options) => {
	const contentMain = `/**
        * название функции
        *
        * @param {number} first - первое число
        * @returns {number}
        */`;
	const pathJS = changePathJS(options);
	switch (options.js) {
		case 'JavaScript':
			writeFile(`${process.cwd()}/${pathJS}/main.js`, contentMain, 'utf8');
			break;
		case 'TypeScript':
			writeFile(`${process.cwd()}/${pathJS}/main.ts`, contentMain, 'utf8');
			break;
		case 'CoffeeScript':
			writeFile(`${process.cwd()}/${pathJS}/main.coffee`, contentMain, 'utf8');
			break;
	}
};
export default createJS;

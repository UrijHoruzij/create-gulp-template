import fs from 'fs';
import chalk from 'chalk';
import { promisify } from 'util';
import { changePathJS } from './util';
const writeFile = promisify(fs.writeFile);

const createJS = async (options) => {
	try {
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
	} catch (err) {
		console.log(chalk.red.bold('ERROR'));
		console.log(chalk.red(err));
	}
};
export default createJS;

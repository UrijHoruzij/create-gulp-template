import fs from 'fs';
import { changePathCSS, changePathJS } from './util';

const createCssFolders = (prefix) => {
	fs.mkdirSync(prefix);
	fs.mkdirSync(`${prefix}/vendor`);
	if (prefix !== 'css') fs.mkdirSync(`${prefix}/mixins`);
};
const createJsFolders = (prefix) => {
	fs.mkdirSync(prefix);
	fs.mkdirSync(`${prefix}/vendor`);
};
const createFolders = async (options) => {
	fs.mkdirSync('img');
	fs.mkdirSync('img/svg');
	fs.mkdirSync('partials');
	fs.mkdirSync('resources');
	fs.mkdirSync('resources/fonts');
	createCssFolders(changePathCSS(options));
	createJsFolders(changePathJS(options));
};
export default createFolders;

import fs from 'fs';
import { changePathCSS, changePathJS } from './util';

const createNestedFolder = (prefix) => {
	fs.mkdirSync(prefix);
	fs.mkdirSync(`${prefix}/vendor`);
	if (prefix !== 'css') fs.mkdirSync(`${prefix}/mixins`);
};
const createFolders = (options) => {
	fs.mkdirSync('img');
	fs.mkdirSync('partials');
	fs.mkdirSync('resources');
	fs.mkdirSync('resources/fonts');
	createNestedFolder(changePathCSS(options));
	createNestedFolder(changePathJS(options));
};
export default createFolders;

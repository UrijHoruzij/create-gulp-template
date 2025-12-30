import fs from 'fs';
import { extentionsCss, extentionsJs } from './util';
import type { Options } from '@/types';

const isJs = (prefix: string): prefix is 'js' | 'ts' | 'coffee' => {
	return prefix === 'js' || prefix === 'ts' || prefix === 'coffee';
};

const createNestedFolder = (prefix: string) => {
	fs.mkdirSync(`${process.cwd()}/${prefix}`);
	fs.mkdirSync(`${process.cwd()}/${prefix}/vendor`);
	if (prefix !== 'css' && !isJs(prefix)) fs.mkdirSync(`${process.cwd()}/${prefix}/mixins`);
};

const createFolders = (options: Options) => {
	if (fs.existsSync(`${process.cwd()}/${options.nameProject}`)) {
		process.chdir(`${process.cwd()}/${options.nameProject}`);
	} else {
		fs.mkdirSync(options.nameProject);
		process.chdir(`${process.cwd()}/${options.nameProject}`);
	}
	fs.mkdirSync(`${process.cwd()}/img`);
	fs.mkdirSync(`${process.cwd()}/partials`);
	fs.mkdirSync(`${process.cwd()}/resources`);
	fs.mkdirSync(`${process.cwd()}/resources/fonts`);
	createNestedFolder(extentionsCss[options.css]);
	createNestedFolder(extentionsJs[options.js]);
};

export default createFolders;

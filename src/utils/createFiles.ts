import fs from 'fs';
import { pathModule } from './util';
import type { Options } from '@/types';

const createFiles = (options: Options) => {
	fs.copyFileSync(pathModule('./template/.editorconfig'), `${process.cwd()}/.editorconfig`);
	fs.copyFileSync(pathModule('./template/.prettierrc'), `${process.cwd()}/.prettierrc`);
	fs.copyFileSync(pathModule('./template/.browserslistrc'), `${process.cwd()}/.browserslistrc`);
	fs.copyFileSync(pathModule('./template/.gitignore'), `${process.cwd()}/.gitignore`);
	if (options.js === 'TypeScript') {
		fs.copyFileSync(pathModule('./template/tsconfig.json'), `${process.cwd()}/tsconfig.json`);
	}
};
export default createFiles;

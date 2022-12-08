import fs from 'fs';
import path from 'path';
import { pathModule } from './util';

const createFiles = async () => {
	fs.copyFileSync(pathModule(path, './template/.editorconfig'), `${process.cwd()}/.editorconfig`);
	fs.copyFileSync(pathModule(path, './template/.prettierrc'), `${process.cwd()}/.prettierrc`);
	fs.copyFileSync(pathModule(path, './template/.browserslistrc'), `${process.cwd()}/.browserslistrc`);
};
export default createFiles;

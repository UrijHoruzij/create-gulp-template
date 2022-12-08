import fs from 'fs';
import path from 'path';
import { pathModule } from './util';

const createGitignore = async () => {
	fs.copyFileSync(pathModule(path, './template/.gitignore'), `${process.cwd()}/.gitignore`);
};
export default createGitignore;

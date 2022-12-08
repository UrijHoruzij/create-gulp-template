import fs from 'fs';
import path from 'path';
import { pathModule } from './util';

const createSnippets = async () => {
	fs.mkdirSync('.vscode');
	fs.mkdirSync('.vscode/snippets');
	fs.copyFileSync(pathModule(path, './snippets/extensions.json'), `${process.cwd()}/.vscode/extensions.json`);
	fs.copyFileSync(pathModule(path, './snippets/html.json'), `${process.cwd()}/.vscode/snippets/html.json`);
};
export default createSnippets;

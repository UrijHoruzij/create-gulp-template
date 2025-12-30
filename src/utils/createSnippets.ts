import fs from 'fs';
import { pathModule } from './util';

const createSnippets = async () => {
	fs.mkdirSync(`${process.cwd()}/.vscode`);
	fs.mkdirSync(`${process.cwd()}/.vscode/snippets`);
	fs.copyFileSync(pathModule('./snippets/extensions.json'), `${process.cwd()}/.vscode/extensions.json`);
	fs.copyFileSync(pathModule('./snippets/html.json'), `${process.cwd()}/.vscode/snippets/html.json`);
};

export default createSnippets;

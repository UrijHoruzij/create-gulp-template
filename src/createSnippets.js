import fs from 'fs';
import path from 'path';
import { pathModule } from './util';

const createSnippets = async () => {
	fs.mkdirSync('.vscode');
	fs.mkdirSync('.vscode/snippets');
	const extensions = `{
	"recommendations": ["esbenp.prettier-vscode", "dbaeumer.vscode-eslint", "rebornix.project-snippets"]
}`;
	fs.writeFileSync(`${process.cwd()}/.vscode/extensions.json`, extensions, 'utf8');
	fs.copyFileSync(pathModule(path, './snippets/html.json'), `${process.cwd()}/.vscode/snippets/html.json`);
};
export default createSnippets;

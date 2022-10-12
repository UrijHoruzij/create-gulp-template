import fs from 'fs';
import path from 'path';
import { pathNodeModules } from './util';

const createSnippets = async () => {
	fs.mkdirSync('.vscode');
	fs.mkdirSync('.vscode/snippets');
	const extensions = `{
	"recommendations": ["esbenp.prettier-vscode", "dbaeumer.vscode-eslint", "rebornix.project-snippets"]
}`;
	const snippetsFile = fs.readFileSync(pathNodeModules(path, './snippets.json'), 'utf8');
	fs.writeFileSync(`${process.cwd()}/.vscode/extensions.json`, extensions, 'utf8');
	fs.writeFileSync(`${process.cwd()}/.vscode/snippets/html.json`, snippetsFile, 'utf8');
};
export default createSnippets;

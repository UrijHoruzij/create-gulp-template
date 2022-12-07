import fs from 'fs';
import path from 'path';
import { pathModule } from './util';

const createHTML = async (options) => {
	const htmlHeaderTemplate = `<header>
  </header>
`;
	const htmlFooterTemplate = `<footer>
  </footer>`;
	const pugHeaderTemplate = `header`;
	const pugFooterTemplate = `footer`;
	switch (options.html) {
		case 'HTML5':
			fs.copyFileSync(pathModule(path, './template/html/html.html'), `${process.cwd()}/index.html`);
			fs.writeFileSync(`${process.cwd()}/partials/header.html`, htmlHeaderTemplate, 'utf8');
			fs.writeFileSync(`${process.cwd()}/partials/footer.html`, htmlFooterTemplate, 'utf8');
			break;
		case 'Pug':
			fs.copyFileSync(pathModule(path, './template/html/pug.pug'), `${process.cwd()}/index.pug`);
			fs.writeFileSync(`${process.cwd()}/partials/header.pug`, pugHeaderTemplate, 'utf8');
			fs.writeFileSync(`${process.cwd()}/partials/footer.pug`, pugFooterTemplate, 'utf8');
			break;
		case 'HAML':
			fs.copyFileSync(pathModule(path, './template/html/haml.haml'), `${process.cwd()}/index.haml`);
			break;
		case 'Nunjucks':
			fs.copyFileSync(pathModule(path, './template/html/nunjucks.html'), `${process.cwd()}/index.html`);
			break;
	}
};
export default createHTML;

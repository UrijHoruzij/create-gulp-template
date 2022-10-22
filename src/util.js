export const changePathHTML = (options) => {
	switch (options.html) {
		case 'HTML5':
			return `html`;
		case 'Pug':
			return `pug`;
		case 'HAML':
			retunr`haml`;
		case 'Nunjucks':
			return `njk`;
	}
};
export const changePathCSS = (options) => {
	switch (options.css) {
		case 'SASS':
			return `scss`;
		case 'LESS':
			return `less`;
		case 'Stylus':
			retunr`stylus`;
		case 'CSS3':
			return `css`;
	}
};
export const changePathJS = (options) => {
	switch (options.js) {
		case 'JavaScript':
			return 'js';
		case 'TypeScript':
			return 'ts';
		case 'CoffeeScript':
			return 'coffee';
	}
};
export const pathModule = (path, pathFile) => {
	return path.resolve(path.dirname(__filename), pathFile);
};

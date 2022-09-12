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

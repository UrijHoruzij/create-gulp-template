import fs from 'fs';
import path from 'path';
import { changePathCSS, pathModule } from './util';

const createCSS = async (options) => {
	let pathCSS = changePathCSS(options);
	switch (options.css) {
		case 'SASS':
			fs.copyFileSync(
				pathModule(path, '../node_modules/normalize.css/normalize.css'),
				`${process.cwd()}/${pathCSS}/vendor/normalize.css`,
			);
			fs.copyFileSync(
				pathModule(path, './template/css/scss/font-face.scss'),
				`${process.cwd()}/${pathCSS}/mixins/_font-face.scss`,
			);
			fs.copyFileSync(pathModule(path, './template/css/scss/fonts.scss'), `${process.cwd()}/${pathCSS}/_fonts.scss`);
			fs.copyFileSync(pathModule(path, './template/css/vars.css'), `${process.cwd()}/${pathCSS}/_vars.scss`);
			fs.copyFileSync(pathModule(path, './template/css/main.css'), `${process.cwd()}/${pathCSS}/main.scss`);
			fs.copyFileSync(pathModule(path, './template/css/scss/mixins.scss'), `${process.cwd()}/${pathCSS}/_mixins.scss`);
			fs.copyFileSync(pathModule(path, './template/css/scss/vendors.scss'), `${process.cwd()}/${pathCSS}/vendors.scss`);
			break;
		case 'LESS':
			fs.copyFileSync(
				pathModule(path, '../node_modules/normalize.css/normalize.css'),
				`${process.cwd()}/${pathCSS}/vendor/normalize.less`,
			);
			fs.copyFileSync(
				pathModule(path, './template/css/less/font-face.less'),
				`${process.cwd()}/${pathCSS}/mixins/font-face.less`,
			);
			fs.copyFileSync(pathModule(path, './template/css/less/fonts.less'), `${process.cwd()}/${pathCSS}/fonts.less`);
			fs.copyFileSync(pathModule(path, './template/css/vars.css'), `${process.cwd()}/${pathCSS}/vars.less`);
			fs.copyFileSync(pathModule(path, './template/css/main.css'), `${process.cwd()}/${pathCSS}/main.less`);
			fs.copyFileSync(pathModule(path, './template/css/less/mixins.less'), `${process.cwd()}/${pathCSS}/mixins.less`);
			fs.copyFileSync(pathModule(path, './template/css/less/vendors.less'), `${process.cwd()}/${pathCSS}/vendors.less`);
			break;
		case 'Stylus':
			fs.copyFileSync(
				pathModule(path, '../node_modules/normalize.css/normalize.css'),
				`${process.cwd()}/${pathCSS}/vendor/normalize.styl`,
			);
			fs.copyFileSync(
				pathModule(path, './template/css/stylus/font-face.styl'),
				`${process.cwd()}/${pathCSS}/mixins/font-face.styl`,
			);
			fs.copyFileSync(pathModule(path, './template/css/stylus/fonts.styl'), `${process.cwd()}/${pathCSS}/fonts.styl`);
			fs.copyFileSync(pathModule(path, './template/css/vars.css'), `${process.cwd()}/${pathCSS}/vars.styl`);
			fs.copyFileSync(pathModule(path, './template/css/main.css'), `${process.cwd()}/${pathCSS}/main.styl`);
			fs.copyFileSync(pathModule(path, './template/css/stylus/mixins.styl'), `${process.cwd()}/${pathCSS}/mixins.styl`);
			fs.copyFileSync(
				pathModule(path, './template/css/stylus/vendors.styl'),
				`${process.cwd()}/${pathCSS}/vendors.styl`,
			);
			break;
		case 'CSS3':
			fs.copyFileSync(
				pathModule(path, '../node_modules/normalize.css/normalize.css'),
				`${process.cwd()}/${pathCSS}/vendor/normalize.css`,
			);
			fs.copyFileSync(pathModule(path, './template/css/css3/fonts.css'), `${process.cwd()}/${pathCSS}/fonts.css`);
			fs.copyFileSync(pathModule(path, './template/css/main.css'), `${process.cwd()}/${pathCSS}/main.css`);
			fs.copyFileSync(pathModule(path, './template/css/vars.css'), `${process.cwd()}/${pathCSS}/vars.css`);
			fs.copyFileSync(pathModule(path, './template/css/css3/vendors.css'), `${process.cwd()}/${pathCSS}/vendors.css`);
			break;
	}
};
export default createCSS;

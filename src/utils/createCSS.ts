import fs from 'fs';
import { extentionsCss, pathModule } from './util';
import libs from './libs';
import type { Options, ResetCssResults } from '@/types';
import frameworks from './frameworks';

const resetCss: Record<ResetCssResults, string> = {
	'normalize.css': "@import 'normalize.css';",
	'modern-normalize.css': "@import 'modern-normalize';",
	'reset.css': "@import 'reset-css';",
};

const createCSS = async (options: Options) => {
	const pathCSS = extentionsCss[options.css];
	const contentVendor = [
		resetCss[options.resetCss],
		...options.lib.map((lib) => libs[lib].css),
		frameworks[options.framework]?.css || '',
	].join('\n');
	switch (options.css) {
		case 'SASS':
			fs.copyFileSync(
				pathModule('./template/css/scss/font-face.scss'),
				`${process.cwd()}/${pathCSS}/mixins/_font-face.scss`,
			);
			fs.copyFileSync(pathModule('./template/css/scss/fonts.scss'), `${process.cwd()}/${pathCSS}/_fonts.scss`);
			fs.copyFileSync(pathModule('./template/css/vars.css'), `${process.cwd()}/${pathCSS}/_vars.scss`);
			fs.copyFileSync(pathModule('./template/css/scss/main.scss'), `${process.cwd()}/${pathCSS}/main.scss`);
			fs.copyFileSync(pathModule('./template/css/scss/mixins.scss'), `${process.cwd()}/${pathCSS}/_mixins.scss`);
			fs.writeFileSync(`${process.cwd()}/${pathCSS}/vendors.scss`, contentVendor, 'utf8');
			break;
		case 'LESS':
			fs.copyFileSync(
				pathModule('./template/css/less/font-face.less'),
				`${process.cwd()}/${pathCSS}/mixins/font-face.less`,
			);
			fs.copyFileSync(pathModule('./template/css/less/fonts.less'), `${process.cwd()}/${pathCSS}/fonts.less`);
			fs.copyFileSync(pathModule('./template/css/vars.css'), `${process.cwd()}/${pathCSS}/vars.less`);
			fs.copyFileSync(pathModule('./template/css/less/main.less'), `${process.cwd()}/${pathCSS}/main.less`);
			fs.copyFileSync(pathModule('./template/css/less/mixins.less'), `${process.cwd()}/${pathCSS}/mixins.less`);
			fs.writeFileSync(`${process.cwd()}/${pathCSS}/vendors.less`, contentVendor, 'utf8');
			break;
		case 'Stylus':
			fs.copyFileSync(
				pathModule('./template/css/stylus/font-face.styl'),
				`${process.cwd()}/${pathCSS}/mixins/font-face.styl`,
			);
			fs.copyFileSync(pathModule('./template/css/stylus/fonts.styl'), `${process.cwd()}/${pathCSS}/fonts.styl`);
			fs.copyFileSync(pathModule('./template/css/vars.css'), `${process.cwd()}/${pathCSS}/vars.styl`);
			fs.copyFileSync(pathModule('./template/css/stylus/main.styl'), `${process.cwd()}/${pathCSS}/main.styl`);
			fs.copyFileSync(pathModule('./template/css/stylus/mixins.styl'), `${process.cwd()}/${pathCSS}/mixins.styl`);
			fs.writeFileSync(`${process.cwd()}/${pathCSS}/vendors.styl`, contentVendor, 'utf8');
			break;
		case 'CSS':
			fs.copyFileSync(pathModule('./template/css/css/fonts.css'), `${process.cwd()}/${pathCSS}/fonts.css`);
			fs.copyFileSync(pathModule('./template/css/css/main.css'), `${process.cwd()}/${pathCSS}/main.css`);
			fs.copyFileSync(pathModule('./template/css/vars.css'), `${process.cwd()}/${pathCSS}/vars.css`);
			fs.writeFileSync(`${process.cwd()}/${pathCSS}/vendors.css`, contentVendor, 'utf8');
			break;
	}
};
export default createCSS;

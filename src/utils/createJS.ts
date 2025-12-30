import fs from 'fs';
import libs from './libs';
import { extentionsJs } from './util';
import { Options } from '@/types';
import frameworks from './frameworks';

const createJS = async (options: Options) => {
	fs.writeFileSync(`${process.cwd()}/${extentionsJs[options.js]}/main.${extentionsJs[options.js]}`, '', 'utf8');
	const contentVendor = [...options.lib?.map((lib) => libs[lib].js), frameworks[options.framework]?.css || ''].join(
		'\n',
	);
	fs.writeFileSync(
		`${process.cwd()}/${extentionsJs[options.js]}/vendor/vendor.${extentionsJs[options.js]}`,
		contentVendor,
		'utf8',
	);
};

export default createJS;

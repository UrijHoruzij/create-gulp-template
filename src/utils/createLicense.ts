import license from 'spdx-license-list/full.js';
import fs from 'fs';
import type { Options } from '@/types';

const createLicense = async (options: Options) => {
	const licenseContent = license.MIT.licenseText
		.replace('<year>', new Date().getFullYear().toString())
		.replace('<copyright holders>', `${options.nameProject}`);
	fs.writeFileSync(`${process.cwd()}/LICENSE`, licenseContent, 'utf8');
};
export default createLicense;

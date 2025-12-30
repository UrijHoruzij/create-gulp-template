import chalk from 'chalk';
import Listr from 'listr';
import {
	createGulpFile,
	createPackage,
	createFolders,
	createHTML,
	createJS,
	createCSS,
	createFiles,
	createSnippets,
	createLicense,
} from '@/utils';
import { Options } from '@/types';
import { gitInit } from '@/utils/util';

export const createProject = async (options: Options) => {
	options = {
		...options,
	};
	const tasks = new Listr(
		[
			{
				title: 'Create folders',
				task: () => createFolders(options),
			},
			{
				title: 'Create project files',
				task: async () => {
					await createPackage(options);
					await createFiles(options);
					await createLicense(options);
					await createHTML(options);
					await createJS(options);
					await createCSS(options);
					await createGulpFile(options);
					await createSnippets();
				},
			},
			{
				title: 'Initialize git',
				task: () => gitInit(),
				enabled: () => options.git,
			},
		],
		{
			exitOnError: false,
		},
	);
	await tasks.run();
	console.log(chalk.green.bold('DONE'));
	return true;
};

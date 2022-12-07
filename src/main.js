import chalk from 'chalk';
import execa from 'execa';
import fs from 'fs';
import Listr from 'listr';
import { projectInstall } from 'pkg-install';
import license from 'spdx-license-list/licenses/MIT';
import {
	createGulpFile,
	createGitignore,
	createPackage,
	createFolders,
	createHTML,
	createJS,
	createCSS,
	createFiles,
	createLib,
	createSnippets,
} from './';

const createFolder = (options) => {
	if (fs.existsSync(`${process.cwd()}/${options.nameProject}`)) {
		process.chdir(`${process.cwd()}/${options.nameProject}`);
	} else {
		fs.mkdirSync(options.nameProject);
		process.chdir(`${process.cwd()}/${options.nameProject}`);
	}
	return;
};
const createLicense = async (options) => {
	const licenseContent = license.licenseText
		.replace('<year>', new Date().getFullYear())
		.replace('<copyright holders>', `${options.name}`);
	fs.writeFileSync(`${process.cwd()}/LICENSE`, licenseContent, 'utf8');
	return;
};
const initGit = async () => {
	const result = await execa('git', ['init'], {
		cwd: process.cwd(),
	});
	if (result.failed) {
		return Promise.reject(new Error('Failed to initialize git'));
	}
	return;
};
export const createProject = async (options) => {
	options = {
		...options,
		name: 'Urij Horuzij',
	};
	const tasks = new Listr(
		[
			{
				title: 'Create folder',
				task: () => createFolder(options),
			},
			{
				title: 'Create project files',
				task: () => {
					createPackage(options);
					createFiles();
					createGitignore();
					createLicense(options);
					createFolders(options);
					createHTML(options);
					createJS(options);
					createCSS(options);
					createGulpFile(options);
					createLib(options);
					createSnippets();
				},
			},
			{
				title: 'Initialize git',
				task: () => initGit(),
				enabled: () => options.git,
			},
			// {
			// 	title: 'Install dependencies',
			// 	task: () =>
			// 		projectInstall({
			// 			cwd: process.cwd(),
			// 		}),
			// },
		],
		{
			exitOnError: false,
		},
	);
	await tasks.run();
	console.log(chalk.green.bold('DONE'));
	return true;
};

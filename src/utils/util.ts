import path from 'path';
import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import type { CssResults, HtmlResults, JsResults, PackageManagerResults } from '@/types';

export const extentionsHtml: Record<HtmlResults, 'html' | 'pug' | 'njk'> = {
	HTML5: 'html',
	Pug: 'pug',
	Nunjucks: 'njk',
};

export const extentionsCss: Record<CssResults, 'scss' | 'less' | 'styl' | 'css'> = {
	SASS: 'scss',
	LESS: 'less',
	Stylus: 'styl',
	CSS: 'css',
};

export const extentionsJs: Record<JsResults, 'js' | 'ts' | 'coffee'> = {
	JavaScript: 'js',
	TypeScript: 'ts',
	CoffeeScript: 'coffee',
};

export const pathModule = (pathFile: string) => {
	const __filename = fileURLToPath(import.meta.url);
	return path.resolve(path.dirname(__filename), pathFile);
};

export const installPackages = (
	packageNames: string | string[],
	packageManager: PackageManagerResults,
	options?: {
		dev?: boolean;
		options?: string;
	},
) => {
	return new Promise<void>((resolve, reject) => {
		let packages = null;
		if (Array.isArray(packageNames)) {
			packages = packageNames.join(' ');
		} else {
			packages = packageNames;
		}
		let args = ['install', packages];
		switch (packageManager) {
			case 'npm':
				args = ['install', packages];
				break;
			case 'yarn':
			case 'pnpm':
				args = ['add', packages];
				break;
			default:
				args = ['install', packages];
				break;
		}

		if (options?.dev) {
			args.push('-D');
		}
		if (options?.options) {
			const opt = options?.options.split(' ');
			args.concat(opt);
		}
		const processInstall = spawn(packageManager, args, {
			stdio: 'inherit',
			shell: true,
		});
		processInstall.on('close', (code) => {
			if (code === 0) {
				resolve();
			} else {
				reject(new Error(`The installation was completed with the code ${code}`));
			}
		});
		processInstall.on('error', (err) => {
			reject(err);
		});
	});
};

export const npmInit = () => {
	return new Promise<void>((resolve, reject) => {
		const processNpm = spawn('npm', ['init -y'], {
			stdio: 'inherit',
			shell: true,
		});
		processNpm.on('close', (code: number) => {
			if (code === 0) {
				resolve();
			} else {
				reject(new Error(`The initialization was completed with the code ${code}`));
			}
		});
		processNpm.on('error', (err) => {
			reject(err);
		});
	});
};

export const gitInit = async () => {
	return new Promise<void>((resolve, reject) => {
		const processGit = spawn('git', ['init'], {
			stdio: 'inherit',
			shell: true,
			cwd: process.cwd(),
		});
		processGit.on('close', (code: number) => {
			if (code === 0) {
				resolve();
			} else {
				reject(new Error(`The installation was completed with the code ${code}`));
			}
		});
		processGit.on('error', (err) => {
			reject(err);
		});
	});
};

import chalk from 'chalk';
import clear from 'clear';
import figlet from 'figlet';
import { select, checkbox, confirm, input } from '@inquirer/prompts';
import { createProject } from '@/main';
import {
	Arguments,
	CssResults,
	FrameworkResults,
	HtmlResults,
	JsResults,
	LibResults,
	Options,
	PackageManagerResults,
	ResetCssResults,
} from '@/types';

const parseArgumentsIntoOptions = (args: string[]): Arguments => {
	return {
		skipPrompts: args.includes('--yes') || args.includes('--y') || false,
		git: args.includes('--git') || false,
		packageManagerOptions: args.includes('--package-options') || false,
		nameProject: args[2],
	};
};

const promptForMissingOptions = async (options: Arguments): Promise<Options> => {
	if (options.skipPrompts) {
		return {
			...options,
			html: 'HTML5',
			css: 'CSS',
			resetCss: 'modern-normalize.css',
			js: 'JavaScript',
			framework: 'Without a framework',
			lib: [],
			git: false,
			packageManager: 'npm',
			packageManagerOptions: '',
		};
	}

	const html = await select<HtmlResults>({
		message: 'Select the preprocessor',
		default: 'HTML5',
		choices: [
			{
				name: 'HTML5',
				value: 'HTML5',
			},
			{
				name: 'Pug',
				value: 'Pug',
			},
			{
				name: 'Nunjucks',
				value: 'Nunjucks',
			},
		],
	});

	const css = await select<CssResults>({
		message: 'Select the CSS preprocessor',
		default: 'CSS',
		choices: [
			{
				name: 'CSS3',
				value: 'CSS',
			},
			{
				name: 'SASS',
				value: 'SASS',
			},
			{
				name: 'LESS',
				value: 'LESS',
			},
			{
				name: 'Stylus',
				value: 'Stylus',
			},
		],
	});

	const resetCss = await select<ResetCssResults>({
		message: 'Select the Reset CSS',
		default: 'modern-normalize.css',
		choices: [
			{
				name: 'normalize.css',
				value: 'normalize.css',
			},
			{
				name: 'modern-normalize.css',
				value: 'modern-normalize.css',
			},
			{
				name: 'reset.css',
				value: 'reset.css',
			},
		],
	});

	const js = await select<JsResults>({
		message: 'Select the JS',
		default: 'JavaScript',
		choices: [
			{
				name: 'JavaScript',
				value: 'JavaScript',
			},
			{
				name: 'TypeScript',
				value: 'TypeScript',
			},
			{
				name: 'CoffeeScript',
				value: 'CoffeeScript',
			},
		],
	});

	const framework = await select<FrameworkResults>({
		message: 'Select the framework',
		choices: [
			{
				name: 'Without a framework',
				value: 'Without a framework',
			},
			{
				name: 'Materialize',
				value: 'Materialize',
			},
			{
				name: 'Bootstrap 3',
				value: 'Bootstrap 3',
			},
			{
				name: 'Bootstrap 4',
				value: 'Bootstrap 4',
			},
			{
				name: 'Bootstrap 5',
				value: 'Bootstrap 5',
			},
		],
	});

	const lib = await checkbox<LibResults>({
		message: 'Select the library',
		choices: [
			{ name: 'Swiper.js', value: 'Swiper.js' },
			{ name: 'locomotive scroll', value: 'locomotive scroll' },
			{ name: 'Jquery', value: 'Jquery' },
			{ name: 'GSAP', value: 'GSAP' },
			{ name: 'Slick.js', value: 'Slick.js' },
			{ name: 'Fotorama.js', value: 'Fotorama.js' },
			{ name: 'fullPage.js', value: 'fullPage.js' },
			{ name: 'popper.js', value: 'popper.js' },
			{ name: 'D3.js', value: 'D3.js' },
			{ name: 'Chart.js', value: 'Chart.js' },
			{ name: 'Anime.js', value: 'Anime.js' },
			{ name: 'screenfull.js', value: 'screenfull.js' },
			{ name: 'Three.js', value: 'Three.js' },
		],
	});

	const packageManager = await select<PackageManagerResults>({
		message: 'Select the package manager',
		choices: [
			{
				name: 'npm',
				value: 'npm',
			},
			{
				name: 'yarn',
				value: 'yarn',
			},
			{
				name: 'pnpm',
				value: 'pnpm',
			},
			{ name: 'bun', value: 'bun' },
		],
	});

	let packageManagerOptions = '';
	if (options.packageManagerOptions) {
		packageManagerOptions = await input({ message: 'Enter the package manager options' });
	}

	const git = await confirm({ message: 'Initilization git?', default: false });

	return {
		...options,
		html,
		css,
		resetCss,
		js,
		framework,
		lib,
		git,
		packageManager,
		packageManagerOptions,
	};
};

const cli = async (args: string[]) => {
	try {
		clear();
		console.log(chalk.red(figlet.textSync('Create-Gulp-Template', { horizontalLayout: 'default' })));
		const argsOptions = parseArgumentsIntoOptions(args);
		const options = await promptForMissingOptions(argsOptions);
		await createProject(options);
	} catch (err) {
		console.log(chalk.red.bold('ERROR'));
		console.log(chalk.red(err));
	}
};
export default cli;

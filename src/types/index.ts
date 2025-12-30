export type Arguments = {
	skipPrompts: boolean;
	git: boolean;
	nameProject: string;
	packageManagerOptions: boolean;
};
export type Options = Omit<Arguments, 'packageManagerOptions'> & {
	html: HtmlResults;
	css: CssResults;
	resetCss: ResetCssResults;
	js: JsResults;
	framework: FrameworkResults;
	lib: LibResults[];
	packageManager: PackageManagerResults;
	packageManagerOptions: string;
};

export type HtmlResults = 'HTML5' | 'Pug' | 'Nunjucks';
export type CssResults = 'CSS' | 'SASS' | 'LESS' | 'Stylus';
export type ResetCssResults = 'normalize.css' | 'modern-normalize.css' | 'reset.css';
export type JsResults = 'JavaScript' | 'TypeScript' | 'CoffeeScript';
export type FrameworkResults = 'Without a framework' | 'Materialize' | 'Bootstrap 3' | 'Bootstrap 4' | 'Bootstrap 5';
export type LibResults =
	| 'Swiper.js'
	| 'locomotive scroll'
	| 'Jquery'
	| 'GSAP'
	| 'Slick.js'
	| 'Fotorama.js'
	| 'fullPage.js'
	| 'popper.js'
	| 'D3.js'
	| 'Chart.js'
	| 'Anime.js'
	| 'screenfull.js'
	| 'Three.js';
export type PackageManagerResults = 'npm' | 'yarn' | 'pnpm' | 'bun';

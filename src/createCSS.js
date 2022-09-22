import fs from 'fs';
import chalk from 'chalk';
import { promisify } from 'util';
import path from 'path';
import { changePathCSS, pathNodeModules } from './util';
const writeFile = promisify(fs.writeFile);

const createCSS = async (options) => {
	try {
		const contentNormalize = fs.readFileSync(
			pathNodeModules(path, '../node_modules/normalize.css/normalize.css'),
			'utf8',
		);
		const contentMain = `@import "vars";
@import "mixins";
@import "fonts";`;
		const contentVars = `:root {
  --color-black: #000;
  --color-white: #fff;
}`;
		let pathCSS = changePathCSS(options);
		switch (options.css) {
			case 'SASS':
				writeFile(`${process.cwd()}/${pathCSS}/vendor/normalize.css`, contentNormalize, 'utf8');
				writeFile(
					`${process.cwd()}/${pathCSS}/mixins/_font-face.scss`,
					`@mixin font-face($font-family, $url, $weight, $style) {
  @font-face {
    font-family: "#{$font-family}";
    src: url("../fonts/#{$url}.woff2") format("woff2");
    font-weight: #{$weight};
    font-display: swap;
    font-style: $style;
  }
}`,
					'utf8',
				);
				writeFile(
					`${process.cwd()}/${pathCSS}/_fonts.scss`,
					`// @include font-face("Muller", "../fonts/MullerRegular", 400, normal);`,
					'utf8',
				);
				writeFile(`${process.cwd()}/${pathCSS}/_mixins.scss`, `@import "./mixins/font-face";`, 'utf8');
				writeFile(`${process.cwd()}/${pathCSS}/_vars.scss`, contentVars, 'utf8');
				writeFile(`${process.cwd()}/${pathCSS}/main.scss`, contentMain, 'utf8');
				writeFile(`${process.cwd()}/${pathCSS}/vendors.scss`, `@import "./vendor/normalize";`, 'utf8');
				break;
			case 'LESS':
				writeFile(`${process.cwd()}/${pathCSS}/vendor/normalize.less`, contentNormalize, 'utf8');
				writeFile(
					`${process.cwd()}/${pathCSS}/mixins/font-face.less`,
					`.font-face(@font-family, @url, @weight, @style) {
  @font-face {
    font-family: @font-family;
    src: url("../fonts/{@url}.woff2") format("woff2");
    font-weight: @weight;
    font-display: swap;
    font-style: $style;
  }
}`,
					'utf8',
				);
				writeFile(
					`${process.cwd()}/${pathCSS}/fonts.less`,
					`// @include font-face("Muller", "../fonts/MullerRegular", 400, normal);`,
					'utf8',
				);
				writeFile(`${process.cwd()}/${pathCSS}/mixins.less`, `@import "./mixins/font-face";`, 'utf8');
				writeFile(`${process.cwd()}/${pathCSS}/vars.less`, contentVars, 'utf8');
				writeFile(`${process.cwd()}/${pathCSS}/main.less`, contentMain, 'utf8');
				writeFile(`${process.cwd()}/${pathCSS}/vendors.less`, `@import "./vendor/normalize";`, 'utf8');
				break;
			case 'Stylus':
				writeFile(`${process.cwd()}/${pathCSS}/vendor/normalize.styl`, contentNormalize, 'utf8');
				writeFile(
					`${process.cwd()}/${pathCSS}/mixins/font-face.styl`,
					`font-url(file)
  return '../fonts/' + file

webfont(family, file,weight, style)
  @font-face
    font-family family
    src url(font-url(file + '.woff2')) format('woff2'), 
    font-weight weight
    font-style normal
    font-display swap
    font-style style
      `,
					'utf8',
				);
				writeFile(
					`${process.cwd()}/${pathCSS}/fonts.styl`,
					`// webfont("Muller", "../fonts/MullerRegular", 400, normal);`,
					'utf8',
				);
				writeFile(`${process.cwd()}/${pathCSS}/mixins.styl`, `@import "./mixins/font-face";`, 'utf8');
				writeFile(`${process.cwd()}/${pathCSS}/vars.styl`, contentVars, 'utf8');
				writeFile(`${process.cwd()}/${pathCSS}/main.styl`, contentMain, 'utf8');
				writeFile(`${process.cwd()}/${pathCSS}/vendors.styl`, `@import "./vendor/normalize";`, 'utf8');
				break;
			case 'CSS3':
				writeFile(`${process.cwd()}/${pathCSS}/vendor/normalize.css`, contentNormalize, 'utf8');
				writeFile(
					`${process.cwd()}/${pathCSS}/fonts.css`,
					`/* @font-face {
          font-family: "#{$font-family}";
          src: url("../fonts/#{$url}.woff2") format("woff2");
          font-weight: #{$weight};
          font-display: swap;
          font-style: $style;
        } */`,
					'utf8',
				);
				writeFile(`${process.cwd()}/${pathCSS}/main.css`, contentMain, 'utf8');
				writeFile(`${process.cwd()}/${pathCSS}/vars.css`, contentVars, 'utf8');
				writeFile(`${process.cwd()}/${pathCSS}/vendor.css`, `@import "./vendor/normalize.css";`, 'utf8');
				break;
		}
	} catch (err) {
		console.log(chalk.red.bold('ERROR'));
		console.log(chalk.red(err));
	}
};
export default createCSS;

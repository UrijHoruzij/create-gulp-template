import type { LibResults } from '@/types';

const libs: Record<LibResults, { install: string[]; js: string; css?: string }> = {
	'Swiper.js': {
		install: ['swiper'],
		js: "import Swiper from 'swiper';",
		css: "@import 'swiper/swiper-bundle.min.css';",
	},
	'locomotive scroll': {
		install: ['locomotive-scroll'],
		js: "import LocomotiveScroll from 'locomotive-scroll';",
		css: "@import 'locomotive-scroll/dist/locomotive-scroll.min.css';",
	},
	Jquery: { install: ['jquery'], js: "import $ from 'jquery';" },
	GSAP: { install: ['gsap'], js: "import gsap from 'gsap';" },
	'Slick.js': {
		install: ['jquery', 'slick-slider'],
		js: "import Slick from 'slick-slider';",
		css: `@import 'slick-slider/slick/slick-theme.css';
@import 'slick-slider/slick/slick.css';`,
	},
	'Fotorama.js': {
		install: ['jquery', 'fotorama'],
		js: `import $ from 'jquery';
		import fotorama from 'fotorama';`,
		css: "@import 'fotorama/fotorama.css';",
	},
	'fullPage.js': {
		install: ['fullpage.js'],
		js: "import fullpage from 'fullpage.js';",
		css: "@import 'fullpage.js/dist/fullpage.min.css';",
	},
	'popper.js': { install: ['@popperjs/core'], js: "import { createPopper } from '@popperjs/core';" },
	'D3.js': { install: ['d3'], js: "import * as d3 from 'd3';" },
	'Chart.js': {
		install: ['chart.js'],
		js: "import { Chart } from 'chart.js';",
	},
	'Anime.js': { install: ['animejs'], js: "import anime from 'animejs';" },
	'screenfull.js': { install: ['screenfull'], js: "import screenfull from 'screenfull';" },
	'Three.js': { install: ['three'], js: "import * as THREE from 'three';" },
};

export default libs;

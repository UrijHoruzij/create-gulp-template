import type { FrameworkResults } from '@/types';

const frameworks: Record<FrameworkResults, { install: string[]; js?: string; css?: string }> = {
	'Without a framework': { install: [] },
	Materialize: {
		install: ['materialize-css'],
		js: "import 'materialize-css';",
		css: "@import 'materialize-css/dist/css/materialize.min.css';",
	},
	'Bootstrap 3': {
		install: ['bootstrap@3.4.1'],
		js: "import 'bootstrap';",
		css: "@import 'bootstrap/dist/css/bootstrap.min.css';",
	},
	'Bootstrap 4': {
		install: ['bootstrap@4.6.2'],
		js: "import 'bootstrap';",
		css: "@import 'bootstrap/dist/css/bootstrap.min.css';",
	},
	'Bootstrap 5': {
		install: ['bootstrap@5.3.8'],
		js: "import 'bootstrap';",
		css: "@import 'bootstrap/dist/css/bootstrap.min.css';",
	},
};

export default frameworks;

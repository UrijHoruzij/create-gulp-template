import chalk from 'chalk';
import clear from 'clear';
import figlet from 'figlet';
import { confirm, input, select, checkbox } from '@inquirer/prompts';
import Listr from 'listr';
import fs from 'node:fs';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import license from 'spdx-license-list/full.js';

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol, Iterator */


var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

var extentionsHtml = {
    HTML5: 'html',
    Pug: 'pug',
    Nunjucks: 'njk',
};
var extentionsCss = {
    SASS: 'scss',
    LESS: 'less',
    Stylus: 'styl',
    CSS: 'css',
};
var extentionsJs = {
    JavaScript: 'js',
    TypeScript: 'ts',
    CoffeeScript: 'coffee',
};
var pathModule = function (pathFile) {
    var __filename = fileURLToPath(import.meta.url);
    return path.resolve(path.dirname(__filename), pathFile);
};
var installPackages = function (packageNames, packageManager, options) {
    return new Promise(function (resolve, reject) {
        var packages = null;
        if (Array.isArray(packageNames)) {
            packages = packageNames.join(' ');
        }
        else {
            packages = packageNames;
        }
        var args = ['install', packages];
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
        if (options === null || options === void 0 ? void 0 : options.dev) {
            args.push('-D');
        }
        if (options === null || options === void 0 ? void 0 : options.options) {
            var opt = options === null || options === void 0 ? void 0 : options.options.split(' ');
            args.concat(opt);
        }
        var processInstall = spawn(packageManager, args, {
            stdio: 'inherit',
            shell: true,
        });
        processInstall.on('close', function (code) {
            if (code === 0) {
                resolve();
            }
            else {
                reject(new Error("The installation was completed with the code ".concat(code)));
            }
        });
        processInstall.on('error', function (err) {
            reject(err);
        });
    });
};
var npmInit = function () {
    return new Promise(function (resolve, reject) {
        var processNpm = spawn('npm', ['init -y'], {
            stdio: 'inherit',
            shell: true,
        });
        processNpm.on('close', function (code) {
            if (code === 0) {
                resolve();
            }
            else {
                reject(new Error("The initialization was completed with the code ".concat(code)));
            }
        });
        processNpm.on('error', function (err) {
            reject(err);
        });
    });
};
var gitInit = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, new Promise(function (resolve, reject) {
                var processGit = spawn('git', ['init'], {
                    stdio: 'inherit',
                    shell: true,
                    cwd: process.cwd(),
                });
                processGit.on('close', function (code) {
                    if (code === 0) {
                        resolve();
                    }
                    else {
                        reject(new Error("The installation was completed with the code ".concat(code)));
                    }
                });
                processGit.on('error', function (err) {
                    reject(err);
                });
            })];
    });
}); };

var libs = {
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
        css: "@import 'slick-slider/slick/slick-theme.css';\n@import 'slick-slider/slick/slick.css';",
    },
    'Fotorama.js': {
        install: ['jquery', 'fotorama'],
        js: "import $ from 'jquery';\n\t\timport fotorama from 'fotorama';",
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

var frameworks = {
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

var devDependencies = [
    'prettier',
    'postcss',
    'gulp-postcss',
    'autoprefixer',
    'gulp',
    'browser-sync',
    'del',
    'gulp-if',
    'gulp-notify',
    'gulp-imagemin',
    'node-w3c-validator',
    'gulp-sourcemaps',
    'gulp-rev',
    'gulp-rev-rewrite',
    'gulp-rev-delete-original',
    'gulp-clean-css',
    'gulp-htmlmin',
    'gulp-rename',
    'rollup',
    'gulp-rollup-2',
    '@rollup/plugin-node-resolve',
    '@rollup/plugin-commonjs',
    'rollup-plugin-terser',
    '@babel/core',
    'postcss-import',
];
var devDependenciesHtml = {
    HTML5: ['gulp-file-include'],
    Pug: ['pug', 'gulp-pug'],
    Nunjucks: ['gulp-nunjucks'],
};
var devDependenciesCss = {
    CSS: [],
    SASS: ['sass', 'gulp-sass'],
    LESS: ['gulp-less'],
    Stylus: ['gulp-stylus'],
};
var dependenciesResetCss = {
    'normalize.css': ['normalize.css'],
    'modern-normalize.css': ['modern-normalize'],
    'reset.css': ['reset-css'],
};
var devDependenciesJs = {
    JavaScript: ['@rollup/plugin-babel', '@babel/preset-env'],
    TypeScript: ['typescript', 'rollup-plugin-typescript2'],
    CoffeeScript: ['rollup-plugin-coffee-script'],
};
var createPackage = function (options) { return __awaiter(void 0, void 0, void 0, function () {
    var libsDependencies, data, json;
    var _a, _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0: return [4 /*yield*/, npmInit()];
            case 1:
                _d.sent();
                devDependencies.push.apply(devDependencies, __spreadArray(__spreadArray(__spreadArray([], devDependenciesHtml[options.html], false), devDependenciesCss[options.css], false), devDependenciesJs[options.js], false));
                return [4 /*yield*/, installPackages(devDependencies, options.packageManager, { dev: true })];
            case 2:
                _d.sent();
                return [4 /*yield*/, installPackages(dependenciesResetCss[options.resetCss], options.packageManager)];
            case 3:
                _d.sent();
                libsDependencies = options.lib.reduce(function (acc, lib) { return acc.concat(libs[lib].install); }, []);
                if (!libsDependencies.length) return [3 /*break*/, 5];
                return [4 /*yield*/, installPackages(libsDependencies, options.packageManager)];
            case 4:
                _d.sent();
                _d.label = 5;
            case 5:
                if (!((_b = (_a = frameworks[options.framework]) === null || _a === void 0 ? void 0 : _a.install) === null || _b === void 0 ? void 0 : _b.length)) return [3 /*break*/, 7];
                return [4 /*yield*/, installPackages((_c = frameworks[options.framework]) === null || _c === void 0 ? void 0 : _c.install, options.packageManager)];
            case 6:
                _d.sent();
                _d.label = 7;
            case 7: return [4 /*yield*/, fs.readFileSync("".concat(process.cwd(), "/package.json"), 'utf8')];
            case 8:
                data = _d.sent();
                json = JSON.parse(data);
                json.scripts = {
                    html: 'node-w3c-validator -f lint -evH -i public/**/*.html',
                    dev: 'gulp',
                    build: 'gulp build',
                    cache: 'gulp cache',
                    deploy: 'gulp deploy',
                    prettier: 'prettier',
                };
                json.license = 'MIT';
                json.main = 'gulpfile.js';
                fs.writeFileSync("".concat(process.cwd(), "/package.json"), JSON.stringify(json, null, 4), 'utf8');
                return [2 /*return*/];
        }
    });
}); };

var isJs = function (prefix) {
    return prefix === 'js' || prefix === 'ts' || prefix === 'coffee';
};
var createNestedFolder = function (prefix) {
    fs.mkdirSync("".concat(process.cwd(), "/").concat(prefix));
    fs.mkdirSync("".concat(process.cwd(), "/").concat(prefix, "/vendor"));
    if (prefix !== 'css' && !isJs(prefix))
        fs.mkdirSync("".concat(process.cwd(), "/").concat(prefix, "/mixins"));
};
var createFolders = function (options) {
    if (fs.existsSync("".concat(process.cwd(), "/").concat(options.nameProject))) {
        process.chdir("".concat(process.cwd(), "/").concat(options.nameProject));
    }
    else {
        fs.mkdirSync(options.nameProject);
        process.chdir("".concat(process.cwd(), "/").concat(options.nameProject));
    }
    fs.mkdirSync("".concat(process.cwd(), "/img"));
    fs.mkdirSync("".concat(process.cwd(), "/partials"));
    fs.mkdirSync("".concat(process.cwd(), "/resources"));
    fs.mkdirSync("".concat(process.cwd(), "/resources/fonts"));
    createNestedFolder(extentionsCss[options.css]);
    createNestedFolder(extentionsJs[options.js]);
};

var createLicense = function (options) { return __awaiter(void 0, void 0, void 0, function () {
    var licenseContent;
    return __generator(this, function (_a) {
        licenseContent = license.MIT.licenseText
            .replace('<year>', new Date().getFullYear().toString())
            .replace('<copyright holders>', "".concat(options.nameProject));
        fs.writeFileSync("".concat(process.cwd(), "/LICENSE"), licenseContent, 'utf8');
        return [2 /*return*/];
    });
}); };

var createSnippets = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        fs.mkdirSync("".concat(process.cwd(), "/.vscode"));
        fs.mkdirSync("".concat(process.cwd(), "/.vscode/snippets"));
        fs.copyFileSync(pathModule('./snippets/extensions.json'), "".concat(process.cwd(), "/.vscode/extensions.json"));
        fs.copyFileSync(pathModule('./snippets/html.json'), "".concat(process.cwd(), "/.vscode/snippets/html.json"));
        return [2 /*return*/];
    });
}); };

var createHTML = function (options) { return __awaiter(void 0, void 0, void 0, function () {
    var htmlHeaderTemplate, htmlFooterTemplate, pugHeaderTemplate, pugFooterTemplate;
    return __generator(this, function (_a) {
        htmlHeaderTemplate = "<header>\n  </header>\n";
        htmlFooterTemplate = "<footer>\n  </footer>";
        pugHeaderTemplate = "header";
        pugFooterTemplate = "footer";
        switch (options.html) {
            case 'HTML5':
                fs.copyFileSync(pathModule('./template/html/html.html'), "".concat(process.cwd(), "/index.html"));
                fs.writeFileSync("".concat(process.cwd(), "/partials/header.html"), htmlHeaderTemplate, 'utf8');
                fs.writeFileSync("".concat(process.cwd(), "/partials/footer.html"), htmlFooterTemplate, 'utf8');
                break;
            case 'Pug':
                fs.copyFileSync(pathModule('./template/html/pug.pug'), "".concat(process.cwd(), "/index.pug"));
                fs.writeFileSync("".concat(process.cwd(), "/partials/header.pug"), pugHeaderTemplate, 'utf8');
                fs.writeFileSync("".concat(process.cwd(), "/partials/footer.pug"), pugFooterTemplate, 'utf8');
                break;
            case 'Nunjucks':
                fs.copyFileSync(pathModule('./template/html/nunjucks.html'), "".concat(process.cwd(), "/index.html"));
                break;
        }
        return [2 /*return*/];
    });
}); };

var createJS = function (options) { return __awaiter(void 0, void 0, void 0, function () {
    var contentVendor;
    var _a, _b;
    return __generator(this, function (_c) {
        fs.writeFileSync("".concat(process.cwd(), "/").concat(extentionsJs[options.js], "/main.").concat(extentionsJs[options.js]), '', 'utf8');
        contentVendor = __spreadArray(__spreadArray([], (_a = options.lib) === null || _a === void 0 ? void 0 : _a.map(function (lib) { return libs[lib].js; }), true), [((_b = frameworks[options.framework]) === null || _b === void 0 ? void 0 : _b.css) || ''], false).join('\n');
        fs.writeFileSync("".concat(process.cwd(), "/").concat(extentionsJs[options.js], "/vendor/vendor.").concat(extentionsJs[options.js]), contentVendor, 'utf8');
        return [2 /*return*/];
    });
}); };

var resetCss = {
    'normalize.css': "@import 'normalize.css';",
    'modern-normalize.css': "@import 'modern-normalize';",
    'reset.css': "@import 'reset-css';",
};
var createCSS = function (options) { return __awaiter(void 0, void 0, void 0, function () {
    var pathCSS, contentVendor;
    var _a;
    return __generator(this, function (_b) {
        pathCSS = extentionsCss[options.css];
        contentVendor = __spreadArray(__spreadArray([
            resetCss[options.resetCss]
        ], options.lib.map(function (lib) { return libs[lib].css; }), true), [
            ((_a = frameworks[options.framework]) === null || _a === void 0 ? void 0 : _a.css) || '',
        ], false).join('\n');
        switch (options.css) {
            case 'SASS':
                fs.copyFileSync(pathModule('./template/css/scss/font-face.scss'), "".concat(process.cwd(), "/").concat(pathCSS, "/mixins/_font-face.scss"));
                fs.copyFileSync(pathModule('./template/css/scss/fonts.scss'), "".concat(process.cwd(), "/").concat(pathCSS, "/_fonts.scss"));
                fs.copyFileSync(pathModule('./template/css/vars.css'), "".concat(process.cwd(), "/").concat(pathCSS, "/_vars.scss"));
                fs.copyFileSync(pathModule('./template/css/scss/main.scss'), "".concat(process.cwd(), "/").concat(pathCSS, "/main.scss"));
                fs.copyFileSync(pathModule('./template/css/scss/mixins.scss'), "".concat(process.cwd(), "/").concat(pathCSS, "/_mixins.scss"));
                fs.writeFileSync("".concat(process.cwd(), "/").concat(pathCSS, "/vendors.scss"), contentVendor, 'utf8');
                break;
            case 'LESS':
                fs.copyFileSync(pathModule('./template/css/less/font-face.less'), "".concat(process.cwd(), "/").concat(pathCSS, "/mixins/font-face.less"));
                fs.copyFileSync(pathModule('./template/css/less/fonts.less'), "".concat(process.cwd(), "/").concat(pathCSS, "/fonts.less"));
                fs.copyFileSync(pathModule('./template/css/vars.css'), "".concat(process.cwd(), "/").concat(pathCSS, "/vars.less"));
                fs.copyFileSync(pathModule('./template/css/less/main.less'), "".concat(process.cwd(), "/").concat(pathCSS, "/main.less"));
                fs.copyFileSync(pathModule('./template/css/less/mixins.less'), "".concat(process.cwd(), "/").concat(pathCSS, "/mixins.less"));
                fs.writeFileSync("".concat(process.cwd(), "/").concat(pathCSS, "/vendors.less"), contentVendor, 'utf8');
                break;
            case 'Stylus':
                fs.copyFileSync(pathModule('./template/css/stylus/font-face.styl'), "".concat(process.cwd(), "/").concat(pathCSS, "/mixins/font-face.styl"));
                fs.copyFileSync(pathModule('./template/css/stylus/fonts.styl'), "".concat(process.cwd(), "/").concat(pathCSS, "/fonts.styl"));
                fs.copyFileSync(pathModule('./template/css/vars.css'), "".concat(process.cwd(), "/").concat(pathCSS, "/vars.styl"));
                fs.copyFileSync(pathModule('./template/css/stylus/main.styl'), "".concat(process.cwd(), "/").concat(pathCSS, "/main.styl"));
                fs.copyFileSync(pathModule('./template/css/stylus/mixins.styl'), "".concat(process.cwd(), "/").concat(pathCSS, "/mixins.styl"));
                fs.writeFileSync("".concat(process.cwd(), "/").concat(pathCSS, "/vendors.styl"), contentVendor, 'utf8');
                break;
            case 'CSS':
                fs.copyFileSync(pathModule('./template/css/css/fonts.css'), "".concat(process.cwd(), "/").concat(pathCSS, "/fonts.css"));
                fs.copyFileSync(pathModule('./template/css/css/main.css'), "".concat(process.cwd(), "/").concat(pathCSS, "/main.css"));
                fs.copyFileSync(pathModule('./template/css/vars.css'), "".concat(process.cwd(), "/").concat(pathCSS, "/vars.css"));
                fs.writeFileSync("".concat(process.cwd(), "/").concat(pathCSS, "/vendors.css"), contentVendor, 'utf8');
                break;
        }
        return [2 /*return*/];
    });
}); };

var createFiles = function (options) {
    fs.copyFileSync(pathModule('./template/.editorconfig'), "".concat(process.cwd(), "/.editorconfig"));
    fs.copyFileSync(pathModule('./template/.prettierrc'), "".concat(process.cwd(), "/.prettierrc"));
    fs.copyFileSync(pathModule('./template/.browserslistrc'), "".concat(process.cwd(), "/.browserslistrc"));
    fs.copyFileSync(pathModule('./template/.gitignore'), "".concat(process.cwd(), "/.gitignore"));
    if (options.js === 'TypeScript') {
        fs.copyFileSync(pathModule('./template/tsconfig.json'), "".concat(process.cwd(), "/tsconfig.json"));
    }
};

var htmlLibrary = {
    HTML5: "import fileInclude from \"gulp-file-include\";",
    Pug: "import pug from 'gulp-pug';",
    Nunjucks: "import nunjucks from 'gulp-nunjucks';",
};
var cssLibrary = {
    CSS: "",
    SASS: "import dartSass from \"sass\";\nimport gulpSass from \"gulp-sass\";\nconst sass = gulpSass(dartSass);",
    LESS: "import less from \"gulp-less\";",
    Stylus: "import stylus from \"gulp-stylus\";",
};
var jsLibrary = {
    JavaScript: "import babel from '@rollup/plugin-babel';",
    TypeScript: "import typescript from 'rollup-plugin-typescript2';",
    CoffeeScript: "import coffeescript from 'rollup-plugin-coffee-script';",
};
var html = function (options) {
    var extHtml = extentionsHtml[options.html] == 'njk' ? extentionsHtml['HTML5'] : extentionsHtml[options.html];
    return "const html = () => {\n      return src([\"./*.".concat(extHtml, "\"])\n      ").concat(options.html === 'HTML5' ? ".pipe(fileInclude({prefix: \"@\",basepath: \"@file\"}))" : "", "\n      ").concat(options.html === 'Pug' ? ".pipe(pug())" : "", "\n      ").concat(options.html === 'Nunjucks' ? ".pipe(nunjucks.compile())" : "", "\n      .pipe(gulpif(isProd, htmlmin({\n        collapseWhitespace: true,\n      })))\n      .pipe(dest(\"./public\"))\n      .pipe(browserSync.stream());\n    };");
};
var styles = function (options) {
    var pathCss = options.css.toLowerCase();
    var extCss = extentionsCss[options.css];
    var plugins = "const plugins = [autoprefixer(), atImport()]";
    return "const styles = () => {\n  ".concat(plugins, "\n  return src(\"./").concat(pathCss, "/**/*.").concat(extCss, "\")\n    .pipe(gulpif(!isProd, sourcemaps.init()))\n    ").concat(options.css == 'SASS' ? ".pipe(sass().on(\"error\", notify.onError()))" : "", "\n    ").concat(options.css == 'LESS' ? ".pipe(less().on(\"error\", notify.onError()))" : "", "\n    ").concat(options.css == 'Stylus' ? ".pipe(stylus().on(\"error\", notify.onError()))" : "", "\n    .pipe(postcss(plugins))\n    .pipe(gulpif(isProd, cleanCSS({ level: 2 })))\n    .pipe(gulpif(!isProd, sourcemaps.write(\".\")))\n    .pipe(dest(\"./public/css/\"))\n    .pipe(browserSync.stream());\n};");
};
var scripts = function (options) {
    var pathJs = extentionsJs[options.js];
    return "\n  const rollupConfig = {\n    output: {\n      format: 'iife', \n      name: 'App', \n      sourcemap: true\n    },\n    plugins: [\n      resolve({\n        browser: true,\n        preferBuiltins: false\n      }),\n      commonjs({\n        include: /node_modules/\n      }),\n    ]\n  };\n  \n  const scripts = () => {\n  src('./".concat(pathJs, "/vendor/vendor.").concat(pathJs, "')\n    .pipe(gulpif(!isProd, sourcemaps.init()))\n    .pipe(rollup2.rollup({\n      ...rollupConfig,\n      output: {\n        ...rollupConfig.output,\n        file: 'vendor.js',\n      },\n      input: './").concat(pathJs, "/vendor/vendor.").concat(pathJs, "',\n      plugins: [\n        ...rollupConfig.plugins,\n        ").concat(options.js === 'JavaScript'
        ? "babel({\n        babelHelpers: 'bundled',\n        presets: ['@babel/preset-env'],\n        exclude: 'node_modules/**'\n      }),"
        : "", "\n        ").concat(options.js === 'TypeScript'
        ? "typescript({\n\t\t\t\ttsconfig: './tsconfig.json',\n\t\t\t\tclean: true,\n\t\t\t}),"
        : "", "\n        ").concat(options.js === 'CoffeeScript' ? "coffeescript()," : "", "\n        terser()\n      ]\n    }))\n    .pipe(rename('vendor.min.js'))\n    .pipe(gulpif(!isProd, sourcemaps.write('.')))\n    .pipe(dest('./public/js/'));\n\n  src([\"./").concat(pathJs, "/vendor/**.js\", \"!./").concat(pathJs, "/vendor/vendor.js\"])\n    .pipe(dest(\"./public/js/\"));\n\n  return src(\"./").concat(pathJs, "/main.").concat(pathJs, "\")\n    .pipe(gulpif(!isProd, sourcemaps.init()))\n    .pipe(rollup2.rollup({\n      ...rollupConfig,\n      output: {\n        ...rollupConfig.output,\n        file: 'main.js',\n      },\n      input: './").concat(pathJs, "/main.").concat(pathJs, "',\n      plugins: [\n        ...rollupConfig.plugins,\n        ").concat(options.js === 'JavaScript'
        ? "babel({\n        babelHelpers: 'bundled',\n        presets: ['@babel/preset-env'],\n        exclude: 'node_modules/**'\n      }),"
        : "", "\n        ").concat(options.js === 'TypeScript'
        ? "typescript({\n\t\t\t\ttsconfig: './tsconfig.json',\n\t\t\t\tclean: true,\n\t\t\t}),"
        : "", "\n        ").concat(options.js === 'CoffeeScript' ? "coffeescript()," : "", "\n      ]\n    }))\n    .pipe(rename('main.js'))\n    .pipe(gulpif(!isProd, sourcemaps.write(\".\")))\n    .pipe(dest(\"./public/js\"))\n    .pipe(browserSync.stream());\n};");
};
var watchCSS = function (options) {
    var pathCss = options.css.toLowerCase();
    var extCss = extentionsCss[options.css];
    return "watch(\"./".concat(pathCss, "/**/*.").concat(extCss, "\", styles);");
};
var watchJS = function (options) {
    var pathJs = extentionsJs[options.js];
    return "watch(\"./".concat(pathJs, "/**/*.").concat(pathJs, "\", scripts);");
};
var watchHTML = function (options) {
    var extHtml = extentionsHtml[options.html] === 'njk' ? extentionsHtml['HTML5'] : extentionsHtml[options.html];
    return "watch(\"./partials/*.".concat(extHtml, "\", html);\n  watch(\"./*.").concat(extHtml, "\", html);");
};
var createGulpFile = function (options) { return __awaiter(void 0, void 0, void 0, function () {
    var gulpfileTemplate;
    return __generator(this, function (_a) {
        gulpfileTemplate = "import gulp from \"gulp\";\nimport cleanCSS from \"gulp-clean-css\";\nimport postcss from \"gulp-postcss\";\nimport autoprefixer from \"autoprefixer\";\nimport atImport from 'postcss-import';\nimport rename from 'gulp-rename';\nimport resolve from '@rollup/plugin-node-resolve';\nimport commonjs from '@rollup/plugin-commonjs';\nimport { terser } from 'rollup-plugin-terser';\nimport rollup2 from 'gulp-rollup-2';\nimport sourcemaps from \"gulp-sourcemaps\";\nimport { deleteAsync } from \"del\";\nimport browserSync from \"browser-sync\";\nimport rev from \"gulp-rev\";\nimport revRewrite from \"gulp-rev-rewrite\";\nimport revDel from \"gulp-rev-delete-original\";\nimport gulpif from \"gulp-if\";\nimport notify from \"gulp-notify\";\nimport imagemin from \"gulp-imagemin\";\nimport { readFileSync } from \"fs\";\nimport htmlmin from \"gulp-htmlmin\";\n".concat(htmlLibrary[options.html], "\n").concat(jsLibrary[options.js], "\n").concat(cssLibrary[options.css], "\n\nbrowserSync.create();\nconst { src, dest, series, watch, parallel } = gulp;\n\nlet isProd = false;\n\nconst toProd = (done) => {\n  isProd = true;\n  done();\n};\n\nconst clean = async () => {\n\treturn await deleteAsync(['public/*']);\n};\n\nconst cachePublic = () => {\n  return src(\"public/**/*.{css,js,svg,png,jpg,jpeg,woff2}\", {\n    base: \"public\",\n  })\n    .pipe(rev())\n    .pipe(revDel())\n    .pipe(dest(\"public\"))\n    .pipe(rev.manifest(\"rev.json\"))\n    .pipe(dest(\"public\"));\n}\n\nconst rewrite = () => {\n  const manifest = readFileSync(\"public/rev.json\");\n  src(\"public/css/*.css\")\n    .pipe(\n      revRewrite({\n        manifest,\n      })\n    )\n    .pipe(dest(\"public/css\"));\n  return src(\"public/**/*.html\")\n    .pipe(\n      revRewrite({\n        manifest,\n      })\n    )\n    .pipe(dest(\"public\"));\n};\n\nconst resources = () => {\n  return src(\"./resources/**\").pipe(dest(\"./public\"));\n};\n\nconst images = () => {\n  return src([\n    \"./img/**/*\"\n  ])\n    .pipe(gulpif(isProd, imagemin()))\n    .pipe(dest(\"./public/img\"));\n};\n\n").concat(html(options), "\n").concat(styles(options), "\n").concat(scripts(options), "\n\nconst watchFiles = () => {\n  browserSync.init({\n    server: {\n      baseDir: \"./public\",\n    },\n  });\n  ").concat(watchCSS(options), "\n  ").concat(watchHTML(options), "\n  ").concat(watchJS(options), "\n  watch(\"./resources/**\", resources);\n  watch(\"./img/**/*.{jpg,jpeg,png,svg}\", images);\n};\n\nexport default series(\n  clean,\n  parallel(html, scripts, styles, resources, images),\n  watchFiles\n);\n\nexport const build = series(\n  parallel(toProd, clean),\n  parallel(html, scripts, styles, resources, images),\n);\n\nexport const cache = series(cachePublic, rewrite);\n  ");
        fs.writeFileSync("".concat(process.cwd(), "/gulpfile.js"), gulpfileTemplate, 'utf8');
        return [2 /*return*/];
    });
}); };

var createProject = function (options) { return __awaiter(void 0, void 0, void 0, function () {
    var tasks;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                options = __assign({}, options);
                tasks = new Listr([
                    {
                        title: 'Create folders',
                        task: function () { return createFolders(options); },
                    },
                    {
                        title: 'Create project files',
                        task: function () { return __awaiter(void 0, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, createPackage(options)];
                                    case 1:
                                        _a.sent();
                                        return [4 /*yield*/, createFiles(options)];
                                    case 2:
                                        _a.sent();
                                        return [4 /*yield*/, createLicense(options)];
                                    case 3:
                                        _a.sent();
                                        return [4 /*yield*/, createHTML(options)];
                                    case 4:
                                        _a.sent();
                                        return [4 /*yield*/, createJS(options)];
                                    case 5:
                                        _a.sent();
                                        return [4 /*yield*/, createCSS(options)];
                                    case 6:
                                        _a.sent();
                                        return [4 /*yield*/, createGulpFile(options)];
                                    case 7:
                                        _a.sent();
                                        return [4 /*yield*/, createSnippets()];
                                    case 8:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); },
                    },
                    {
                        title: 'Initialize git',
                        task: function () { return gitInit(); },
                        enabled: function () { return options.git; },
                    },
                ], {
                    exitOnError: false,
                });
                return [4 /*yield*/, tasks.run()];
            case 1:
                _a.sent();
                console.log(chalk.green.bold('DONE'));
                return [2 /*return*/, true];
        }
    });
}); };

var parseArgumentsIntoOptions = function (args) {
    return {
        skipPrompts: args.includes('--yes') || args.includes('--y') || false,
        git: args.includes('--git') || false,
        packageManagerOptions: args.includes('--package-options') || false,
        nameProject: args[2],
    };
};
var promptForMissingOptions = function (options) { return __awaiter(void 0, void 0, void 0, function () {
    var html, css, resetCss, js, framework, lib, packageManager, packageManagerOptions, git;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (options.skipPrompts) {
                    return [2 /*return*/, __assign(__assign({}, options), { html: 'HTML5', css: 'CSS', resetCss: 'modern-normalize.css', js: 'JavaScript', framework: 'Without a framework', lib: [], git: false, packageManager: 'npm', packageManagerOptions: '' })];
                }
                return [4 /*yield*/, select({
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
                    })];
            case 1:
                html = _a.sent();
                return [4 /*yield*/, select({
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
                    })];
            case 2:
                css = _a.sent();
                return [4 /*yield*/, select({
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
                    })];
            case 3:
                resetCss = _a.sent();
                return [4 /*yield*/, select({
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
                    })];
            case 4:
                js = _a.sent();
                return [4 /*yield*/, select({
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
                    })];
            case 5:
                framework = _a.sent();
                return [4 /*yield*/, checkbox({
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
                    })];
            case 6:
                lib = _a.sent();
                return [4 /*yield*/, select({
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
                    })];
            case 7:
                packageManager = _a.sent();
                packageManagerOptions = '';
                if (!options.packageManagerOptions) return [3 /*break*/, 9];
                return [4 /*yield*/, input({ message: 'Enter the package manager options' })];
            case 8:
                packageManagerOptions = _a.sent();
                _a.label = 9;
            case 9: return [4 /*yield*/, confirm({ message: 'Initilization git?', default: false })];
            case 10:
                git = _a.sent();
                return [2 /*return*/, __assign(__assign({}, options), { html: html, css: css, resetCss: resetCss, js: js, framework: framework, lib: lib, git: git, packageManager: packageManager, packageManagerOptions: packageManagerOptions })];
        }
    });
}); };
var cli = function (args) { return __awaiter(void 0, void 0, void 0, function () {
    var argsOptions, options, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                clear();
                console.log(chalk.red(figlet.textSync('Create-Gulp-Template', { horizontalLayout: 'default' })));
                argsOptions = parseArgumentsIntoOptions(args);
                return [4 /*yield*/, promptForMissingOptions(argsOptions)];
            case 1:
                options = _a.sent();
                return [4 /*yield*/, createProject(options)];
            case 2:
                _a.sent();
                return [3 /*break*/, 4];
            case 3:
                err_1 = _a.sent();
                console.log(chalk.red.bold('ERROR'));
                console.log(chalk.red(err_1));
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };

export { cli as default };

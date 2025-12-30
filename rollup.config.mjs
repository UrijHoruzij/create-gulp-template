import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import copy from 'rollup-plugin-copy';
import cleaner from 'rollup-plugin-cleaner';
import externals from 'rollup-plugin-node-externals';
import { readFileSync } from 'fs';

const packageJson = JSON.parse(readFileSync('./package.json', 'utf8'));
export default [
	{
		input: 'src/cli.ts',
		output: [
			{
				file: packageJson.module,
				format: 'es',
			},
		],
		plugins: [
			cleaner({
				targets: ['./dist/'],
			}),
			externals({
				deps: true, // Внешние зависимости
				devDeps: false, // Включаем devDependencies
				peerDeps: true, // peerDependencies как внешние
				optDeps: true, // optionalDependencies как внешние
			}),
			resolve(),
			commonjs(),
			typescript({
				tsconfig: './tsconfig.json',
				useTsconfigDeclarationDir: true,
				clean: true,
			}),
			copy({
				targets: [{ src: ['src/template', 'src/snippets'], dest: 'dist' }],
			}),
		],
	},
];

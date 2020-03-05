import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import sucrase from '@rollup/plugin-sucrase';
import globFiles from 'rollup-plugin-glob-files';
import command from 'rollup-plugin-command';

import pkg from './package.json';
import { isAbsolute } from 'path';

const name = 'todo';
const sourcemap = false;
const prod = process.env.NODE_ENV === 'production';
const watching = process.env.ROLLUP_WATCH;

const sharedOutputOptions = {
	name,
	sourcemap,
};

const output = [{ file: pkg.main, format: 'cjs', ...sharedOutputOptions }];

if (prod) output.push({ file: pkg.module, format: 'es', ...sharedOutputOptions });

export default {
	input: prod ? 'src/index.ts' : '@tests',
	output,
	external: id => id[0] !== '.' && !isAbsolute(id),
	plugins: [
		globFiles({
			key: `@tests`,
			include: `./tests/**/*.ts`,
			justImport: true,
		}),
		resolve(),
		commonjs(),
		sucrase({
			transforms: ['typescript'],
		}),
		!prod && command(`zip-tap-reporter node ${pkg.main}`, { exitOnFail: !watching }),
	],
};

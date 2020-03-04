import { Plugin } from 'rollup';
import { compile } from 'reactive-assignments/compiler';
import { createFilter } from '@rollup/pluginutils';

export interface Options {
	/** @default '**\/*.r.(js|ts)' */
	include?: string | string[]; // Default is `**/*.r.(js|ts)`

	/** @default null */
	exclude?: string | string[];

	/** @default 'reactive-assignments' */
	runtime?: string;

	/** @default ['console'] */
	predefinedGlobals?: string[];

	/** @default true */
	sourcemaps?: boolean;
}

export default (options: Options): Plugin => {
	const filter = createFilter(options.include || '**/*.r.(js|ts)', options.exclude);

	const plugin: Plugin = {
		name: `reactive-assignments`,

		transform: (oldCode, id) => {
			if (!filter(id)) return;

			const { code, sourcemap } = compile(oldCode, {
				file: removeBaseFromPath(id),
				runtime: options.runtime,
				predefinedGlobals: options.predefinedGlobals,
				sourcemap: options.hasOwnProperty(`sourcemaps`) ? options.sourcemaps : true,
			});

			return { code, sourcemap };
		},
	};

	return plugin;
};

function removeBaseFromPath(path: string) {
	return path.replace(process.cwd(), ``);
}

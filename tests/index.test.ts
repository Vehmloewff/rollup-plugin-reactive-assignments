import plugin from '../src/index';
import { describe } from 'zip-tap';
import nodePath from 'path';

describe(`rollup-plugin-reactive-assignments`, it => {
	it(`it should filter files, compile code, and generate sourcemaps`, expect => {
		const code = `let a = b`;

		const instance = (plugin({
			include: '**/data/*.js',
			exclude: 'src/data/thing.js',
		}) as any) as { transform: (code: string, id: string) => { code: string; sourcemap: any } | null };

		// These should be ignored
		expect(instance.transform(code, nodePath.resolve(`src/data/thing.js`))).toBe(undefined);
		expect(instance.transform(code, nodePath.resolve(`src/test.js`))).toBe(undefined);

		// This should be included
		const transformed = instance.transform(code, nodePath.resolve(`src/data/test.js`));
		expect(transformed.code).toMatch(/=/);
		expect(transformed.sourcemap.version).toBe(3);
	});
});

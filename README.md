# rollup-plugin-reactive-assignments

Use the reactive-assignments compiler with Rollup

## Installation

```sh
npm i rollup-plugin-reactive-assignments -D
```

## Usage

```js
// rollup.config.js
import reactiveAssignments from 'rollup-plugin-reactive-assignments';

export default {
	// ...
	plugins: [
		// ...
		reactiveAssignments({
			// You can specify which files are compiled using 'include' and 'exclude'
			include: 'src/**/*.r.js', // Default is `**/*.r.(js|ts)`
			exclude: 'src/reactive/lib/**', // Default is null

			// Where the reactive-assignments runtime is located
			runtime: 'reactive-assignments', // This is default

			// What variables are never goinig to be reactive, and
			// that the compiler should not mess with?
			predefinedGlobals: ['console'], // This is default

			// You can disallow the generating of sourcemaps if you need to
			sourcemaps: false,
		}),
	],
};
```

## Typescript support?

Sure thing! Just be sure to put your typescript plugin _before_ this plugin in the `plugins` array.

```js
export default {
	// ...
	plugins: [typescript(), reactiveAssignments()],
};
```

## Contributing?

**Sure!**

```sh
# fork repo
git clone https://github.com/[your_username]/todo
cd todo
npm i
npm test -- -w
```

Pull Requests are always welcome!

_PS: Don't forget to `npm run lint`!_ :wink:

## License

[MIT](/LICENSE)

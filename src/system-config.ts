"use strict";

// SystemJS configuration file, see links for more information
// https://github.com/systemjs/systemjs
// https://github.com/systemjs/systemjs/blob/master/docs/config-api.md

/***********************************************************************************************
 * User Configuration.
 **********************************************************************************************/
/** Map relative paths to URLs. */
const map: any = {
	'crypto-js': 'vendor/crypto-js',
	'@ngrx': 'vendor/@ngrx',
	'lodash': 'vendor/lodash'
};

/** User packages configuration. */
const packages: any = {
	'crypto-js': {
		main: 'index.js',
	},
	'@ngrx/store': {
		format: 'cjs',
		main: 'index.js',
	},
	'@ngrx/core': {
		main: 'index.js',
		format: 'cjs'
	},
	'@ngrx/store-devtools': {
		main: 'index.js',
		format: 'cjs'
	},
	'@ngrx/store-log-monitor': {
		main: 'index.js',
		format: 'cjs'
	},
	'lodash': {
		main: 'index.js',
		format: 'cjs'
	},
};

////////////////////////////////////////////////////////////////////////////////////////////////
/***********************************************************************************************
 * Everything underneath this line is managed by the CLI.
 **********************************************************************************************/
const barrels: string[] = [
	// Angular specific barrels.
	'@angular/core',
	'@angular/common',
	'@angular/compiler',
	'@angular/forms',
	'@angular/http',
	'@angular/router',
	'@angular/platform-browser',
	'@angular/platform-browser-dynamic',

	// Thirdparty barrels.
	'rxjs',
	'crypto-js',
	'@ngrx/store',

	// App specific barrels.
	'app',
	'app/shared',
	/** @cli-barrel */
];

const cliSystemConfigPackages: any = {};
barrels.forEach((barrelName: string) => {
	cliSystemConfigPackages[barrelName] = { main: 'index' };
});

/** Type declaration for ambient System. */
declare var System: any;

// Apply the CLI SystemJS configuration.
System.config({
	map: {
		'@angular': 'vendor/@angular',
		'rxjs': 'vendor/rxjs',
		'crypto-js': 'vendor/crypto-js',
		'main': 'main.js',
		'@ngrx/store': 'vendor/@ngrx/store'
	},
	packages: cliSystemConfigPackages
});

// Apply the user's configuration.
System.config({ map, packages });

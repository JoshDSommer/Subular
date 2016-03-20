const gulp = require('gulp');
const del = require('del');
const typescript = require('gulp-typescript');
const tscConfig = require('./tsconfig.json');
const sourcemaps = require('gulp-sourcemaps');
// const tslint = require('gulp-tslint');
const browserSync = require('browser-sync');
const reload = browserSync.reload;
// const tsconfig = require('tsconfig-glob');

// clean the contents of the distribution directory
gulp.task('clean', function () {
	return del('dist/**/*');
});

// copy static assets - i.e. non TypeScript compiled source
gulp.task('copy:assets', ['clean'], function () {
	return gulp.src(['favicon.ico','app/**/*','app/**/**/*', 'index.html', 'styles.css', '!app/**/*.ts','font/**','css/styles.css','node_modules/bootstrap/dist/css/bootstrap.min.css'], { base: './' })
		.pipe(gulp.dest('dist'))
});

// copy dependencies
gulp.task('copy:libs', ['clean'], function () {
	return gulp.src([
		'node_modules/es6-shim/es6-shim.min.js',
		'node_modules/systemjs/dist/system-polyfills.js',
		'node_modules/angular2/bundles/angular2-polyfills.js',
		'node_modules/systemjs/dist/system.src.js',
		'node_modules/rxjs/bundles/Rx.js',
		'node_modules/angular2/bundles/angular2.dev.js',
		'node_modules/angular2/bundles/http.js',
		'node_modules/node-vibrant/dist/vibrant.js',
		'node_modules/lodash/lodash.js',
		'js/color-thief.min.js',
		'node_modules/angular2/bundles/router.dev.js',
		'node_modules/crypto-js/crypto-js.js',
		'node_modules/bootstrap/dist/js/bootstrap.min.js',
		'node_modules/jquery/dist/jquery.min.js',
		'node_modules/jquery-contextmenu/dist/jquery.contextMenu.min.js'
	], { base: './' })
		.pipe(gulp.dest('dist'))
});

// // linting
// gulp.task('tslint', function() {
//   return gulp.src('app/**/*.ts')
//     .pipe(tslint())
//     .pipe(tslint.report('verbose'));
// });


// TypeScript compile
gulp.task('compile', ['clean'], function () {
	return gulp
		.src("*.ts")
		.pipe(sourcemaps.init())
		.pipe(typescript(tscConfig.compilerOptions))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('dist/app'));
});

// update the tsconfig files based on the glob pattern
// gulp.task('tsconfig-glob', function () {
//   return tsconfig({
//     configPath: '.',
//     indent: 2
//   });
// });

// Run browsersync for development
gulp.task('serve', ['build'], function () {
	browserSync({
		server: {
			baseDir: 'dist'
		}
	});

	gulp.watch(['app/**/*', 'index.html', 'styles.css'], ['buildAndReload']);
});

// gulp.task('build', ['tslint', 'compile', 'copy:libs', 'copy:assets']);
gulp.task('build', ['compile', 'copy:libs', 'copy:assets']);
gulp.task('buildAndReload', ['build'], reload);
gulp.task('default', ['build']);
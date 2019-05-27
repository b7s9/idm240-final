const gulp = require('gulp');
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');
const eslint = require('gulp-eslint');
const uglify = require('gulp-uglify');

const sass = require('gulp-sass');

// --------------------------------------------------------
// HTML
// --------------------------------------------------------

gulp.task('rootHtml', () => {
	return gulp.src('./src/*.+(html|php)')
		.pipe(gulp.dest('./build/'));
});

gulp.task('includes', () => {
	return gulp.src('./src/includes/*.+(html|php)')
		.pipe(gulp.dest('./build/includes/'));
});

gulp.task('html', ['rootHtml', 'includes']);

// --------------------------------------------------------
// JS
// --------------------------------------------------------

gulp.task('js', () => {
	return gulp.src('./src/js/*.js') // or 'src/**/*.js'

		// lint
		.pipe(eslint({
			fix: true
		}))
		.pipe(eslint.format())
		.pipe(eslint.failAfterError())

		// compile
		.pipe(sourcemaps.init())
		.pipe(concat('main.min.js'))
		.pipe(babel({
			presets: ['env']
		}))
		.pipe(uglify())
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('./build/js'));
});

// --------------------------------------------------------
// Util
// --------------------------------------------------------

gulp.task('watch', () => {
	gulp.watch('./src/js/**/*.js', ['js']);
	gulp.watch('./src/**/*.+(html|php)', ['html']);
	gulp.watch('./src/style/*.+(scss|sass)', ['css']);
});

gulp.task('default', ['watch']);

gulp.task('prod', ()=> {
	return gulp.src('./build/**/*')
		.pipe(gulp.dest('/Users/finch/.bitnami/stackman/machines/xampp/volumes/root/htdocs/dir/idm240-final-build'));
});

// --------------------------------------------------------
// STYLE
// --------------------------------------------------------

gulp.task('css', () => {
	return gulp.src('./src/style/*.+(scss|sass|css)')
		.pipe(sourcemaps.init())
		.pipe(concat('main.min.css'))
		.pipe(sass({
			outputStyle: 'compressed'
		}).on('error', sass.logError))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('./build/css'));
});
var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var uglify = require('gulp-uglify');
var buffer = require('vinyl-buffer');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var minify = require('gulp-cssmin');
var connect = require('gulp-connect');
var autoprefixer = require('gulp-autoprefixer');
var changed = require('gulp-changed');
var babelify = require('babelify');
var stringify = require('stringify');

/**
 * Path to the scripts to be used in the application,
 * include each one in the order to be imported to
 * satisfy dependancies.
 */
var scripts = [
    './lib/js/app.js'
];

/**
 * Build the Javascript files including assets into a single
 * minified JS file.
 */
gulp.task('build', function() {
    return browserify({
        entries: scripts,
        debug: true
    }).transform(babelify)
        .transform(stringify({
            minify: true,
            appliesTo: { includeExtensions: ['.html', '.tmpl', '.tpl'] }
        }))
        .bundle()
        .pipe(source('app.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({
            loadMaps: true
        }))
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./public/dist/js/'));
});

/**
 * Compile SASS and concatenate into a single CSS file.
 */
gulp.task('styles', function() {
    return gulp.src('./lib/sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('app.css'))
        .pipe(minify())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('./public/dist/css/'));
});


/**
 * Watch and automatically re-run these tasks when the files
 * change in the directories.
 */
gulp.task('watch', [], function() {
    gulp.watch('./lib/js/**/*.*', ['build']);
    gulp.watch('./lib/sass/**/*.scss', ['styles']);
});

/**
 * Default gulp task, run them all.
 */
gulp.task('default', ['build', 'watch']);

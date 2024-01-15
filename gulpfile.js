var concat = require('gulp-concat');
var gulp = require('gulp');
var del = require('del');
var template = require('gulp-template');
var iconfont = require('gulp-iconfont');
var insert = require('gulp-insert');
var rename = require('gulp-rename');

var sass = require('gulp-sass')(require('sass'));
const async = require("async");
const {series, parallel} = require('gulp');

sass.compiler = require('node-sass');

var paths = {};

paths.build = {};
paths.build.root = process.env.BUILD_PATH || 'dist';
paths.build.sass = paths.build.root + '/sass';
paths.build.fonts = paths.build.root + '/fonts';

paths.source = {};
paths.source.root = 'src';
paths.source.iconfontTemplate = paths.source.root + '/fonts/iconfontTemplate.scss.tpl';
paths.source.stylesheet = paths.source.root + '/sass/';
paths.source.stylesheets = paths.source.root + '/sass/**/*';
paths.source.fontsMain = paths.source.root + '/fonts/fonts/**/*';
paths.source.svgFonts = paths.source.root + '/fonts/svg/**/*';


paths.nodeModules = {};
paths.nodeModules.root = 'node_modules';
paths.nodeModules.normalize = paths.nodeModules.root + '/normalize.css/normalize.css';

var fontName = "fc-icons";

gulp.task('clean', function (callback) {
    del(paths.build.root, {force: true}, callback);
});

gulp.task('build:icon-font', function (done) {
    var iconStream = gulp.src(paths.source.svgFonts)
        .pipe(iconfont({fontName: fontName, prependUnicode: true, fontHeight: 1001,normalize: true, formats: ['ttf', 'eot', 'woff', 'woff2', 'svg']}))

    async.parallel([
        function handleGlyphs(cb) {
            iconStream.on('glyphs', function (glyphs, options) {
                gulp.src(paths.source.iconfontTemplate)
                    .pipe(template({
                        glyphs: glyphs,
                        fontName: fontName,
                        className: 'fci',

                    }))
                    .pipe(rename(fontName + '.scss'))
                    .pipe(gulp.dest(paths.build.fonts))
                    .on('finish', cb);
            });
        },
        function handleFonts(cb) {
            iconStream
                .pipe(gulp.dest(paths.build.fonts))
                .on('finish', cb);
        }
    ], done);
});

gulp.task('build:mixins', function () {
    return gulp.src(paths.source.stylesheets)
        .pipe(gulp.dest(paths.build.sass));
});

gulp.task('build:fonts', function () {
    return gulp.src(paths.source.fontsMain)
        .pipe(gulp.dest(paths.build.fonts + '/fonts/'));
});

gulp.task('libraries', function () {
    return gulp.src([paths.nodeModules.normalize, paths.build.sass + '/style.scss'])
        .pipe(concat('style.scss'))
        .pipe(gulp.dest(paths.build.sass));
})

gulp.task('sass', function (done) {
    gulp.src(paths.build.sass + '/style.scss')
        .pipe(insert.prepend('$ie: false;\n'))
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(paths.build.root))
        .on('finish', done);
});

gulp.task('build', function (callback) {
    series(parallel('build:mixins', 'build:icon-font', 'build:fonts'), 'libraries', 'sass')(callback);
});

gulp.task('default', gulp.series(['build']));

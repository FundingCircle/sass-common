var gulp = require('gulp');
var del = require('del');
var template = require('gulp-template');
var iconfont = require('gulp-iconfont');
var insert = require('gulp-insert');
var rename = require('gulp-rename');
var sequence = require('run-sequence');

var styleguide = require('sc5-styleguide');
var sass = require('gulp-sass');

var paths = {};

paths.build = {};
paths.build.root = 'dist';
paths.build.sass = paths.build.root + '/sass';
paths.build.fonts = paths.build.root + '/fonts';
paths.build.styleguide = paths.build.root + '/styleguide';


paths.source = {};
paths.source.root = 'src';
paths.source.iconfontTemplate = paths.source.root + '/fonts/iconfontTemplate.css.tpl';
paths.source.stylesheets = paths.source.root + '/sass/**/*';
paths.source.svgFonts = paths.source.root + '/fonts/svg/**/*';

var fontName = "fc-icons";

gulp.task('clean', function(callback) {
  del(paths.build.root, callback);
});

gulp.task('build:icon-font', function() {
  return gulp.src(paths.source.svgFonts)
      .pipe(iconfont({
        fontName: fontName, // required
        appendCodepoints: true // recommended option
      }))
      .on('codepoints', buildIconFontCss)
      .pipe(gulp.dest(paths.build.fonts));

  function buildIconFontCss(codepoints) {
    gulp.src(paths.source.iconfontTemplate)
        .pipe(template({
          glyphs: codepoints,
          fontName: fontName,
          fontPath: '../fonts/',
          className: 'fci'
        }))
        .pipe(rename(fontName + '.css'))
        .pipe(gulp.dest(paths.build.fonts));
  }
});

gulp.task('build:mixins', function() {
  return gulp.src(paths.source.stylesheets)
          .pipe(insert.prepend('$ie: true;\n'))
          .pipe(gulp.dest(paths.build.sass));
});


// Living styleguide
paths.source.sassTemp = paths.source.root + '/sass/style.scss';

gulp.task('styleguide:generate', function() {
  return gulp.src(paths.source.root + '/sass/**/*.scss')
    .pipe(styleguide.generate({
        title: 'Funding Circle Styleguide',
        server: true,
        port: 8081,
        rootPath: paths.build.styleguide,
        overviewPath: 'README.md'
      }))
    .pipe(gulp.dest(paths.build.styleguide));
});


gulp.task('styleguide:applystyles', function() {
  return gulp.src(paths.source.root + '/sass/style.scss')
    .pipe(sass({
      errLogToConsole: true
    }))
    .pipe(styleguide.applyStyles())
    .pipe(gulp.dest(paths.build.styleguide));
});

gulp.task('sass', function () {
    gulp.src(paths.source.root + '/sass/style.scss')
        .pipe(sass())
        .pipe(gulp.dest(paths.build.sass));
});

gulp.task('build', function (callback) {
  sequence('clean', ['build:mixins', 'build:icon-font'], callback);
});

gulp.task('default', ['build']);

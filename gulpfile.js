var gulp = require('gulp');
var del = require('del');
var template = require('gulp-template');
var iconfont = require('gulp-iconfont');
var sequence = require('run-sequence');
var insert = require('gulp-insert');

var paths = {};

paths.build = {};
paths.build.root = 'dist';
paths.build.sass = paths.build.root + '/sass';
paths.build.fonts = paths.build.root + '/fonts';

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
      .on('codepoints', function(codepoints) {
        gulp.src(paths.source.iconfontTemplate)
            .pipe(template({
              glyphs: codepoints,
              fontName: fontName,
              fontPath: '../fonts/',
              className: 'fci'
            }))
            .pipe(gulp.dest(paths.build.fonts + '/' + fontName + '.css'));
      })
      .pipe(gulp.dest(paths.build.fonts));
});

gulp.task('build:mixins', function() {
  return gulp.src(paths.source.stylesheets)
          .pipe(insert.prepend('$ie: true;\n\n'))
          .pipe(gulp.dest(paths.build.sass));
});

gulp.task('build', function (callback) {
  sequence('clean', ['build:mixins', 'build:icon-font'], callback);
});

gulp.task('default', ['build']);

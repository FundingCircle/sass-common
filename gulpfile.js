var concat = require('gulp-concat');
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
paths.build.root = process.env.BUILD_PATH || 'dist';
paths.build.sass = paths.build.root + '/sass';
paths.build.fonts = paths.build.root + '/fonts';
paths.build.styleguide = paths.build.root + '/styleguide';


paths.source = {};
paths.source.root = 'src';
paths.source.iconfontTemplate = paths.source.root + '/fonts/iconfontTemplate.scss.tpl';
paths.source.stylesheets = paths.source.root + '/sass/**/*';
paths.source.svgFonts = paths.source.root + '/fonts/svg/**/*';


paths.bower = {};
paths.bower.root = 'bower_components';
paths.bower.normalize = paths.bower.root + '/normalize-css/normalize.css';


var fontName = "fc-icons";

gulp.task('clean', function(callback) {
  del(paths.build.root, {force:true}, callback);
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
          className: 'fci'
        }))
        .pipe(rename(fontName + '.scss'))
        .pipe(gulp.dest(paths.build.fonts));
  }
});

gulp.task('build:mixins', function() {
  return gulp.src(paths.source.stylesheets)
          .pipe(gulp.dest(paths.build.sass));
});

gulp.task('build:libraries', function() {
  return gulp.src([paths.bower.normalize, paths.build.sass + '/style.scss'])
             .pipe(concat('style.scss'))
             .pipe(gulp.dest(paths.build.sass));
})

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
    gulp.src(paths.build.sass + '/style.scss')
        .pipe(insert.prepend('$ie: false;\n'))
        .pipe(sass())
        .pipe(gulp.dest(paths.build.root));
});

gulp.task('build', function (callback) {
  sequence('clean', ['build:mixins', 'build:icon-font'], 'build:libraries', 'sass', callback);
});

gulp.task('default', ['build']);

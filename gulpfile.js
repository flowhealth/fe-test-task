const gulp = require('gulp');
const babel = require('gulp-babel');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var connect = require('gulp-connect');
var sass = require('gulp-sass');
var buffer = require('gulp-buffer');
var rev = require('gulp-rev');
var revReplace = require('gulp-rev-replace');
var rimraf = require('rimraf');
require('shelljs/global');
const psTree = require('ps-tree');

const config = require('./src/config.js');
const logger = require('./src/logger.js');

const kill = (pid, signal, callback) => {
    signal   = signal || 'SIGKILL';
    callback = callback || function () {};
    var killTree = true;
    if(killTree) {
        psTree(pid, function (err, children) {
            [pid].concat(
                children.map(function (p) {
                    return p.PID;
                })
            ).forEach(function (tpid) {
                try { process.kill(tpid, signal) }
                catch (ex) { }
            });
            callback();
        });
    } else {
        try { process.kill(pid, signal) }
        catch (ex) { }
        callback();
    }
};
  

let appPID;

gulp.task('jsx', function () {
  return browserify({entries: ['./front/src/index.jsx'], extensions: ['.js', '.jsx'], debug: true})
    .transform('babelify', {presets: ['es2015', 'stage-0', 'react']})
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(gulp.dest('front/build'))
});

gulp.task('styles', function() {
  return gulp.src('./front/src/App.scss')
    .pipe(sass({
      includePaths: ['node_modules']
    }).on('error', sass.logError))
    .pipe(gulp.dest('./front/build/assets/'))
});

gulp.task('build_front_w', function(){
  gulp.watch('front/**/*.jsx', ['jsx']);
  gulp.watch('./front/src/**/*.scss', ['styles']);
});

gulp.task('app', () => {
  logger.info('Gulp: starting app');
  appPID = exec('node .', {async: true});

  gulp.watch([
    './index.js',
    './package.json',
    './src/**/*.js',
    './api/**/*.js',
    './front/build/*.js',
  ], [
    'app:restart',
  ])
    .on('change', (event) => {
      logger.info('Gulp: File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
  gulp.watch(['./front/**/*.scss'], ['styles']);
});

gulp.task('app:restart', () => {
  return new Promise(run => {
    logger.info('Gulp: killing app');
    kill(appPID.pid, null, run);
  })
    .then(() => {
      logger.info('Gulp: starting app');
      appPID = exec('node .', {async: true});
    })
});

process.on('SIGTERM', () => {
  kill(appPID.pid, null, () => process.exit(0));
  logger.info('App', 'stop');
});


gulp.task('default', ['app']);

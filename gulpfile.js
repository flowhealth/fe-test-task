const gulp = require('gulp');

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
gulp.task('app', () => {
  logger.info('Gulp: starting app');
  appPID = exec('node .', {async: true});

  gulp.watch([
    './index.js',
    './package.json',
    './src/**/*.js',
    './api/**/*.js',
  ], [
    'app:restart',
  ])
    .on('change', (event) => {
      logger.info('Gulp: File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
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

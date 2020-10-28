const log4js = require('log4js');

const config = require('../src/config.js');
if (process.env.LOGLEVEL)
  config.app.loglevel = process.env.LOGLEVEL;

const logger = log4js.getLogger("app");
logger.level = config.app.loglevel;

module.exports = Object.assign(logger, {
  log4js,
  getLogger: function(scope) {
    const _logger = log4js.getLogger(scope);
    _logger.level = this.level;
    return _logger;
  },
});

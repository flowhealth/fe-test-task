const errToJSON = require('error-to-json');

const logger = require('../src/logger.js');

module.exports = (req, res) => error => {
  logger.error(error);
  if (!res)
    return logger.warn('handleError called without (req, res)');

  try {
    const status = error instanceof Error ? 500 : error.status || 400;
    const data = Object.assign(
      {},
      {error: error instanceof Error ? errToJSON(error) : error},
      {
        ok: false,
      }
    );
    
    return res
      .status(status)
      .send(data)
      .end();
  } catch(e) {
    logger.warn('Error handled, after response sended');
  }
};

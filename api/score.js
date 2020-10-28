const express = require('express');

const config = require('../src/config.js');
const logger = require('../src/logger.js').getLogger('/score');
const score = require('../src/score.js');

const handleError = require('./handle-error.js');

const router = express.Router();

router.get('/', (req, res) => {
  res.send({
    ok: true,
    result: score.get(),
  });
});

router.post('/reset', (req, res) => {
  logger.info('reset');
  score.reset();
  res.send({
    ok: true,
    result: score.get(),
  });
});

router.all('*', function(req, res) {
  res.status(404).send({ ok: false, message: 'not found'});
});

module.exports = router;

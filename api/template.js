const express = require('express');

const config = require('../src/config.js');
const logger = require('../src/logger.js').getLogger('/template');

const handleError = require('./handle-error.js');

const router = express.Router();

router.get('/', function(req, res) {
  res.send({ ok: true });
});

router.get('/:templateID', (req, res) => Promise.resolve()
  .then(() => res.send({
    ok: true,
    result: {
      id: req.params.templateID
    },
  }))
  .catch(handleError(req, res))
);

router.all('*', function(req, res) {
  res.status(404).send({ ok: false, message: 'not found'});
});

module.exports = router;

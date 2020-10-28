const express = require('express');

const config = require('../src/config.js');
const logger = require('../src/logger.js').getLogger('/game');
const game = require('../src/game.js');
const score = require('../src/score.js');
const ai = require('../src/ai.js');

const handleError = require('./handle-error.js');

const router = express.Router();

router.get('/', (req, res) => {
  res.send({
    ok: true,
    result: game.get(),
  });
});

router.get('/next', (req, res) => {
  game.nextGame();

  res.send({
    ok: true,
    result: game.get(),
  });
});

router.post('/reset', (req, res) => {
  game.reset();

  res.send({
    ok: true,
    result: game.get(),
  });
});

const saveScore = () => {
  const {
    winner,
    team,
  } = game.get();
  score.add({winner, team});
}

router.post('/move', (req, res) => Promise.resolve()
  .then(() => game.move(req.body.index))
  .then(win => {
    logger.debug({win})
    if (win)
      saveScore();
    else {
      const { board, nextMove } = game.get();
      const aiMove = ai.getMove(board, nextMove);
      win = game.move(aiMove);
      if (win)
        saveScore();
    }

    res.send({
      ok: true,
      result: game.get(),
    });
  })
  .catch(handleError(req, res))
);

router.all('*', function(req, res) {
  res.status(404).send({ ok: false, message: 'not found'});
});

module.exports = router;

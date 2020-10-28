const config = require('../src/config.js');
const logger = require('../src/logger.js').getLogger('score');

const Score = {
  ai: 0,
  player: 0,
  X: 0,
  O: 0,
  list: [],
};

const add = ({winner, team}) => {
  const score = {
    winner,
    team,
    ts: +new Date(),
  };
  Score.list.push(score);
  if (winner)
    Score[winner]++;
  if (team)
    Score[team]++;
};
const get = () => JSON.parse(JSON.stringify(Score));
const reset = () => {
  logger.info('reset');
  Object.assign(Score, {
    ai: 0,
    player: 0,
    list: [],
  });
}

module.exports = {
  add,
  get,
  reset,
};

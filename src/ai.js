const tictactoeAgent = require('tictactoe-agent');

const config = require('../src/config.js');
const logger = require('../src/logger.js').getLogger('ai');

const getMove = (board, team) => {

  const _board = board.join().replace(/,/g,'').replace(/\d/g,'-');
  const model = new tictactoeAgent.Model(_board, team);
  const recommendation = model.getRecommendation();
  logger.debug(recommendation);
  let { index } = recommendation;
  return ++index;
}

module.exports = {
  getMove,
};

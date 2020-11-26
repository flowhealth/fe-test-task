const BASE_API_URL = '/api';

const apiConfig = {
  getGameStatus: {
    url: `${BASE_API_URL}/game`,
    mapData: (data) => {
      if (!data || !data.result) return null;

      const {
        winner,
        player,
        board,
        end,
      } = data.result;

      return {
        winner,
        board,
        playerMarkType: player,
        isFinished: end,
      };
    }
  },
  makeMove: {
    url: `${BASE_API_URL}/game/move`,
    mapData: (data) => {
      if (!data || !data.result) return null;

      const {
        board,
        end,
      } = data.result;

      return {
        board,
        isFinished: end,
      };
    }
  },
  startNewGame: {
    url: `${BASE_API_URL}/game/next`,
    mapData: (data) => {
      if (!data || !data.result) return null;

      const {
        winner,
        player,
        board,
        end,
      } = data.result;

      return {
        winner,
        board,
        playerMarkType: player,
        isFinished: end,
      };
    },
  },
  getScoreStats: {
    url: `${BASE_API_URL}/score`,
    mapData: (data) => {
      if (!data || !data.result) return null;

      const {
        ai,
        player,
        X,
        O,
        list,
      } = data.result;

      return {
        aiWinsCount: ai,
        playerWinsCount: player,
        crossWinsCount: X,
        circleWinsCount: O,
        gameHistory: list.map((game) =>{
          return {
            ts: game.ts,
            winner: game.winner,
            winnerMark: game.team,
          };
        }),
      };
    }
  }
}

export default apiConfig;
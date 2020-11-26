import React from "react";
import { MARK_TYPES } from "../common/constants";
import Mark from "../common/mark/Mark";

class Board extends React.PureComponent {
  render() {
    const { board,
            playerMarkType,
            isFinished,
            winner,
            retryClickHandler,
            cellClickHandler } = this.props;
    const hasPlayerWon = winner === 'player';

    return (
      <div className="board">
        {
          isFinished
          &&
          <div className="game-retry">
            <p className="winner">
             Winner :
              {
                winner ?
                  <span className={!hasPlayerWon ? 'player' : ''}>
                    {!hasPlayerWon && ' definitely not'} you
                  </span>
                  :
                  ' it`s a draw'
              }
            </p>

            <a href="#" className="nav-button" role="button" onClick={retryClickHandler}>
              Retry
            </a>
          </div>
        }

        {
          board.map((row, index) => {
            return (
              <div className="board-row" key={index}>
                {
                  row.map((cell, index) => {
                    const isPlayedByPlayer = MARK_TYPES[cell] === MARK_TYPES[playerMarkType];
                    const isCellMarked = typeof cell !== 'number';

                    return (
                      <div className="board-cell"
                           key={index}
                           onClick={isCellMarked ?
                             null
                             :
                             () => cellClickHandler(cell)
                           }>
                        {
                          isCellMarked
                          &&
                          <Mark type={MARK_TYPES[cell]}
                                isAnimated={true}
                                isPlayedByPlayer={isPlayedByPlayer} />
                        }
                      </div>
                    );
                  })
                }
              </div>
            )
          })
        }
      </div>
    )
  }
}

export default Board;
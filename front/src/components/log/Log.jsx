import React, { memo } from 'react';
import GameLogger from "../../utils/gameLog/gameLogger";
import { PLAYER_TYPES } from "../common/constants";

const Log = (props) => {
  const { size } = props;

  if (!size) return null;
  const log = GameLogger.log;

  return (
    <ul className="log">
      {
        log.map((step) => {
          const isPlayerStep = step.player === PLAYER_TYPES.USER;

          return (
            <li key={step.moveTo} className={`log-item${isPlayerStep ? ' by-player' : ''}`}>
              {step.player} moved to {step.moveTo}
            </li>
          )
        })
      }
    </ul>
  )
};

export default memo(Log);
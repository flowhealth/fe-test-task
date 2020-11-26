import React from "react";
import ICONS from "./svg";

const Mark = (props) => {
  const { type, isAnimated, isPlayedByPlayer, className: classNameFromProps } = props;
  const animateClassName = isAnimated ? ' animated' : '';
  const playerClassname = isAnimated && isPlayedByPlayer ? ' by-player' : '';
  const className = `mark${animateClassName}${playerClassname}${classNameFromProps ? ` ${classNameFromProps}` : ''}`

  return (
    <span className={className}>
      { ICONS[type] }
    </span>
  )
};

export default Mark;
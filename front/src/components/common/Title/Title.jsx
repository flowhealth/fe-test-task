import React from "react";

export const TITLE_SIZES = {
  SM: 'sm',
  MD: 'md',
  LG: 'lg',
}

const Title = (props) => {
  const { tag= 'p', size = 'md', className: classNameFromProps, children } = props;
  const className = `${classNameFromProps ? `${classNameFromProps} `: ''}title title-${size}`;

  return React.createElement(tag, { className }, children);
}

export default Title;
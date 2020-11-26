import React, { memo } from "react";

const Header = (props) => {
  const { children } = props;

  return (
    <header className="header">
      { children }
    </header>
  )
};

export default memo(Header);
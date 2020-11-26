import React from 'react';
import { MARK_TYPES } from '../../constants';

const ICONS = {
  [MARK_TYPES.O]: <svg className="mark-icon" viewBox="0 0 200 200">
    <circle className="circle" cx="100" cy="100" r="90" stroke="#000" strokeWidth="15" fillOpacity="0"/>
  </svg>,
  [MARK_TYPES.X]: <svg className="mark-icon" viewBox="0 0 100 100">
    <line className="cross line" fill="none" stroke="#000" strokeWidth="8" strokeLinecap="round"
          strokeMiterlimit="10" x1="15" y1="15" x2="85" y2="85"/>
    <line className="cross line" fill="none" stroke="#000" strokeWidth="8" strokeLinecap="round"
          strokeMiterlimit="10" x1="85" y1="15" x2="15" y2="85"/>
  </svg>,
};

export default ICONS;
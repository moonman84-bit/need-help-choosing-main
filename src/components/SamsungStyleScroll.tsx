import React, { ReactNode } from 'react';
import { useScrollerStyles } from '../styles/scrollerstyling.ts';

interface Props {
  children: ReactNode;
  minHeight?: string;
  width?: string;
}

const SamsungTableWrapper: React.FC<Props> = ({ children, minHeight = '700px', width = '100%' }) => {
  const classes = useScrollerStyles();
  return (
    <div className={classes.samsungscrollcontainer} style={{ minHeight, width }}>
      {children}
    </div>
  );
};

export default SamsungTableWrapper;


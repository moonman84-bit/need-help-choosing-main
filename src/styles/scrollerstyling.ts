import { createUseStyles } from 'react-jss';
import '../css/fonts.css'

const scrollerStyles = {
 samsungscrollcontainer: {
  overflow: 'auto',
  overflowY: 'auto',
  // border: '1px solid #e0e0e0',
  borderRadius: '16px', /* Samsung uses softer, larger border-radii */
  backgroundColor: '#ffffff',
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  "&::-webkit-scrollbar":{
    width: '6px'
},
"&::-webkit-scrollbar-thumb":{
  background: 'rgba(0, 0, 0, 0.15)',
  borderRadius: '10px',
  /* Adds a little 'padding' around the thumb */
  border: '2px solid transparent',
  backgroundClip: 'padding-box',
  '&:hover': {
    background: 'rgba(0, 0, 0, 0.3)',
    backgroundClip: 'padding-box'
  }
}

},

};

export const useScrollerStyles = createUseStyles(scrollerStyles);
import style from './utils/style';
import compose from './utils/compose';

export const displayPrint = style({
  prop: 'displayPrint',
  cssProperty: false,
  transform: value => ({
    '@media print': {
      display: value
    }
  })
});

export const displayRaw = style({
  prop: 'display'
});

export const overflow = style({
  prop: 'overflow'
});

export const textOverflow = style({
  prop: 'textOverflow'
});

export const visibility = style({
  prop: 'visibility'
});

export const whiteSpace = style({
  prop: 'whiteSpace'
});

export const boxSizing = style({
  prop: 'boxSizing'
});

export default compose(
  displayPrint,
  displayRaw,
  overflow,
  textOverflow,
  visibility,
  whiteSpace,
  boxSizing
);

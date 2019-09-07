import React from 'react';
import PropTypes from 'prop-types';

import { cx } from 'emotion';
import { useClasses } from '../../styles';

import InputBase from '../InputBase';

export const styles = theme => {
  const light = theme.palette.type === 'light';
  const bottomLineColor = light
    ? 'rgba(0, 0, 0, 0.42)'
    : 'rgba(255, 255, 255, 0.7)';
  return {
    root: {
      position: 'relative',
    },
    formControl: {
      'label + &': {
        marginTop: 16,
      },
    },
    focused: {},
    disabled: {},
    underline: {
      '&:after': {
        borderBottom: `2px solid ${
          theme.palette.primary[light ? 'dark' : 'light']
        }`,
        left: 0,
        bottom: 0,
        content: '""',
        position: 'absolute',
        right: 0,
        transform: 'scaleX(0)',
        transition: theme.transitions.create('transform', {
          duration: theme.transitions.duration.shorter,
          easing: theme.transitions.easing.easeOut,
        }),
        pointerEvents: 'none',
      },
      '&$focused:after': {
        transform: 'scaleX(1)',
      },
      '&$error:after': {
        borderBottomColor: theme.palette.error.main,
        transform: 'scaleX(1)',
      },
      '&:before': {
        borderBottom: `1px solid ${bottomLineColor}`,
        left: 0,
        bottom: 0,
        content: '"\\00a0"',
        position: 'absolute',
        right: 0,
        transition: theme.transitions.create('border-bottom-color', {
          duration: theme.transitions.duration.shorter,
        }),
        pointerEvents: 'none',
      },
      '&:hover:not($disabled):before': {
        borderBottom: `2px solid ${theme.palette.text.primary}`,
        '@media (hover: none)': {
          borderBottom: `1px solid ${bottomLineColor}`,
        },
      },
      '&$disabled:before': {
        borderBottomStyle: 'dotted',
      },
    },
    error: {},
    multiline: {},
    fullWidth: {},
    input: {},
    inputMarginDense: {},
    inputMultiline: {},
    inputTypeSearch: {},
  };
};

const Input = props => {
  const {
    disableUnderline,
    fullWidth = false,
    inputComponent = 'input',
    multiline = false,
    type = 'text',
    ...other
  } = props;

  const classes = useClasses(styles);

  return (
    <InputBase
      classes={{
        ...classes,
        root: cx(classes.root, {
          [classes.underline]: !disableUnderline,
        }),
        underline: null,
      }}
      fullWidth={fullWidth}
      inputComponent={inputComponent}
      multiline={multiline}
      type={type}
      {...other}
    />
  );
};

Input.propTypes = {
  autoComplete: PropTypes.string,
  autoFocus: PropTypes.bool,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  defaultValue: PropTypes.any,
  disabled: PropTypes.bool,
  disableUnderline: PropTypes.bool,
  endAdornment: PropTypes.node,
  error: PropTypes.bool,
  fullWidth: PropTypes.bool,
  id: PropTypes.string,
  inputComponent: PropTypes.elementType,
  inputProps: PropTypes.object,
  margin: PropTypes.oneOf(['dense', 'none']),
  multiline: PropTypes.bool,
  name: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
  rows: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  rowsMax: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  startAdornment: PropTypes.node,
  type: PropTypes.string,
  value: PropTypes.any,
};

export default Input;

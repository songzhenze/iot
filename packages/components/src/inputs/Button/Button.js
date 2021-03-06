import React from 'react';
import PropTypes from 'prop-types';
import { useClasses, cx } from '../../styles';
import ButtonBase from '../ButtonBase';
import { fade } from '../../theme/colorManipulator';
import { capitalize } from '../../utils/helpers';

export const styles = theme => ({
  root: {
    ...theme.typography.button,
    minWidth: 64,
    boxSizing: 'border-box',
    padding: '6px 16px',
    borderRadius: theme.shape.borderRadius,
    color: theme.palette.text.primary,
  },
  label: {
    width: '100%',
    display: 'inherit',
    alignItems: 'inherit',
    justifyContent: 'inherit',
  },

  text: {
    padding: '6px 8px',
  },
  textPrimary: {
    color: theme.palette.primary.main,
  },
  textSecondary: {
    color: theme.palette.secondary.main,
  },
  disabled: {
    color: theme.palette.action.disabled,
  },

  outlined: {
    padding: '5px 16px',
    border: `1px solid ${
      theme.palette.type === 'light'
        ? 'rgba(0, 0, 0, 0.23)'
        : 'rgba(255, 255, 255, 0.23)'
    }`,
  },
  outlinedPrimary: {
    color: theme.palette.primary.main,
    border: `1px solid ${fade(theme.palette.primary.main, 0.5)}`,
  },
  outlinedSecondary: {
    color: theme.palette.secondary.main,
    border: `1px solid ${fade(theme.palette.secondary.main, 0.5)}`,
  },
  outlinedDisabled: {
    border: `1px solid ${theme.palette.action.disabled}`,
  },

  contained: {
    color: theme.palette.getContrastText(theme.palette.grey[300]),
    backgroundColor: theme.palette.grey[300],
    boxShadow: theme.shadows[2],
    // '&:active': {
    //   boxShadow: theme.shadows[8],
    // },
  },
  containedPrimary: {
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.main,
  },
  containedSecondary: {
    color: theme.palette.secondary.contrastText,
    backgroundColor: theme.palette.secondary.main,
  },
  containedDisabled: {
    color: theme.palette.action.disabled,
    boxShadow: theme.shadows[0],
    backgroundColor: theme.palette.action.disabledBackground,
  },

  colorInherit: {
    color: 'inherit',
    borderColor: 'currentColor',
  },

  sizeSmall: {
    padding: '4px 8px',
    fontSize: theme.typography.pxToRem(13),
  },
  sizeLarge: {
    padding: '8px 24px',
    fontSize: theme.typography.pxToRem(15),
  },

  fullWidth: {
    width: '100%',
  },
});

const Button = props => {
  const {
    className: classNameProp,
    children,
    variant = 'text',
    color = 'default',
    size = 'medium',
    type = 'button',
    disabled = false,
    fullWidth = false,
    ...rest
  } = props;

  const classes = useClasses(styles);

  const text = variant === 'text';
  const outlined = variant === 'outlined';
  const contained = variant === 'contained';
  const primary = color === 'primary';
  const secondary = color === 'secondary';

  const className = cx(
    classes.root,
    {
      [classes.text]: text,
      [classes.textPrimary]: text && primary,
      [classes.textSecondary]: text && secondary,

      [classes.outlined]: outlined,
      [classes.outlinedPrimary]: outlined && primary,
      [classes.outlinedSecondary]: outlined && secondary,
      [classes.outlinedDisabled]: outlined && disabled,

      [classes.contained]: contained,
      [classes.containedPrimary]: contained && primary,
      [classes.containedSecondary]: contained && secondary,
      [classes.containedDisabled]: contained && disabled,

      [classes[`size${capitalize(size)}`]]: size !== 'medium',
      [classes.fullWidth]: fullWidth,
      [classes.colorInherit]: color === 'inherit',
      [classes.disabled]: disabled,
    },
    classNameProp,
  );

  return (
    <ButtonBase className={className} disabled={disabled} type={type} {...rest}>
      <span className={classes.label}>{children}</span>
    </ButtonBase>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  variant: PropTypes.oneOf(['text', 'outlined', 'contained']),
  color: PropTypes.oneOf(['default', 'inherit', 'primary', 'secondary']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  disabled: PropTypes.bool,
  disableRipple: PropTypes.bool,
  fullWidth: PropTypes.bool,
};

export default Button;

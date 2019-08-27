import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

import { cx } from 'emotion';
import { useClasses } from '../../styles';

import Portal from '../Portal';
import SimpleBackdrop from './SimpleBackdrop';

export const styles = theme => ({
  root: {
    position: 'fixed',
    zIndex: theme.zIndex.modal,
    right: 0,
    bottom: 0,
    top: 0,
    left: 0,
  },
  hidden: {
    visibility: 'hidden',
  },
});

const Modal = props => {
  const {
    BackdropComponent = SimpleBackdrop,
    BackdropProps,
    children,
    container,
    disableBackdropClick = false,
    disablePortal = false,
    hideBackdrop = false,
    keepMounted = false,
    onBackdropClick,
    onClose,
    onRendered,
    open,
    ...other
  } = props;

  const classes = useClasses(styles);

  const handleRendered = useCallback(() => {
    if (onRendered) {
      onRendered();
    }
  }, [onRendered]);

  if (!keepMounted && !open) {
    return null;
  }

  const handleBackdropClick = event => {
    if (event.target !== event.currentTarget) {
      return;
    }

    if (onBackdropClick) {
      onBackdropClick(event);
    }

    if (!disableBackdropClick && onClose) {
      onClose(event, 'backdropClick');
    }
  };

  return (
    <Portal
      container={container}
      disablePortal={disablePortal}
      onRendered={handleRendered}
    >
      <div className={cx(classes.root, { [classes.hidden]: !open })} {...other}>
        {hideBackdrop ? null : (
          <BackdropComponent
            open={open}
            onClick={handleBackdropClick}
            {...BackdropProps}
          />
        )}
        {children}
      </div>
    </Portal>
  );
};

Modal.propTypes = {
  BackdropComponent: PropTypes.elementType,
  BackdropProps: PropTypes.object,
  children: PropTypes.node.isRequired,
  container: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  disableBackdropClick: PropTypes.bool,
  disablePortal: PropTypes.bool,
  hideBackdrop: PropTypes.bool,
  keepMounted: PropTypes.bool,
  onBackdropClick: PropTypes.func,
  onClose: PropTypes.func,
  onRendered: PropTypes.func,
  open: PropTypes.bool.isRequired,
};

export default Modal;

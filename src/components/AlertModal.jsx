import React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { Box } from '@mui/material';
import { FaCircleCheck } from 'react-icons/fa6';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AlertModal = ({
  isOpen,
  handleClose,
  title = 'Alert',
  alertMessage,
  agreeLabel = 'Close',
  alertType = '',
}) => {
  return (
    <Dialog
      open={isOpen}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        {alertType == 'success' && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              my: '30px',
            }}
          >
            <FaCircleCheck fontSize="80px" color="#24a370" />
          </Box>
        )}
        <DialogContentText id="alert-dialog-slide-description">
          {alertMessage}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>{agreeLabel}</Button>
      </DialogActions>
    </Dialog>
  );
};

AlertModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  title: PropTypes.string,
  alertMessage: PropTypes.string,
  disagreeLabel: PropTypes.string,
  agreeLabel: PropTypes.string,
  alertType: PropTypes.string,
};

export default AlertModal;

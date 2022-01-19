import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';

const ConfirmDialog = ({onCancel, onConfirm}) => {
  const ConfirmDialogState = useSelector((state) => state.ConfirmDialog);
  const {isOpen, title, message} = ConfirmDialogState;

  return (
    <Dialog
      open={isOpen}
      onClose={onCancel}
      aria-labelledby="confirm-dialog"
    >
      <DialogTitle id="confirm-dialog">{title}</DialogTitle>
      <DialogContent>
        <Typography
          color="textSecondary"
          gutterBottom
        >
          {message}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button
          variant="outlined"
          onClick={onCancel}
        >
        No
        </Button>
        <Button
          variant="contained"
          onClick={onConfirm}
        >
        Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

ConfirmDialog.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

export default ConfirmDialog;

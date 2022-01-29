import {Snackbar, Alert as MuiAlert} from '@mui/material';
import React, {forwardRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {unsetSuccess} from '../Redux/Slicer/AppState';

const Alert = forwardRef(function Alert(props, ref) {
  return (
    <MuiAlert
      elevation={6}
      sx={{px: '2em'}}
      ref={ref}
      variant="filled"
      {...props}
    />
  );
});

const SuccessNotif = () => {
  const dispatch = useDispatch();
  const isSuccess = useSelector((state) => state.AppState.isSuccess);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(unsetSuccess());
  };

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      open={isSuccess}
      onClose={handleClose}
      autoHideDuration={5000}
    >
      <Alert
        onClose={handleClose}
        severity={'success'}
      >
        {'Success'}
      </Alert>
    </Snackbar>
  );
};

export default SuccessNotif;

import {Snackbar, Alert as MuiAlert} from '@mui/material';
import React, {forwardRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {clearSuccess as clearUser} from '../Redux/Slicer/User';
import {clearSuccess as clearCategory} from '../Redux/Slicer/Category';
import {clearSuccess as clearCustomer} from '../Redux/Slicer/Customer';
import {clearSuccess as clearInvoice} from '../Redux/Slicer/Invoice';
import {clearSuccess as clearProductUnit} from '../Redux/Slicer/Product Unit';
import {clearSuccess as clearProduct} from '../Redux/Slicer/Product';
import {
  clearSuccess as clearPurchaseOrder,
} from '../Redux/Slicer/Purchase Order';
import {
  clearSuccess as clearReceiveProduct,
} from '../Redux/Slicer/Receive Product';
import {clearSuccess as clearSupplier} from '../Redux/Slicer/Supplier';
import {clearSuccess as clearSales} from '../Redux/Slicer/Sales';
import {clearSuccess as clearAuth} from '../Redux/Slicer/Authentication';

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

const ErrorNotif = () => {
  const dispatch = useDispatch();
  const Product = useSelector((state) => state.Product);
  const Category = useSelector((state) => state.Category);
  const Supplier = useSelector((state) => state.Supplier);
  const PurchaseOrder = useSelector((state) => state.PurchaseOrder);
  const ProductUnit = useSelector((state) => state.ProductUnit);
  const Invoice = useSelector((state) => state.Invoice);
  const ReceiveProduct = useSelector((state) => state.ReceiveProduct);
  const Customer = useSelector((state) => state.Customer);
  const Sales = useSelector((state) => state.Sales);
  const UserState = useSelector((state) => state.User);
  const AuthState = useSelector((state) => state.Authentication);

  const isSuccess =
  Product.isSuccess ||
  Category.isSuccess ||
  Supplier.isSuccess ||
  PurchaseOrder.isSuccess ||
  ProductUnit.isSuccess ||
  Invoice.isSuccess ||
  ReceiveProduct.isSuccess ||
  Customer.isSuccess ||
  Sales.isSuccess ||
  UserState.isSuccess ||
  AuthState.isSuccess;

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    clearAllError();
  };

  const clearAllError = () => {
    dispatch(clearUser());
    dispatch(clearCategory());
    dispatch(clearCustomer());
    dispatch(clearInvoice());
    dispatch(clearProduct());
    dispatch(clearProductUnit());
    dispatch(clearPurchaseOrder());
    dispatch(clearReceiveProduct());
    dispatch(clearSupplier());
    dispatch(clearSales());
    dispatch(clearAuth());
  };

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      open={isSuccess}
      autoHideDuration={5000}
      onClose={handleClose}
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

export default ErrorNotif;

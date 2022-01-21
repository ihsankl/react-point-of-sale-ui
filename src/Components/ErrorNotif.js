import {Snackbar, Alert as MuiAlert} from '@mui/material';
import React, {forwardRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {clearError as clearUser} from '../Redux/Slicer/User';
import {clearError as clearCategory} from '../Redux/Slicer/Category';
import {clearError as clearCustomer} from '../Redux/Slicer/Customer';
import {clearError as clearInvoice} from '../Redux/Slicer/Invoice';
import {clearError as clearProductUnit} from '../Redux/Slicer/Product Unit';
import {clearError as clearProduct} from '../Redux/Slicer/Product';
import {clearError as clearPurchaseOrder} from '../Redux/Slicer/Purchase Order';
import {
  clearError as clearReceiveProduct,
} from '../Redux/Slicer/Receive Product';
import {clearError as clearSupplier} from '../Redux/Slicer/Supplier';
import {clearError as clearSales} from '../Redux/Slicer/Sales';

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
  const SalesState = useSelector((state) => state.Sales);

  const isError =
  Product.error.state ||
  Category.error.state ||
  Supplier.error.state ||
  PurchaseOrder.error.state ||
  ProductUnit.error.state ||
  Invoice.error.state ||
  ReceiveProduct.error.state ||
  Customer.error.state ||
  SalesState.error.state;

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
  };

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      open={isError}
      autoHideDuration={5000}
      onClose={handleClose}
    >
      <Alert
        onClose={handleClose}
        severity={'error'}
      >
        {'Error :('}
      </Alert>
    </Snackbar>
  );
};

export default ErrorNotif;

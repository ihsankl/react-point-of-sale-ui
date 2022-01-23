/* eslint-disable max-len */
import {Alert as MuiAlert, Snackbar} from '@mui/material';
import React, {useEffect, forwardRef} from 'react';
import {useSelector} from 'react-redux';

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Information = () => {
  const ProductErrorMessage = useSelector((state) => state.Product.error.message);
  const CategoryErrorMessage = useSelector((state) => state.Category.error.message);
  const SupplierErrorMessage = useSelector((state) => state.Supplier.error.message);
  const PurchaseOrderErrorMessage = useSelector((state) => state.PurchaseOrder.error.message);
  const ProductUnitErrorMessage = useSelector((state) => state.ProductUnit.error.message);
  const InvoiceErrorMessage = useSelector((state) => state.Invoice.error.message);
  const ReceiveProductErrorMessage = useSelector((state) => state.ReceiveProduct.error.message);
  const CustomerErrorMessage = useSelector((state) => state.Customer.error.message);
  const SalesErrorMessage = useSelector((state) => state.Sales.error.message);
  const AuthErrorMessage = useSelector((state) => state.Authentication.error.message);
  const UserErrorMessage = useSelector((state) => state.User.error.message);

  const errorMessage =
    ProductErrorMessage ||
    CategoryErrorMessage ||
    SupplierErrorMessage ||
    PurchaseOrderErrorMessage ||
    ProductUnitErrorMessage ||
    InvoiceErrorMessage ||
    ReceiveProductErrorMessage ||
    CustomerErrorMessage ||
    SalesErrorMessage ||
    AuthErrorMessage ||
    UserErrorMessage;

  useEffect(() => {
    return () => {

    };
  }, [errorMessage]);

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      open={!!errorMessage}
      autoHideDuration={5000}
    >
      <Alert
        severity="error"
      >
        {errorMessage ?? ''}
      </Alert>
    </Snackbar>
  );
};

export default Information;

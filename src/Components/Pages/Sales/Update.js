import {
  Autocomplete,
  FormHelperText,
  TextField,
} from '@mui/material';
import dayjs from 'dayjs';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useLocation, useNavigate} from 'react-router-dom';
import {isNumber} from '../../../helper';
import {
  SubHeader,
  PaperContainer,
  TitleWithDivider,
  FormControlContainer,
} from '../../../layout';
import {setSuccess, unsetMountPage} from '../../../Redux/Slicer/AppState';
import {getInvoice} from '../../../Redux/Slicer/Invoice';
import {getProduct} from '../../../Redux/Slicer/Product';
import {updateSales} from '../../../Redux/Slicer/Sales';
import BasicInput from '../../BasicInput';

const defaultValues = {
  sales_id: 0,
  sales_qty: 0,
  sales_unit_price: 0,
  sales_sub_total: 0,
  sales_invoice_id: 0,
  sales_product_id: 0,
};

const UpdateSales = () => {
  const [formValues, setFormValues] = useState(defaultValues);
  const [productValue, setProductValue] = useState('');
  const [invoiceValue, setInvoiceValue] = useState('');
  const [mount, setmount] = useState(false);
  const dispatch = useDispatch();
  const {state} = useLocation();
  const navigate = useNavigate();
  const InvoiceState = useSelector((state) => state.Invoice);
  const SalesState = useSelector((state) => state.Sales);
  const ProductState = useSelector((state) => state.Product);
  const InvoiceStateData = InvoiceState.data?.data ?? [];
  const ProductStateData = ProductState.data?.data ?? [];

  useEffect(() => {
    if (!!state) {
      const data = {
        sales_id: state.data[0].id,
        sales_qty: state.data[0].qty,
        sales_unit_price: state.data[0].unit_price,
        sales_sub_total: state.data[0].sub_total,
        sales_invoice_id: state.data[0].invoice_id,
        sales_product_id: state.data[0].product_id,
      };
      // eslint-disable-next-line max-len
      const foundInvoice = InvoiceStateData.find( (invoice) => invoice.id === data.sales_invoice_id);
      // eslint-disable-next-line max-len
      const foundProduct = ProductStateData.find( (product) => product.id === data.sales_product_id);
      // eslint-disable-next-line max-len
      setInvoiceValue(foundInvoice ? `ID: (${foundInvoice?.id}) - ${dayjs(foundInvoice?.date_recorded).format('DD MMM, YYYY')}` : ``);
      setProductValue(foundProduct?.name ?? ``);
      setFormValues(data);
    } else {
      navigate(-1);
    }
    if (!mount && ProductStateData.length < 1 || InvoiceStateData.length < 1) {
      initProductAndInvoice();
      setmount(true);
    }
    return () => {

    };
  }, [mount]);

  const initProductAndInvoice = async () => {
    await dispatch(getProduct()).unwrap();
    await dispatch(getInvoice()).unwrap();
  };

  useEffect(() => {
    if (SalesState.isSuccess) {
      dispatch(setSuccess());
      dispatch(unsetMountPage('sales'));
      dispatch(unsetMountPage('invoice'));
      initProductAndInvoice();
      setTimeout(() => {
        dispatch(clearSuccess());
      }, 5000);
    }

    return () => {

    };
  }, [SalesState]);

  const handleSubmit = () => {
    const data = {
      id: formValues.sales_id,
      qty: formValues.sales_qty,
      unit_price: formValues.sales_unit_price,
      sub_total: formValues.sales_sub_total,
      invoice_id: formValues.sales_invoice_id,
      product_id: formValues.sales_product_id,
    };
    dispatch(updateSales(data));
  };

  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const fields = [
    {
      id: 'sales_qty',
      label: 'Quantity',
      onChange: handleInputChange,
      type: 'number',
      value: formValues.sales_qty,
      error: !isNumber(formValues.sales_qty),
      helperText: !isNumber(formValues.sales_qty) ?
      'Quantity must be a number!' : '',
    },
    {
      id: 'sales_unit_price',
      label: 'Unit Price',
      onChange: handleInputChange,
      type: 'number',
      value: formValues.sales_unit_price,
      error: !isNumber(formValues.sales_unit_price),
      helperText: !isNumber(formValues.sales_unit_price) ?
        'Unit Price must be a number!' : '',
    },
    {
      id: 'sales_sub_total',
      label: 'Sub Total',
      onChange: handleInputChange,
      type: 'number',
      value: formValues.sales_sub_total,
      error: !isNumber(formValues.sales_sub_total),
      helperText: !isNumber(formValues.sales_sub_total) ?
        'Sub Total must be a number!' : '',
    },
  ];

  return (
    <>
      <PaperContainer elevation={3} square>
        <TitleWithDivider>Update Sales</TitleWithDivider>
        <SubHeader>
          <BasicInput isUpdate fields={fields} onSubmit={handleSubmit}>
            <FormControlContainer>
              <Autocomplete
                value={productValue}
                onChange={(event, newValue) => {
                  const value = {...formValues};
                  value.sales_product_id = newValue?.id;
                  setProductValue(newValue?.name);
                  setFormValues(value);
                }}
                name="sales_product_id"
                id="sales_product_id_label"
                options={ProductStateData.map((item) => {
                  return {
                    ...item, label: `${item.name}`,
                  };
                })}
                // eslint-disable-next-line max-len
                renderInput={(params) => <TextField error={!formValues.sales_product_id} {...params} label="Product" />}
              />
              {!formValues.sales_product_id &&
                <FormHelperText error={!formValues.sales_product_id}>
                  Product ID is required
                </FormHelperText>
              }
            </FormControlContainer>
            <FormControlContainer>
              <Autocomplete
                value={invoiceValue}
                onChange={(event, newValue) => {
                  const value = {...formValues};
                  value.sales_invoice_id = newValue?.id;
                  // eslint-disable-next-line max-len
                  const temp = !!newValue ? `ID: (${newValue.id}) - ${dayjs(newValue.date_recorded).format('DD MMM, YYYY')}` : '';
                  setInvoiceValue(temp);
                  setFormValues(value);
                }}
                name="sales_invoice_id"
                id="sales_invoice_id_label"
                options={InvoiceStateData.map((item) => {
                  return {
                    // eslint-disable-next-line max-len
                    ...item, label: `ID: (${item.id}) - ${dayjs(item.date_recorded).format('DD MMM, YYYY')}`,
                  };
                })}
                // eslint-disable-next-line max-len
                renderInput={(params) => <TextField error={!formValues.sales_invoice_id} {...params} label="Invoice ID" />}
              />
              {!formValues.sales_invoice_id &&
                <FormHelperText error={!formValues.sales_invoice_id}>
                  Invoice ID is required
                </FormHelperText>
              }
            </FormControlContainer>
          </BasicInput>
        </SubHeader>
      </PaperContainer>
    </>
  );
};

export default UpdateSales;

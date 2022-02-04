import {
  Autocomplete,
  Button,
  TextField,
} from '@mui/material';
import React, {Fragment, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  SubHeader,
  PaperContainer,
  TitleWithDivider,
  FormControlContainer,
} from '../../../layout';
import {setSuccess, unsetMountPage} from '../../../Redux/Slicer/AppState';
import {getProduct} from '../../../Redux/Slicer/Product';
// eslint-disable-next-line no-unused-vars
import {clearSuccess, createSales} from '../../../Redux/Slicer/Sales';
import BasicInput from '../../BasicInput';
import {Add} from '@mui/icons-material';
import dayjs from 'dayjs';
import Products from './Products';
import {getInvoice} from '../../../Redux/Slicer/Invoice';

const defaultValues = {
  sales_user_id: '',
  sales_customer_id: 1,
  sales_invoice_id: '',
  sales_products: [],
};

const CreateSales = () => {
  const dispatch = useDispatch();
  const ProductState = useSelector((state) => state.Product);
  const SalesState = useSelector((state) => state.Sales);
  const InvoiceState = useSelector((state) => state.Invoice);
  const AppState = useSelector((state) => state.AppState);
  const ProductStateData = ProductState.data?.data ?? [];
  const InvoiceStateData = InvoiceState.data?.data ?? [];
  const UserData = AppState.userData;
  const [formValues, setFormValues] = useState(defaultValues);
  const [mount, setmount] = useState(false);
  const [invoiceValue, setInvoiceValue] = useState('');
  const [productFields, setProductFields] = useState([
    {
      qty: '',
      product_id: '',
      unit_price: '',
      sub_total: '',
    },
  ]);

  useEffect(() => {
    if (!mount && !ProductStateData.length) {
      initProduct();
      setmount(true);
    }

    return () => {

    };
  }, [mount]);

  const initProduct = async () => {
    await dispatch(getProduct()).unwrap();
  };

  const handleProductFieldChange = (index, event) => {
    const values = [...productFields];
    values[index][event.target.name] = event.target.value;
    setProductFields(values);
  };

  useEffect(() => {
    if (SalesState.isSuccess) {
      dispatch(setSuccess());
      dispatch(unsetMountPage('sales'));
      dispatch(unsetMountPage('invoice'));
      dispatch(getInvoice());
      dispatch(getProduct());
      setTimeout(() => {
        dispatch(clearSuccess());
      }, 5000);
    }

    return () => {

    };
  }, [SalesState]);

  const fields = [];

  const handleSubmit = () => {
    const data = {
      // eslint-disable-next-line max-len
      invoice_id: !!formValues.sales_invoice_id ? formValues.sales_invoice_id : null,
      user_id: UserData.id,
      products: productFields,
    };
    dispatch(createSales(data));
  };

  const handleRemove = (index) => {
    const values = [...productFields];
    values.splice(index, 1);
    setProductFields(values);
  };

  return (
    <>
      <PaperContainer elevation={3} square>
        <TitleWithDivider>Create Sales</TitleWithDivider>
        <SubHeader>
          <BasicInput fields={fields} onSubmit={handleSubmit}>
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
                renderInput={(params) => <TextField autoFocus {...params} label="Invoice ID (Optional)" />}
              />
            </FormControlContainer>
            <FormControlContainer>
              <TextField
                id={'sales_user_id'}
                label={'User'}
                name={'sales_user_id'}
                defaultValue={UserData.username}
                disabled
                variant="outlined"
                fullWidth
              />
            </FormControlContainer>
            {productFields.map((value, index) => {
              return (
                <Products
                  key ={`product-fields-${index}`}
                  index={index}
                  value={value}
                  handleChange={handleProductFieldChange}
                  handleRemove={handleRemove}
                  setProductFields={setProductFields}
                  productFields={productFields}
                />
              );
            })}
            <FormControlContainer>
              <Button
                variant="text"
                color="primary"
                onClick={() => {
                  const temps = [...productFields];
                  temps.push({
                    qty: '',
                    product_id: '',
                    unit_price: '',
                    sub_total: '',
                  });
                  setProductFields(temps);
                }}
                startIcon={<Add />}
              >
                Add Product
              </Button>
            </FormControlContainer>
          </BasicInput>
        </SubHeader>
      </PaperContainer>
    </>
  );
};

const areEqual = (prevProps, nextProps) => {
  if (prevProps.productFields !== nextProps.productFields) {
    return true;
  }
};

export default React.memo(CreateSales, areEqual);

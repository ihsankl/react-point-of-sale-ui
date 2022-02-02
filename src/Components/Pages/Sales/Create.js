import {
  Button,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  SubHeader,
  PaperContainer,
  TitleWithDivider,
  FormControlContainer,
} from '../../../layout';
import {unsetMountPage} from '../../../Redux/Slicer/AppState';
import {getProduct} from '../../../Redux/Slicer/Product';
import {clearSuccess, createSales} from '../../../Redux/Slicer/Sales';
import BasicInput from '../../BasicInput';
import {DesktopDatePicker, LocalizationProvider} from '@mui/lab';
import DateAdapter from '@mui/lab/AdapterDayjs';
import {Add, Remove} from '@mui/icons-material';
import {uuid} from '../../../helper';
import {Box} from '@mui/system';
import dayjs from 'dayjs';

const defaultValues = {
  sales_user_id: '',
  sales_date_recorded: new Date(),
  sales_customer_id: 1,
  sales_invoice_id: '',
  sales_products: [],
};

// {
//   "user_id":1,
//   "date_recorded": "2021-12-01",
//   "customer_id":null,
//   "invoice_id": null,
//   "products":[
//       {
//           "qty":2,
//           "unit_price": 5000,
//           "sub_total": 10000,
//           "product_id": 104
//       },
//       {
//           "qty": 1,
//           "unit_price": 6000,
//           "sub_total": 18000,
//           "product_id": 105
//       },
//        {
//           "qty":30,
//           "unit_price": 5000,
//           "sub_total": 10000,
//           "product_id": 102
//       }
//   ]
// }

const renderProducts = (products, removeItem) => {
  const temp = [...products];
  temp.map((value, index) => {
    temp.push(
        <Box
          key={uuid()}
          sx={{
            display: 'flex',
            gap: '1em',
            width: '100%',
          }}
        >
          <TextField
            label="Quantity"
            variant="outlined"
            fullWidth
          />
          <TextField
            label="Unit Price"
            variant="outlined"
            fullWidth
          />
          <TextField
            label="Sub Total"
            variant="outlined"
            fullWidth
          />
          <TextField
            label="Product"
            variant="outlined"
            fullWidth
          />
          {temp.length > 0 && (
            <Button
              variant="text"
              color="primary"
              onClick={() => {
                removeItem();
              }}
              startIcon={<Remove />}
            >
            </Button>
          )}
        </Box>);
  });
  return temp;
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
  const [products, setProducts] = useState([]);

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

  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleDateChange = (newValue) => {
    const value = {...formValues};
    value.sales_date_recorded = newValue;
    setFormValues(value);
  };

  useEffect(() => {
    if (SalesState.isSuccess) {
      dispatch(setSuccess());
      dispatch(unsetMountPage('sales'));
      setTimeout(() => {
        dispatch(clearSuccess());
      }, 5000);
    }

    return () => {

    };
  }, [SalesState]);

  const fields = [
    // {
    //   id: 'sales_invoice_id',
    //   label: 'Invoice ID (Optional)',
    //   onChange: handleInputChange,
    //   value: formValues.sales_invoice_id,
    //   error: !isNumber(formValues.sales_invoice_id),
    //   helperText: !isNumber(formValues.sales_invoice_id) ?
    //   'Quantity must be a number!' : '',
    // },
  ];

  const handleSubmit = () => {
    const data = {
      invoice_id: formValues.sales_invoice_id,
      user_id: UserData.id,
    };
    dispatch(createSales(data));
  };

  return (
    <>
      <PaperContainer elevation={3} square>
        <TitleWithDivider>Create Sales</TitleWithDivider>
        <SubHeader>
          <BasicInput fields={fields} onSubmit={handleSubmit}>
            <FormControlContainer>
              <LocalizationProvider dateAdapter={DateAdapter}>
                <DesktopDatePicker
                  label="Date Recorded"
                  labelId="sales_date_recorded_label"
                  inputFormat="YYYY-DD-MM"
                  name="sales_date_recorded"
                  mask='____-__-__'
                  id="sales_date_recorded"
                  value={formValues.sales_date_recorded}
                  onChange={handleDateChange}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </FormControlContainer>
            <FormControlContainer>
              <InputLabel
                id="sales_invoice_id_label"
              >
                Invoice ID (Optional)
              </InputLabel>
              <Select
                labelId="sales_invoice_id_label"
                id="sales_invoice_id"
                name="sales_invoice_id"
                label="Supplier"
                value={formValues.sales_invoice_id}
                onChange={handleInputChange}
              >
                {InvoiceStateData.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {/* eslint-disable-next-line max-len */}
                    {`${item.id} - ${dayjs(item.date_recorded).format('YYYY-MM-DD')}`}
                  </MenuItem>
                ))}
              </Select>
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
            {renderProducts(products, () => {
              const temp = [...products];
              temp.pop();
              setProducts(temp);
            }).map((item) => item)}
            <FormControlContainer>
              <Button
                variant="text"
                color="primary"
                onClick={() => {
                  const temp = [...products];
                  temp.push('');
                  setProducts(temp);
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

export default CreateSales;

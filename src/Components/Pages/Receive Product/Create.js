import {DesktopDatePicker, LocalizationProvider} from '@mui/lab';
import {
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import DateAdapter from '@mui/lab/AdapterDayjs';
import React, {useEffect, useState} from 'react';
import {
  FormControlContainer,
  PaperContainer,
  SubHeader,
  TitleWithDivider,
} from '../../../layout';
import BasicInput from '../../BasicInput';
import {useDispatch, useSelector} from 'react-redux';
import {
  clearSuccess,
  createReceiveProduct,
} from '../../../Redux/Slicer/Receive Product';
import dayjs from 'dayjs';
import {isNumber} from '../../../helper';
import {getProduct} from '../../../Redux/Slicer/Product';
import {getSupplier} from '../../../Redux/Slicer/Supplier';
import {setSuccess, unsetMountPage} from '../../../Redux/Slicer/AppState';

const defaultValues = {
  receive_product_qty: '',
  receive_product_sub_total: '',
  receive_product_received_date: new Date(),
  receive_product_unit_price: '',
  receive_product_product_id: '',
  receive_product_supplier_id: '',
};

const CreateReceiveProduct = () => {
  const [formValues, setFormValues] = useState(defaultValues);
  const [mount, setmount] = useState(false);
  const dispatch = useDispatch();
  const Supplier = useSelector((state) => state.Supplier);
  const ReceiveProductState = useSelector((state) => state.ReceiveProduct);
  const AppState = useSelector((state) => state.AppState);
  const SupplierData = Supplier.data?.data ?? [];
  const Product = useSelector((state) => state.Product);
  const ProductData = Product.data?.data ?? [];
  const UserData = AppState.userData;

  useEffect(() => {
    if (!mount && !ProductData) {
      getProductAndSupplier();
      setmount(true);
    }
    return () => {

    };
  }, [mount]);

  useEffect(() => {
    if (ReceiveProductState.isSuccess) {
      dispatch(setSuccess());
      dispatch(unsetMountPage('receive_product'));
      setTimeout(() => {
        dispatch(clearSuccess());
      }, 5000);
    }

    return () => {

    };
  }, [ReceiveProductState]);

  const getProductAndSupplier = async () => {
    await dispatch(getProduct()).unwrap();
    await dispatch(getSupplier()).unwrap();
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
    value.receive_product_received_date = newValue;
    setFormValues(value);
  };

  const handleSubmit = () => {
    const data = {
      qty: formValues.receive_product_qty,
      sub_total: formValues.receive_product_sub_total,
      // eslint-disable-next-line max-len
      received_date: dayjs(formValues.receive_product_received_date).format('YYYY-MM-DD'),
      unit_price: formValues.receive_product_unit_price,
      product_id: formValues.receive_product_product_id,
      user_id: UserData.id,
      supplier_id: formValues.receive_product_supplier_id,
    };
    dispatch(createReceiveProduct(data));
  };

  const fields = [
    {
      id: 'receive_product_qty',
      label: 'Quantity',
      onChange: handleInputChange,
      value: formValues.receive_product_qty,
      error: !isNumber(formValues.receive_product_qty),
      helperText: !!formValues.receive_product_qty ?
       '' : 'Quantity must be a number',
    },
    {
      id: 'receive_product_sub_total',
      label: 'Sub Total',
      onChange: handleInputChange,
      value: formValues.receive_product_sub_total,
      error: !isNumber(formValues.receive_product_sub_total),
      helperText: !!formValues.receive_product_sub_total ?
      '' : 'Sub Total must be a number',
    },
    {
      id: 'receive_product_unit_price',
      label: 'Unit Price',
      onChange: handleInputChange,
      value: formValues.receive_product_unit_price,
      error: !isNumber(formValues.receive_product_unit_price),
      helperText: !!formValues.receive_product_unit_price ?
      '' : 'Unit Price must be a number',
    },
  ];

  return (
    <>
      <PaperContainer elevation={3} square>
        <TitleWithDivider>Create Receive Product</TitleWithDivider>
        <SubHeader>
          <BasicInput fields={fields} onSubmit={handleSubmit}>
            <FormControlContainer>
              <LocalizationProvider dateAdapter={DateAdapter}>
                <DesktopDatePicker
                  label="Receive Date"
                  labelId="receive_product_received_date_label"
                  inputFormat="YYYY-DD-MM"
                  name="receive_product_received_date"
                  mask='____-__-__'
                  id="receive_product_received_date"
                  value={formValues.receive_product_received_date}
                  onChange={handleDateChange}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </FormControlContainer>
            <FormControlContainer>
              <InputLabel
                id="receive_product_supplier_id_label"
              >
                Supplier
              </InputLabel>
              <Select
                error={!formValues.receive_product_supplier_id}
                labelId="receive_product_supplier_id_label"
                id="receive_product_supplier_id"
                name="receive_product_supplier_id"
                label="Supplier"
                value={formValues.receive_product_supplier_id}
                onChange={handleInputChange}
              >
                {SupplierData.map((supplier) => (
                  <MenuItem
                    key={supplier.id}
                    value={supplier.id}
                  >
                    {supplier.name}
                  </MenuItem>
                ))}
              </Select>
              {!formValues.receive_product_supplier_id &&
            <FormHelperText error={!formValues.receive_product_supplier_id}>
              Supplier is required
            </FormHelperText>
              }
            </FormControlContainer>
            <FormControlContainer>
              <InputLabel
                id="receive_product_product_id_label"
              >
                Product
              </InputLabel>
              <Select
                error={!formValues.receive_product_product_id}
                labelId="receive_product_product_id_label"
                id="receive_product_product_id"
                name="receive_product_product_id"
                label="Product"
                value={formValues.receive_product_product_id}
                onChange={handleInputChange}
              >
                {ProductData.map((product) => (
                  <MenuItem
                    key={product.id}
                    value={product.id}
                  >
                    {product.name}
                  </MenuItem>
                ))}
              </Select>
              {!formValues.receive_product_product_id &&
            <FormHelperText error={!formValues.receive_product_product_id}>
              Product is required
            </FormHelperText>
              }
            </FormControlContainer>
            <FormControlContainer>
              <TextField
                id={'receive_product_user_id'}
                label={'User'}
                name={'receive_product_user_id'}
                defaultValue={UserData.username}
                disabled
                variant="outlined"
                fullWidth
              />
            </FormControlContainer>
          </BasicInput>
        </SubHeader>
      </PaperContainer>
    </>
  );
};

export default CreateReceiveProduct;

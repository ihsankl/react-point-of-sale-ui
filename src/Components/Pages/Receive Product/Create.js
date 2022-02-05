import {DesktopDatePicker, LocalizationProvider} from '@mui/lab';
import {
  Autocomplete,
  FormHelperText,
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
import {getProductUnit} from '../../../Redux/Slicer/Product Unit';

const defaultValues = {
  receive_product_qty: '',
  receive_product_sub_total: '',
  receive_product_received_date: new Date(),
  receive_product_expired_date: new Date(),
  receive_product_unit_price: '',
  receive_product_product_id: '',
  receive_product_supplier_id: '',
  receive_product_additional_expenses: '',
  receive_product_unit_id: '',
};

const CreateReceiveProduct = () => {
  const [formValues, setFormValues] = useState(defaultValues);
  const [mount, setmount] = useState(false);
  const dispatch = useDispatch();
  const Supplier = useSelector((state) => state.Supplier);
  const ReceiveProductState = useSelector((state) => state.ReceiveProduct);
  const ProductUnit = useSelector((state) => state.ProductUnit);
  const AppState = useSelector((state) => state.AppState);
  const SupplierData = Supplier.data?.data ?? [];
  const Product = useSelector((state) => state.Product);
  const ProductData = Product.data?.data ?? [];
  const ProductUnitData = ProductUnit.data?.data ?? [];
  const UserData = AppState.userData;
  const [supplierValue, setSupplierValue] = useState('');
  const [productValue, setProductValue] = useState('');
  const [productUnitValue, setProductUnitValue] = useState('');

  useEffect(() => {
    if (!mount && ProductData.length < 1 ||
      SupplierData.length < 1 ||
      ProductUnitData.length < 1
    ) {
      getProductSupplierAndProductUnit();
      setmount(true);
    }
    return () => {

    };
  }, [mount]);

  useEffect(() => {
    if (ReceiveProductState.isSuccess) {
      dispatch(setSuccess());
      dispatch(unsetMountPage('receive_product'));
      dispatch(unsetMountPage('product'));
      dispatch(getProduct());
      setTimeout(() => {
        dispatch(clearSuccess());
      }, 5000);
    }

    return () => {

    };
  }, [ReceiveProductState]);

  const getProductSupplierAndProductUnit = async () => {
    await dispatch(getProduct()).unwrap();
    await dispatch(getSupplier()).unwrap();
    await dispatch(getProductUnit()).unwrap();
  };

  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleDateChange = (newValue, name) => {
    const value = {...formValues};
    value[name] = newValue;
    setFormValues(value);
  };

  const handleSubmit = () => {
    const data = {
      qty: formValues.receive_product_qty,
      sub_total: formValues.receive_product_sub_total,
      // eslint-disable-next-line max-len
      received_date: dayjs(formValues.receive_product_received_date).format('YYYY-MM-DD'),
      // eslint-disable-next-line max-len
      expired_date: dayjs(formValues.receive_product_expired_date).format('YYYY-MM-DD'),
      unit_price: formValues.receive_product_unit_price,
      product_id: formValues.receive_product_product_id,
      user_id: UserData.id,
      supplier_id: formValues.receive_product_supplier_id,
      additional_expenses: formValues.receive_product_additional_expenses,
      unit_id: formValues.receive_product_unit_id,
    };
    dispatch(createReceiveProduct(data));
  };

  const fields = [
    {
      id: 'receive_product_qty',
      label: 'Quantity',
      onChange: handleInputChange,
      type: 'number',
      value: formValues.receive_product_qty,
      error: !isNumber(formValues.receive_product_qty),
      helperText: !!formValues.receive_product_qty ?
       '' : 'Quantity must be a number',
    },
    {
      id: 'receive_product_sub_total',
      label: 'Sub Total',
      onChange: handleInputChange,
      type: 'number',
      value: formValues.receive_product_sub_total,
      error: !isNumber(formValues.receive_product_sub_total),
      helperText: !!formValues.receive_product_sub_total ?
      '' : 'Sub Total must be a number',
    },
    {
      id: 'receive_product_additional_expenses',
      label: 'Additional Expenses',
      type: 'number',
      onChange: handleInputChange,
      value: formValues.receive_product_additional_expenses,
    },
    {
      id: 'receive_product_unit_price',
      label: 'Unit Price',
      onChange: handleInputChange,
      type: 'number',
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
                  inputFormat="YYYY-MM-DD"
                  name="receive_product_received_date"
                  mask='____-__-__'
                  id="receive_product_received_date"
                  value={formValues.receive_product_received_date}
                  // eslint-disable-next-line max-len
                  onChange={(newValue) => handleDateChange(newValue, 'receive_product_received_date')}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </FormControlContainer>
            <FormControlContainer>
              <LocalizationProvider dateAdapter={DateAdapter}>
                <DesktopDatePicker
                  label="Expired Date"
                  labelId="receive_product_expired_date_label"
                  inputFormat="YYYY-MM-DD"
                  name="receive_product_expired_date"
                  mask='____-__-__'
                  id="receive_product_expired_date"
                  value={formValues.receive_product_expired_date}
                  // eslint-disable-next-line max-len
                  onChange={(newValue) => handleDateChange(newValue, 'receive_product_expired_date')}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </FormControlContainer>
            <FormControlContainer>
              <Autocomplete
                value={supplierValue}
                onChange={(event, newValue) => {
                  const value = {...formValues};
                  value.receive_product_supplier_id = newValue?.id;
                  setSupplierValue(newValue?.name);
                  setFormValues(value);
                }}
                name="receive_product_supplier_id"
                id="receive_product_supplier_id_label"
                options={SupplierData.map((item) => {
                  return {
                    ...item, label: `${item.name}`,
                  };
                })}
                // eslint-disable-next-line max-len
                renderInput={(params) => <TextField error={!formValues.receive_product_supplier_id} {...params} label="Supplier" />}
              />
              {!formValues.receive_product_supplier_id &&
                <FormHelperText error={!formValues.receive_product_supplier_id}>
                  Supplier is Required
                </FormHelperText>
              }
            </FormControlContainer>
            <FormControlContainer>
              <Autocomplete
                value={productValue}
                onChange={(event, newValue) => {
                  const value = {...formValues};
                  value.receive_product_product_id = newValue?.id;
                  setProductValue(newValue?.name);
                  setFormValues(value);
                }}
                name="receive_product_product_id"
                id="receive_product_product_id"
                options={ProductData.map((item) => {
                  return {
                    ...item, label: `${item.name}`,
                  };
                })}
                // eslint-disable-next-line max-len
                renderInput={(params) => <TextField error={!formValues.receive_product_product_id} {...params} label="Product" />}
              />
              {!formValues.receive_product_product_id &&
                <FormHelperText error={!formValues.receive_product_product_id}>
                  Product is Required
                </FormHelperText>
              }
            </FormControlContainer>
            <FormControlContainer>
              <Autocomplete
                value={productUnitValue}
                onChange={(event, newValue) => {
                  const value = {...formValues};
                  value.receive_product_unit_id = newValue?.id;
                  setProductUnitValue(newValue?.name);
                  setFormValues(value);
                }}
                name="receive_product_unit_id"
                id="receive_product_unit_id_label"
                options={ProductUnitData.map((item) => {
                  return {
                    ...item, label: `${item.name}`,
                  };
                })}
                // eslint-disable-next-line max-len
                renderInput={(params) => <TextField error={!formValues.receive_product_unit_id} {...params} label="Product Unit" />}
              />
              {!formValues.receive_product_unit_id &&
                <FormHelperText error={!formValues.receive_product_unit_id}>
                  Product Unit is required
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

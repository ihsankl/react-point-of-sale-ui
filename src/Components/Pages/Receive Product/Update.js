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
import {useLocation, useNavigate} from 'react-router-dom';
import {isNumber} from '../../../helper';
import {getProduct} from '../../../Redux/Slicer/Product';
import {getSupplier} from '../../../Redux/Slicer/Supplier';
import {setSuccess} from '../../../Redux/Slicer/AppState';
import {
  clearSuccess,
  updateReceiveProduct,
} from '../../../Redux/Slicer/Receive Product';

const defaultValues = {
  receive_product_id: '',
  receive_product_qty: '',
  receive_product_sub_total: '',
  receive_product_order_date: new Date(),
  receive_product_unit_price: '',
  receive_product_product_id: '',
  receive_product_user_id: 1,
  receive_product_supplier_id: '',
};

const UpdateReceiveProduct = () => {
  const [formValues, setFormValues] = useState(defaultValues);
  const ReceiveProductState = useSelector((x) => x.ReceiveProduct);
  const [mount, setmount] = useState(false);
  const dispatch = useDispatch();
  const {state} = useLocation();
  const navigate = useNavigate();
  const Supplier = useSelector((x) => x.Supplier);
  const Product = useSelector((x) => x.Product);
  const AppState = useSelector((x) => x.AppState);
  const SupplierData = Supplier.data?.data ?? [];
  const ProductData = Product.data?.data ?? [];
  const UserData = AppState.userData;

  useEffect(() => {
    if (!!state) {
      const data = {
        receive_product_id: state.data[0].id,
        receive_product_qty: state.data[0].qty,
        receive_product_sub_total: state.data[0].sub_total,
        receive_product_order_date: state.data[0].order_date,
        receive_product_unit_price: state.data[0].unit_price,
        receive_product_product_id: state.data[0].product_id,
        receive_product_user_id: state.data[0].user_id,
        receive_product_supplier_id: state.data[0].supplier_id,
      };
      setFormValues(data);
    } else {
      navigate(-1);
    }
    if (!mount) {
      getProductAndSupplier();
      setmount(true);
    }
    return () => {

    };
  }, [mount]);

  useEffect(() => {
    if (ReceiveProductState.isSuccess) {
      dispatch(setSuccess());
      setTimeout(() => {
        dispatch(clearSuccess());
      }, 5000);
    }

    return () => {

    };
  }, [ReceiveProductState]);

  const getProductAndSupplier = async () => {
    await dispatch(getSupplier()).unwrap();
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
    value.receive_product_order_date = newValue;
    setFormValues(value);
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

  const handleSubmit = () => {
    const data = {
      id: formValues.receive_product_id,
      qty: formValues.receive_product_qty,
      sub_total: formValues.receive_product_sub_total,
      order_date: formValues.receive_product_order_date,
      unit_price: formValues.receive_product_unit_price,
      product_id: formValues.receive_product_product_id,
      user_id: UserData.id,
      supplier_id: formValues.receive_product_supplier_id,
    };
    dispatch(updateReceiveProduct(data));
  };

  return (
    <>
      <PaperContainer elevation={3} square>
        <TitleWithDivider>Update Receive Product</TitleWithDivider>
        <SubHeader>
          <BasicInput isUpdate fields={fields} onSubmit={handleSubmit}>
            <FormControlContainer>
              <LocalizationProvider dateAdapter={DateAdapter}>
                <DesktopDatePicker
                  label="Order Date"
                  labelId="receive_product_order_date_label"
                  inputFormat="YYYY-MM-DD"
                  mask='____-__-__'
                  name="receive_product_order_date"
                  id="receive_product_order_date"
                  value={formValues.receive_product_order_date}
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
                labelId="receive_product_supplier_id_label"
                id="receive_product_supplier_id"
                name="receive_product_supplier_id"
                label="Supplier"
                value={formValues.receive_product_supplier_id}
                onChange={handleInputChange}
              >
                {SupplierData.map((value) => (
                  <MenuItem key={value.id} value={value.id}>
                    {value.name}
                  </MenuItem>
                ))}
              </Select>
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
                {ProductData.map((value) => (
                  <MenuItem key={value.id} value={value.id}>
                    {value.name}
                  </MenuItem>
                ))}
              </Select>
              {!formValues.receive_product_product_id &&
              <FormHelperText error={!!formValues.receive_product_product_id}>
                Product is required
              </FormHelperText>}
            </FormControlContainer>
            <FormControlContainer>
              <TextField
                id={'receive_product_user_id'}
                label={'User'}
                name={'receive_product_user_id'}
                defaultValue={UserData.name}
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

export default UpdateReceiveProduct;

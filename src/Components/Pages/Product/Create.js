// /* eslint-disable */
import {
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import {DesktopDatePicker, LocalizationProvider} from '@mui/lab';
import DateAdapter from '@mui/lab/AdapterDayjs';
import dayjs from 'dayjs';
import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import {
  FormControlContainer,
  PaperContainer,
  SubHeader,
  TitleWithDivider,
} from '../../../layout';
import {clearSuccess, createProduct} from '../../../Redux/Slicer/Product';
import BasicInput from '../../BasicInput';
import {isNumber} from '../../../helper';
import {getProductUnit} from '../../../Redux/Slicer/Product Unit';
import {getAllCategory} from '../../../Redux/Slicer/Category';
import {setSuccess} from '../../../Redux/Slicer/AppState';

const defaultValues = {
  product_code: '',
  product_name: '',
  product_unit_in_stock: '',
  product_disc_percentage: '',
  product_unit_price: '',
  product_re_order_level: '',
  product_unit_id: '',
  product_category_id: '',
  product_expired_date: new Date(),
};

const CreateProduct = () => {
  const dispatch = useDispatch();
  const ProductUnit = useSelector((state) => state.ProductUnit);
  const ProductState = useSelector((state) => state.Product);
  const ProductUnitData = ProductUnit.data?.data ?? [];
  const Category = useSelector((state) => state.Category);
  const CategoryData = Category.data?.data ?? [];
  const AppState = useSelector((state) => state.AppState);
  const UserData = AppState.userData;
  const [mount, setMount] = useState(false);
  const [formValues, setFormValues] = useState(defaultValues);

  useEffect(() => {
    if (!mount) {
      getUnitAndCategory();
      setMount(true);
    }
    return () => {

    };
  }, [mount]);

  const getUnitAndCategory = async () => {
    await dispatch(getProductUnit()).unwrap();
    await dispatch(getAllCategory()).unwrap();
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
    value.product_expired_date = newValue;
    setFormValues(value);
  };

  const handleSubmit = () => {
    const data = {
      code: formValues.product_code,
      name: formValues.product_name,
      unit_in_stock: formValues.product_unit_in_stock,
      disc_percentage: formValues.product_disc_percentage,
      unit_price: formValues.product_unit_price,
      re_order_level: formValues.product_re_order_level,
      unit_id: formValues.product_unit_id,
      category_id: formValues.product_category_id,
      user_id: UserData.id,
      expired_date: dayjs(formValues.product_expired_date).format('YYYY-MM-DD'),
    };
    dispatch(createProduct(data));
  };

  React.useEffect(() => {
    if (ProductState.isSuccess) {
      dispatch(setSuccess());
      setTimeout(() => {
        dispatch(clearSuccess());
      }, 5000);
    }
    return () => {

    };
  }, [ProductState]);

  const fields = [
    {
      id: 'product_code',
      label: 'Code',
      onChange: handleInputChange,
      value: formValues.product_code,
      error: !formValues.product_code,
      helperText: formValues.product_code ? '' : 'Code is required',
    },
    {
      id: 'product_name',
      label: 'Name',
      onChange: handleInputChange,
      value: formValues.product_name,
      error: !formValues.product_name,
      helperText: !!formValues.product_name ? '' : 'Name is required',
    },
    {
      id: 'product_unit_in_stock',
      label: 'Unit in Stock',
      onChange: handleInputChange,
      value: formValues.product_unit_in_stock,
      error: !isNumber(formValues.product_unit_in_stock),
      helperText: isNumber(formValues.product_unit_in_stock) ?
      '' : 'Unit in Stock must be a number',
    },
    {
      id: 'product_disc_percentage',
      label: 'Disc Percentage',
      onChange: handleInputChange,
      value: formValues.product_disc_percentage,
      error: !isNumber(formValues.product_disc_percentage),
      helperText: isNumber(formValues.product_disc_percentage) ?
      '' : 'Disc Percentage must be a number',
    },
    {
      id: 'product_unit_price',
      label: 'Unit Price',
      onChange: handleInputChange,
      value: formValues.product_unit_price,
      error: !isNumber(formValues.product_unit_price),
      helperText: isNumber(formValues.product_unit_price) ?
      '' : 'Unit Price must be a number',
    },
    {
      id: 'product_re_order_level',
      label: 'Re-Order Level',
      onChange: handleInputChange,
      value: formValues.product_re_order_level,
    },
  ];

  return (
    <>
      <PaperContainer elevation={3} square>
        <TitleWithDivider>Create Product</TitleWithDivider>
        <SubHeader>
          <BasicInput fields={fields} onSubmit={handleSubmit}>
            <FormControlContainer>
              <InputLabel id="product_unit_id_label">Product Unit</InputLabel>
              <Select
                error={!formValues.product_unit_id}
                labelId="product_unit_id_label"
                id="product_unit_id"
                name="product_unit_id"
                label="Product Unit"
                value={formValues.product_unit_id}
                onChange={handleInputChange}
              >
                {ProductUnitData.map((item) => (
                  <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
                ))}
              </Select>
              {!formValues.product_unit_id &&
            <FormHelperText error={!formValues.product_unit_id}>
              Product Unit is required
            </FormHelperText>
              }
            </FormControlContainer>
            <FormControlContainer>
              <LocalizationProvider dateAdapter={DateAdapter}>
                <DesktopDatePicker
                  label="Expired Date"
                  labelId="product_expired_date_label"
                  inputFormat="YYYY-DD-MM"
                  name="product_expired_date"
                  mask='____-__-__'
                  id="product_expired_date"
                  value={formValues.product_expired_date}
                  onChange={handleDateChange}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </FormControlContainer>
            <FormControlContainer>
              <InputLabel
                id="product_category_id_label"
              >
                Product Category
              </InputLabel>
              <Select
                error={!formValues.product_category_id}
                labelId="product_category_id_label"
                id="product_category_id"
                name="product_category_id"
                label="Product Unit"
                value={formValues.product_category_id}
                onChange={handleInputChange}
              >
                {CategoryData.map((item) => (
                  <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
                ))}
              </Select>
              {!formValues.product_category_id &&
            <FormHelperText error={!formValues.product_category_id}>
              Product Category is required
            </FormHelperText>
              }
            </FormControlContainer>
            <FormControlContainer>
              <TextField
                id={'product_user_id'}
                label={'User'}
                name={'product_user_id'}
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

export default CreateProduct;

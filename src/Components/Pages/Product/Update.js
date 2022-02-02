// /* eslint-disable */
import {
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import dayjs from 'dayjs';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useLocation, useNavigate} from 'react-router-dom';
import {
  FormControlContainer,
  PaperContainer,
  SubHeader,
  TitleWithDivider,
} from '../../../layout';
import {clearSuccess, updateProduct} from '../../../Redux/Slicer/Product';
import BasicInput from '../../BasicInput';
import {DesktopDatePicker, LocalizationProvider} from '@mui/lab';
import DateAdapter from '@mui/lab/AdapterDayjs';
import {isNumber} from '../../../helper';
import {getAllCategory} from '../../../Redux/Slicer/Category';
import {getProductUnit} from '../../../Redux/Slicer/Product Unit';
import {setSuccess, unsetMountPage} from '../../../Redux/Slicer/AppState';

const defaultValues = {
  product_id: '',
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

const UpdateProduct = () => {
  const [formValues, setFormValues] = useState(defaultValues);
  const [mount, setMount] = useState(false);
  const dispatch = useDispatch();
  const {state} = useLocation();
  const navigate = useNavigate();
  const ProductUnit = useSelector((state) => state.ProductUnit);
  const AppState = useSelector((state) => state.AppState);
  const ProductState = useSelector((state) => state.Product);
  const ProductUnitData = ProductUnit.data?.data ?? [];
  const Category = useSelector((state) => state.Category);
  const CategoryData = Category.data?.data ?? [];
  const UserData = AppState.userData;

  useEffect(() => {
    if (!!state) {
      const data = {
        product_id: state.data[0].id,
        product_code: state.data[0].code,
        product_name: state.data[0].name,
        product_unit_in_stock: state.data[0].unit_in_stock,
        product_disc_percentage: state.data[0].disc_percentage,
        product_unit_price: state.data[0].unit_price,
        product_re_order_level: state.data[0].re_order_level,
        product_unit_id: state.data[0].unit_id,
        product_category_id: state.data[0].category_id,
        product_user_id: state.data[0].user_id,
        product_expired_date: state.data[0].expired_date,
      };
      setFormValues(data);
    } else {
      navigate(-1);
    }
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

  const handleSubmit = () => {
    const data = {
      id: formValues.product_id,
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
    dispatch(updateProduct(data));
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

  useEffect(() => {
    if (ProductState.isSuccess) {
      dispatch(setSuccess());
      dispatch(unsetMountPage('product'));
      dispatch(unsetMountPage('purchase_order'));
      dispatch(unsetMountPage('receive_product'));
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
      helperText: !!formValues.product_code ?
      '' : 'Product Code is Required',
    },
    {
      id: 'product_name',
      label: 'Name',
      onChange: handleInputChange,
      value: formValues.product_name,
      error: !formValues.product_name,
      helperText: !!formValues.product_name ?
      '' : 'Product Name is Required',
    },
    {
      id: 'product_unit_in_stock',
      label: 'Unit in Stock',
      onChange: handleInputChange,
      value: formValues.product_unit_in_stock,
      error: !isNumber(formValues.product_unit_in_stock),
      type: 'number',
      // eslint-disable-next-line max-len
      helperText: isNumber(formValues.product_unit_in_stock) || formValues.product_unit_in_stock === 0?
      '' : 'Unit in Stock must be a number',
    },
    {
      id: 'product_disc_percentage',
      label: 'Disc Percentage',
      onChange: handleInputChange,
      value: formValues.product_disc_percentage,
      error: !isNumber(formValues.product_disc_percentage),
      type: 'number',
      // eslint-disable-next-line max-len
      helperText: isNumber(formValues.product_disc_percentage) || formValues.product_disc_percentage === 0?
      '' : 'Disc Percentage must be a number',
    },
    {
      id: 'product_unit_price',
      label: 'Unit Price',
      onChange: handleInputChange,
      value: formValues.product_unit_price,
      error: !isNumber(formValues.product_unit_price),
      type: 'number',
      // eslint-disable-next-line max-len
      helperText: isNumber(formValues.product_unit_price) || formValues.product_unit_price === 0?
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
        <TitleWithDivider>Update Product</TitleWithDivider>
        <SubHeader>
          <BasicInput isUpdate fields={fields} onSubmit={handleSubmit}>
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
                  <MenuItem key={item.id} value={item.id}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
              {!formValues.product_unit_id &&
              <FormHelperText error={!formValues.product_unit_id}>
                Product Unit is Required
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
                  <MenuItem key={item.id} value={item.id}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
              {!formValues.product_category_id &&
              <FormHelperText error={!formValues.product_category_id}>
                Product Category is Required
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

export default UpdateProduct;

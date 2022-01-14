// /* eslint-disable */
import {InputLabel, MenuItem, Select} from '@mui/material';
import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {useLocation, useNavigate} from 'react-router-dom';
import {
  FormControlContainer,
  PaperContainer,
  SubHeader,
  TitleWithDivider,
} from '../../../layout';
import {updateProduct} from '../../../Redux/Slicer/Product';
import BasicInput from '../../BasicInput';

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
  product_user_id: '',
};

const UpdateProduct = () => {
  const [formValues, setFormValues] = useState(defaultValues);
  const dispatch = useDispatch();
  const {state} = useLocation();
  const navigate = useNavigate();

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
      };
      setFormValues(data);
    } else {
      navigate(-1);
    }
    return () => {

    };
  }, []);

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
      user_id: formValues.product_user_id,
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

  const fields = [
    {
      id: 'product_code',
      label: 'Code',
      onChange: handleInputChange,
      value: formValues.product_code,
    },
    {
      id: 'product_name',
      label: 'Name',
      onChange: handleInputChange,
      value: formValues.product_name,
    },
    {
      id: 'product_unit_in_stock',
      label: 'Unit in Stock',
      onChange: handleInputChange,
      value: formValues.product_unit_in_stock,
    },
    {
      id: 'product_disc_percentage',
      label: 'Disc Percentage',
      onChange: handleInputChange,
      value: formValues.product_disc_percentage,
    },
    {
      id: 'product_unit_price',
      label: 'Unit Price',
      onChange: handleInputChange,
      value: formValues.product_unit_price,
    },
    {
      id: 'product_re_order_level',
      label: 'Re-Order Level',
      onChange: handleInputChange,
      value: formValues.product_re_order_level,
    },
  ];

  return (
    <PaperContainer elevation={3} square>
      <TitleWithDivider>Update Product</TitleWithDivider>
      <SubHeader>
        <BasicInput fields={fields} onSubmit={handleSubmit}>
          <FormControlContainer>
            <InputLabel id="product_unit_id_label">Product Unit</InputLabel>
            <Select
              labelId="product_unit_id_label"
              id="product_unit_id"
              name="product_unit_id"
              label="Product Unit"
              value={formValues.product_unit_id}
              onChange={handleInputChange}
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={11}>asd</MenuItem>
              <MenuItem value={12}>dsa</MenuItem>
            </Select>
          </FormControlContainer>
          <FormControlContainer>
            <InputLabel
              id="product_category_id_label"
            >
                Product Category
            </InputLabel>
            <Select
              labelId="product_category_id_label"
              id="product_category_id"
              name="product_category_id"
              label="Product Unit"
              value={formValues.product_category_id}
              onChange={handleInputChange}
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={11}>asd</MenuItem>
              <MenuItem value={12}>dsa</MenuItem>
            </Select>
          </FormControlContainer>
          <FormControlContainer>
            <InputLabel
              id="product_user_id_label"
            >
                User
            </InputLabel>
            <Select
              labelId="product_user_id_label"
              id="product_user_id"
              name="product_user_id"
              label="Product Unit"
              value={formValues.product_user_id}
              onChange={handleInputChange}
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={11}>asd</MenuItem>
              <MenuItem value={12}>dsa</MenuItem>
            </Select>
          </FormControlContainer>
        </BasicInput>
      </SubHeader>
    </PaperContainer>
  );
};

export default UpdateProduct;

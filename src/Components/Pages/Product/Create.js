// /* eslint-disable */
import {InputLabel, MenuItem, Select} from '@mui/material';
import React, {useState} from 'react';
import {
  FormControlContainer,
  PaperContainer,
  SubHeader,
  Title,
} from '../../../layout';
import BasicInput from '../../BasicInput';

const defaultValues = {
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

const CreateProduct = () => {
  const [formValues, setFormValues] = useState(defaultValues);

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
      <Title>Create Product</Title>
      <SubHeader>
        <BasicInput fields={fields} onSubmit={null}>
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

export default CreateProduct;

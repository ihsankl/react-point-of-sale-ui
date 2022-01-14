// /* eslint-disable */
import {InputLabel, MenuItem, Select, TextField} from '@mui/material';
import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import {
  FormControlContainer,
  PaperContainer,
  SubHeader,
  TitleWithDivider,
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
  product_user_id: 1,
};

const CreateProduct = () => {
  const dispatch = useDispatch();
  const ProductUnit = useSelector((state) => state.ProductUnit);
  const ProductUnitData = ProductUnit.data?.data ?? [];
  const Category = useSelector((state) => state.Category);
  const CategoryData = Category.data?.data ?? [];
  const [formValues, setFormValues] = useState(defaultValues);

  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
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
      user_id: formValues.product_user_id,
    };
    dispatch(createProduct(data));
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
      <TitleWithDivider>Create Product</TitleWithDivider>
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
              {ProductUnitData.map((item) => (
                <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
              ))}
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
              {CategoryData.map((item) => (
                <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
              ))}
            </Select>
          </FormControlContainer>
          <FormControlContainer>
            <TextField
              id={'product_user_id'}
              label={'User'}
              name={'product_user_id'}
              defaultValue={formValues.product_user_id}
              disabled
              variant="outlined"
              fullWidth
            />
          </FormControlContainer>
        </BasicInput>
      </SubHeader>
    </PaperContainer>
  );
};

export default CreateProduct;

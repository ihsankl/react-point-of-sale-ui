import {DesktopDatePicker, LocalizationProvider} from '@mui/lab';
import {InputLabel, MenuItem, Select, TextField} from '@mui/material';
import DateAdapter from '@mui/lab/AdapterDayjs';
import React, {useState} from 'react';
import {
  FormControlContainer,
  PaperContainer,
  SubHeader,
  TitleWithDivider,
} from '../../../layout';
import BasicInput from '../../BasicInput';

const defaultValues = {
  receive_product_qty: '',
  receive_product_sub_total: '',
  receive_product_receive_date: new Date(),
  receive_product_unit_price: '',
  receive_product_product_id: '',
  receive_product_user_id: 1,
  receive_product_supplier_id: '',
};

const CreateReceiveProduct = () => {
  const [formValues, setFormValues] = useState(defaultValues);

  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleDateChange = (newValue) => {
    const value = {...formValues};
    value.receive_product_receive_date = newValue;
    setFormValues(value);
  };

  const fields = [
    {
      id: 'receive_product_qty',
      label: 'Quantity',
      onChange: handleInputChange,
      value: formValues.receive_product_qty,
    },
    {
      id: 'receive_product_sub_total',
      label: 'Sub Total',
      onChange: handleInputChange,
      value: formValues.receive_product_sub_total,
    },
    {
      id: 'receive_product_unit_price',
      label: 'Unit Price',
      onChange: handleInputChange,
      value: formValues.receive_product_unit_price,
    },
  ];

  return (
    <PaperContainer elevation={3} square>
      <TitleWithDivider>Create Receive Product</TitleWithDivider>
      <SubHeader>
        <BasicInput fields={fields} onSubmit={()=> console.log(formValues)}>
          <FormControlContainer>
            <LocalizationProvider dateAdapter={DateAdapter}>
              <DesktopDatePicker
                label="Receive Date"
                labelId="receive_product_receive_date_label"
                inputFormat="YYYY-DD-MM"
                name="receive_product_receive_date"
                mask='____-__-__'
                id="receive_product_receive_date"
                value={formValues.receive_product_receive_date}
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
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={11}>asd</MenuItem>
              <MenuItem value={12}>dsa</MenuItem>
            </Select>
          </FormControlContainer>
          <FormControlContainer>
            <InputLabel
              id="receive_product_product_id_label"
            >
                Product
            </InputLabel>
            <Select
              labelId="receive_product_product_id_label"
              id="receive_product_product_id"
              name="receive_product_product_id"
              label="Product"
              value={formValues.receive_product_product_id}
              onChange={handleInputChange}
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={11}>asd</MenuItem>
              <MenuItem value={12}>dsa</MenuItem>
            </Select>
          </FormControlContainer>
          <FormControlContainer>
            <TextField
              id={'receive_product_user_id'}
              label={'User'}
              name={'receive_product_user_id'}
              defaultValue={formValues.receive_product_user_id}
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

export default CreateReceiveProduct;

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
  purchase_order_qty: '',
  purchase_order_sub_total: '',
  purchase_order_order_date: new Date(),
  purchase_order_unit_price: '',
  purchase_order_product_id: '',
  purchase_order_user_id: 1,
  purchase_order_supplier_id: '',
};

const UpdatePurchaseOrder = () => {
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
    value.purchase_order_order_date = newValue;
    setFormValues(value);
  };

  const fields = [
    {
      id: 'purchase_order_qty',
      label: 'Quantity',
      onChange: handleInputChange,
      value: formValues.purchase_order_qty,
    },
    {
      id: 'purchase_order_sub_total',
      label: 'Sub Total',
      onChange: handleInputChange,
      value: formValues.purchase_order_sub_total,
    },
    {
      id: 'purchase_order_unit_price',
      label: 'Unit Price',
      onChange: handleInputChange,
      value: formValues.purchase_order_unit_price,
    },
  ];

  return (
    <PaperContainer elevation={3} square>Supplier
      <TitleWithDivider>Create Purchase Order</TitleWithDivider>
      <SubHeader>
        <BasicInput fields={fields} onSubmit={null}>
          <FormControlContainer>
            <LocalizationProvider dateAdapter={DateAdapter}>
              <DesktopDatePicker
                label="Order Date"
                labelId="purchase_order_order_date_label"
                inputFormat="YYYY-MM-DD"
                mask='____-__-__'
                name="purchase_order_order_date"
                id="purchase_order_order_date"
                value={formValues.purchase_order_order_date}
                onChange={handleDateChange}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </FormControlContainer>
          <FormControlContainer>
            <InputLabel
              id="purchase_order_supplier_id_label"
            >
                Supplier
            </InputLabel>
            <Select
              labelId="purchase_order_supplier_id_label"
              id="purchase_order_supplier_id"
              name="purchase_order_supplier_id"
              label="Supplier"
              value={formValues.purchase_order_supplier_id}
              onChange={handleInputChange}
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={11}>asd</MenuItem>
              <MenuItem value={12}>dsa</MenuItem>
            </Select>
          </FormControlContainer>
          <FormControlContainer>
            <InputLabel
              id="purchase_order_product_id_label"
            >
                Product
            </InputLabel>
            <Select
              labelId="purchase_order_product_id_label"
              id="purchase_order_product_id"
              name="purchase_order_product_id"
              label="Product"
              value={formValues.purchase_order_product_id}
              onChange={handleInputChange}
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={11}>asd</MenuItem>
              <MenuItem value={12}>dsa</MenuItem>
            </Select>
          </FormControlContainer>
          <FormControlContainer>
            <TextField
              id={'purchase_order_user_id'}
              label={'User'}
              name={'purchase_order_user_id'}
              defaultValue={formValues.purchase_order_user_id}
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

export default UpdatePurchaseOrder;

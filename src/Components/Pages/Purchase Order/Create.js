import {DesktopDatePicker, LocalizationProvider} from '@mui/lab';
import {
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import DateAdapter from '@mui/lab/AdapterDayjs';
import React, {useState} from 'react';
import {
  FormControlContainer,
  PaperContainer,
  SubHeader,
  TitleWithDivider,
} from '../../../layout';
import BasicInput from '../../BasicInput';
import {useDispatch, useSelector} from 'react-redux';
import {createPurchaseOrder} from '../../../Redux/Slicer/Purchase Order';
import dayjs from 'dayjs';
import {isNumber} from '../../../helper';

const defaultValues = {
  purchase_order_qty: '',
  purchase_order_sub_total: '',
  purchase_order_order_date: new Date(),
  purchase_order_unit_price: '',
  purchase_order_product_id: '',
  purchase_order_user_id: 1,
  purchase_order_supplier_id: '',
};

const CreatePurchaseOrder = () => {
  const [formValues, setFormValues] = useState(defaultValues);

  const dispatch = useDispatch();
  const Supplier = useSelector((state) => state.Supplier);
  const SupplierData = Supplier.data?.data ?? [];
  const Product = useSelector((state) => state.Product);
  const ProductData = Product.data?.data ?? [];

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

  const handleSubmit = () => {
    const data = {
      qty: formValues.purchase_order_qty,
      sub_total: formValues.purchase_order_sub_total,
      // eslint-disable-next-line max-len
      order_date: dayjs(formValues.purchase_order_order_date).format('YYYY-MM-DD'),
      unit_price: formValues.purchase_order_unit_price,
      product_id: formValues.purchase_order_product_id,
      user_id: formValues.purchase_order_user_id,
      supplier_id: formValues.purchase_order_supplier_id,
    };
    dispatch(createPurchaseOrder(data));
  };

  const fields = [
    {
      id: 'purchase_order_qty',
      label: 'Quantity',
      onChange: handleInputChange,
      value: formValues.purchase_order_qty,
      error: !isNumber(formValues.purchase_order_qty),
      helperText: isNumber(formValues.purchase_order_qty) ?
        '' : 'Please enter a valid number',
    },
    {
      id: 'purchase_order_sub_total',
      label: 'Sub Total',
      onChange: handleInputChange,
      value: formValues.purchase_order_sub_total,
      error: !isNumber(formValues.purchase_order_sub_total),
      helperText: isNumber(formValues.purchase_order_sub_total) ?
        '' : 'Please enter a valid number',
    },
    {
      id: 'purchase_order_unit_price',
      label: 'Unit Price',
      onChange: handleInputChange,
      value: formValues.purchase_order_unit_price,
      error: !isNumber(formValues.purchase_order_unit_price),
      helperText: isNumber(formValues.purchase_order_unit_price) ?
        '' : 'Please enter a valid number',
    },
  ];

  return (
    <>
      <PaperContainer elevation={3} square>
        <TitleWithDivider>Create Purchase Order</TitleWithDivider>
        <SubHeader>
          <BasicInput fields={fields} onSubmit={handleSubmit}>
            <FormControlContainer>
              <LocalizationProvider dateAdapter={DateAdapter}>
                <DesktopDatePicker
                  label="Order Date"
                  labelId="purchase_order_order_date_label"
                  inputFormat="YYYY-DD-MM"
                  name="purchase_order_order_date"
                  mask='____-__-__'
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
                error={!formValues.purchase_order_supplier_id}
                labelId="purchase_order_supplier_id_label"
                id="purchase_order_supplier_id"
                name="purchase_order_supplier_id"
                label="Supplier"
                value={formValues.purchase_order_supplier_id}
                onChange={handleInputChange}
              >
                {SupplierData.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
              {!formValues.purchase_order_supplier_id &&
              <FormHelperText error={!formValues.purchase_order_supplier_id}>
                Supplier ID is required
              </FormHelperText>
              }
            </FormControlContainer>
            <FormControlContainer>
              <InputLabel
                id="purchase_order_product_id_label"
              >
                Product
              </InputLabel>
              <Select
                error={!formValues.purchase_order_product_id}
                labelId="purchase_order_product_id_label"
                id="purchase_order_product_id"
                name="purchase_order_product_id"
                label="Product"
                value={formValues.purchase_order_product_id}
                onChange={handleInputChange}
              >
                {ProductData.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
              {!formValues.purchase_order_product_id &&
              <FormHelperText error={!formValues.purchase_order_product_id}>
                Product ID is required
              </FormHelperText>
              }
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
    </>
  );
};

export default CreatePurchaseOrder;

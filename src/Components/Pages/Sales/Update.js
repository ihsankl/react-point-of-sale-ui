import {FormHelperText, InputLabel, MenuItem, Select} from '@mui/material';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useLocation, useNavigate} from 'react-router-dom';
import {isNumber} from '../../../helper';
import {
  SubHeader,
  PaperContainer,
  TitleWithDivider,
  FormControlContainer,
} from '../../../layout';
import {updateSales} from '../../../Redux/Slicer/Sales';
import BasicInput from '../../BasicInput';

const defaultValues = {
  sales_id: 0,
  sales_qty: 0,
  sales_unit_price: 0,
  sales_sub_total: 0,
  sales_invoice_id: 0,
  sales_product_id: 0,
};

const UpdateSales = () => {
  const [formValues, setFormValues] = useState(defaultValues);
  const dispatch = useDispatch();
  const {state} = useLocation();
  const navigate = useNavigate();
  const InvoiceState = useSelector((state) => state.Invoice);
  const ProductState = useSelector((state) => state.Product);
  const InvoiceStateData = InvoiceState.data?.data ?? [];
  const ProductStateData = ProductState.data?.data ?? [];

  useEffect(() => {
    if (!!state) {
      const data = {
        sales_id: state.data[0].id,
        sales_qty: state.data[0].qty,
        sales_unit_price: state.data[0].unit_price,
        sales_sub_total: state.data[0].sub_total,
        sales_invoice_id: state.data[0].invoice_id,
        sales_product_id: state.data[0].product_id,
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
      id: formValues.sales_id,
      qty: formValues.sales_qty,
      unit_price: formValues.sales_unit_price,
      sub_total: formValues.sales_sub_total,
      invoice_id: formValues.sales_invoice_id,
      product_id: formValues.sales_product_id,
    };
    dispatch(updateSales(data));
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
      id: 'sales_qty',
      label: 'Quantity',
      onChange: handleInputChange,
      value: formValues.sales_qty,
      error: !isNumber(formValues.sales_qty),
      helperText: !isNumber(formValues.sales_qty) ?
      'Quantity must be a number!' : '',
    },
    {
      id: 'sales_unit_price',
      label: 'Unit Price',
      onChange: handleInputChange,
      value: formValues.sales_unit_price,
      error: !isNumber(formValues.sales_unit_price),
      helperText: !isNumber(formValues.sales_unit_price) ?
        'Unit Price must be a number!' : '',
    },
    {
      id: 'sales_sub_total',
      label: 'Sub Total',
      onChange: handleInputChange,
      value: formValues.sales_sub_total,
      error: !isNumber(formValues.sales_sub_total),
      helperText: !isNumber(formValues.sales_sub_total) ?
        'Sub Total must be a number!' : '',
    },
  ];

  return (
    <>
      <PaperContainer elevation={3} square>
        <TitleWithDivider>Update Sales</TitleWithDivider>
        <SubHeader>
          <BasicInput isUpdate fields={fields} onSubmit={handleSubmit}>
            <FormControlContainer>
              <InputLabel
                id="sales_product_id_label"
              >
                Product
              </InputLabel>
              <Select
                error={!formValues.sales_product_id}
                labelId="sales_product_id_label"
                id="sales_product_id"
                name="sales_product_id"
                label="Product"
                value={formValues.sales_product_id}
                onChange={handleInputChange}
              >
                {ProductStateData.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
              {!formValues.sales_product_id &&
              <FormHelperText error={!formValues.sales_product_id}>
                Product ID is required
              </FormHelperText>
              }
            </FormControlContainer>
            <FormControlContainer>
              <InputLabel
                id="sales_invoice_id_label"
              >
                Invoice ID
              </InputLabel>
              <Select
                error={!formValues.sales_invoice_id}
                labelId="sales_invoice_id_label"
                id="sales_invoice_id"
                name="sales_invoice_id"
                label="Product"
                value={formValues.sales_invoice_id}
                onChange={handleInputChange}
              >
                {InvoiceStateData.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.id}
                  </MenuItem>
                ))}
              </Select>
              {!formValues.sales_invoice_id &&
              <FormHelperText error={!formValues.sales_invoice_id}>
                Invoice ID is required!
              </FormHelperText>
              }
            </FormControlContainer>
          </BasicInput>
        </SubHeader>
      </PaperContainer>
    </>
  );
};

export default UpdateSales;

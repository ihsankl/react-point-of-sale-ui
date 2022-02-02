import {FormHelperText, InputLabel, MenuItem, Select} from '@mui/material';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {isNumber} from '../../../helper';
import {
  SubHeader,
  PaperContainer,
  TitleWithDivider,
  FormControlContainer,
} from '../../../layout';
import {unsetMountPage} from '../../../Redux/Slicer/AppState';
import {getProduct} from '../../../Redux/Slicer/Product';
import {clearSuccess, createSales} from '../../../Redux/Slicer/Sales';
import BasicInput from '../../BasicInput';

const defaultValues = {
  sales_qty: 0,
  sales_unit_price: 0,
  sales_sub_total: 0,
  sales_product_id: 0,
};

const CreateSales = () => {
  const dispatch = useDispatch();
  const ProductState = useSelector((state) => state.Product);
  const SalesState = useSelector((state) => state.Sales);
  const ProductStateData = ProductState.data?.data ?? [];
  const [formValues, setFormValues] = useState(defaultValues);
  const [mount, setmount] = useState(false);

  useEffect(() => {
    if (!mount && !ProductStateData.length) {
      initProduct();
      setmount(true);
    }

    return () => {

    };
  }, [mount]);

  const initProduct = async () => {
    await dispatch(getProduct()).unwrap();
  };

  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  React.useEffect(() => {
    if (SalesState.isSuccess) {
      dispatch(setSuccess());
      dispatch(unsetMountPage('sales'));
      setTimeout(() => {
        dispatch(clearSuccess());
      }, 5000);
    }

    return () => {

    };
  }, [SalesState]);

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

  const handleSubmit = () => {
    const data = {
      qty: formValues.sales_qty,
      unit_price: formValues.sales_unit_price,
      sub_total: formValues.sales_sub_total,
      invoice_id: formValues.sales_invoice_id,
      product_id: formValues.sales_product_id,
    };
    dispatch(createSales(data));
  };

  return (
    <>
      <PaperContainer elevation={3} square>
        <TitleWithDivider>Create Sales</TitleWithDivider>
        <SubHeader>
          <BasicInput fields={fields} onSubmit={handleSubmit}>
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
          </BasicInput>
        </SubHeader>
      </PaperContainer>
    </>
  );
};

export default CreateSales;

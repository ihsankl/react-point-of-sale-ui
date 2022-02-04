import {Remove} from '@mui/icons-material';
import {Autocomplete, Button, FormHelperText, TextField} from '@mui/material';
import {Box} from '@mui/system';
import React, {Fragment, useState} from 'react';
import {FormControlContainer} from '../../../layout';
import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';
import {isNumber} from '../../../helper';

const Products = ({
  handleChange,
  handleRemove,
  index,
  value,
  setProductFields,
  productFields,
}) => {
  const ProductState = useSelector((state) => state.Product);
  const ProductStateData = ProductState.data?.data ?? [];
  const [productValue, setProductValue] = useState('');

  return (
    <Fragment>
      <Box
        sx={{
          display: 'flex',
          gap: '1em',
          width: '100%',
        }}
      >
        <FormControlContainer sx={{width: '100%'}}>
          <TextField
            error={!isNumber(value.qty)}
            name="qty"
            label="Quantity"
            variant="outlined"
            fullWidth
            value={value.qty}
            onChange={(event) => handleChange(index, event)}
          />
          {!isNumber(value.qty) &&
            <FormHelperText error={!isNumber(value.qty)}>
                Quantity must be a number
            </FormHelperText>
          }
        </FormControlContainer>
        <FormControlContainer sx={{width: '100%'}}>
          <TextField
            error={!isNumber(value.unit_price)}
            name="unit_price"
            label="Unit Price"
            variant="outlined"
            fullWidth
            value={value.unit_price}
            onChange={(event) => handleChange(index, event)}
          />
          {!isNumber(value.unit_price) &&
            <FormHelperText error={!isNumber(value.unit_price)}>
                Unit Price must be a number
            </FormHelperText>
          }
        </FormControlContainer>
        <FormControlContainer sx={{width: '100%'}}>
          <TextField
            error={!isNumber(value.sub_total)}
            name="sub_total"
            label="Sub Total"
            variant="outlined"
            fullWidth
            value={value.sub_total}
            onChange={(event) => handleChange(index, event)}
          />
          {!isNumber(value.sub_total) &&
            <FormHelperText error={!isNumber(value.sub_total)}>
                Sub Total must be a number
            </FormHelperText>
          }
        </FormControlContainer>
        <FormControlContainer sx={{width: '100%'}}>
          <Autocomplete
            value={productValue}
            onChange={(event, newValue) => {
              const valueTemp = [...productFields];
              valueTemp[index].product_id = newValue?.id;
              setProductValue(newValue?.name);
              // eslint-disable-next-line max-len
              valueTemp[index].name = event.target.value;
              setProductFields(valueTemp);
            }}
            name="product_id"
            id="product_id_label"
            options={ProductStateData.map((item) => {
              return {
                ...item, label: `${item.name}`,
              };
            })}
            // eslint-disable-next-line max-len
            renderInput={(params) => <TextField error={!value.product_id} {...params} label="Product" />}
          />
          {!value.product_id &&
          // eslint-disable-next-line max-len
          <FormHelperText error={!value.product_id}>
            Product is Required
          </FormHelperText>
          }
        </FormControlContainer>
        <Button
          variant="text"
          color="primary"
          onClick={() => handleRemove(index)}
          startIcon={<Remove />}
        >
        </Button>
      </Box>
    </Fragment>
  );
};

Products.propTypes = {
  handleChange: PropTypes.func,
  handleRemove: PropTypes.func,
  index: PropTypes.number,
  value: PropTypes.object,
  setProductFields: PropTypes.func,
  productFields: PropTypes.array,
};

export default Products;

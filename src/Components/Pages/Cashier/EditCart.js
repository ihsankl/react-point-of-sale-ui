import {Add, Remove} from '@mui/icons-material';
import {IconButton} from '@mui/material';
import {Box} from '@mui/system';
import React from 'react';
import {useDispatch} from 'react-redux';
import {downItem, upItem} from '../../../Redux/Slicer/Cashier';
import PropTypes from 'prop-types';

const EditCart = ({params}) => {
  const dispatch = useDispatch();
  return (
    <Box
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
      <IconButton
        onClick={() => {
          const data = {
            qty: 1,
            unit_price: params.row.unit_price,
            product_id: params.row.product_id,
          };
          dispatch(upItem(data));
        }}
        color="inherit"
      >
        <Add />
      </IconButton>
      {params.value}
      <IconButton
        onClick={() => {
          const data = {
            qty: 1,
            unit_price: params.row.unit_price,
            product_id: params.row.product_id,
          };
          dispatch(downItem(data));
        }}
        color="inherit"
      >
        <Remove />
      </IconButton>
    </Box>
  );
};

EditCart.propTypes = {
  params: PropTypes.object.isRequired,
};


export default EditCart;

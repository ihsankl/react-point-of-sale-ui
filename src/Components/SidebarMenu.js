import React from 'react';
import {
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  ShoppingCart,
  Receipt,
  PersonAdd,
  ShoppingBasket,
  Category,
  ListAlt,
} from '@mui/icons-material';
import {capitalize} from '../helper';
import {useNavigate} from 'react-router-dom';

const SidebarMenu = () => {
  const navigate = useNavigate();

  return (
    <>
      <ListItem
        button
      >
        <ListItemIcon>
          <Receipt />
        </ListItemIcon>
        <ListItemText primary={capitalize('sales')} />
      </ListItem>

      <ListItem
        button
        onClick={() => navigate('/customer')}
      >
        <ListItemIcon>
          <PersonAdd />
        </ListItemIcon>
        <ListItemText primary={capitalize('customer')} />
      </ListItem>

      <ListItem
        button
        onClick={() => navigate('/invoice')}
      >
        <ListItemIcon>
          <Receipt />
        </ListItemIcon>
        <ListItemText primary={capitalize('invoice')} />
      </ListItem>

      <ListItem
        button
        onClick={() => navigate('/product')}
      >
        <ListItemIcon>
          <ShoppingBasket />
        </ListItemIcon>
        <ListItemText primary={capitalize('product')} />
      </ListItem>

      <ListItem
        button
        onClick={() => navigate('/product_category')}
      >
        <ListItemIcon>
          <Category />
        </ListItemIcon>
        <ListItemText primary={capitalize('product_category')} />
      </ListItem>

      <ListItem
        button
        onClick={() => navigate('/product_unit')}
      >
        <ListItemIcon>
          <ListAlt />
        </ListItemIcon>
        <ListItemText primary={capitalize('product_unit')} />
      </ListItem>

      <ListItem
        button
        onClick={() => navigate('/purchase_order')}
      >
        <ListItemIcon>
          <ShoppingCart />
        </ListItemIcon>
        <ListItemText primary={capitalize('purchase_order')} />
      </ListItem>

      <ListItem
        button
        onClick={() => navigate('/receive_product')}
      >
        <ListItemIcon>
          <Receipt />
        </ListItemIcon>
        <ListItemText primary={capitalize('receive_product')} />
      </ListItem>

      <ListItem
        button
        onClick={() => navigate('/supplier')}
      >
        <ListItemIcon>
          <PersonAdd />
        </ListItemIcon>
        <ListItemText primary={capitalize('supplier')} />
      </ListItem>

    </>

  );
};

export default SidebarMenu;

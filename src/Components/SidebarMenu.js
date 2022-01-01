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


const SidebarMenu = () => {
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
      >
        <ListItemIcon>
          <PersonAdd />
        </ListItemIcon>
        <ListItemText primary={capitalize('customer')} />
      </ListItem>

      <ListItem
        button
      >
        <ListItemIcon>
          <Receipt />
        </ListItemIcon>
        <ListItemText primary={capitalize('invoice')} />
      </ListItem>

      <ListItem
        button
      >
        <ListItemIcon>
          <ShoppingBasket />
        </ListItemIcon>
        <ListItemText primary={capitalize('product')} />
      </ListItem>

      <ListItem
        button
      >
        <ListItemIcon>
          <Category />
        </ListItemIcon>
        <ListItemText primary={capitalize('product_category')} />
      </ListItem>

      <ListItem
        button
      >
        <ListItemIcon>
          <ListAlt />
        </ListItemIcon>
        <ListItemText primary={capitalize('product_unit')} />
      </ListItem>

      <ListItem
        button
      >
        <ListItemIcon>
          <ShoppingCart />
        </ListItemIcon>
        <ListItemText primary={capitalize('purchase_order')} />
      </ListItem>

      <ListItem
        button
      >
        <ListItemIcon>
          <Receipt />
        </ListItemIcon>
        <ListItemText primary={capitalize('receive_product')} />
      </ListItem>

      <ListItem
        button
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

import React from 'react';
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from '@mui/material';
import {
  ShoppingCart,
  Receipt,
  PersonAdd,
  Category,
  ListAlt,
  Article,
  Summarize,
} from '@mui/icons-material';
import {capitalize} from '../helper';
import {useLocation, useNavigate} from 'react-router-dom';

const SidebarMenu = () => {
  const navigate = useNavigate();
  // revert menu button color if the user is on the same page or it's subpage
  const location = useLocation();
  const isActive = (path) => {
    return location.pathname.includes(path);
  };

  const contrastButton = (theme, path) => {
    return {
      // eslint-disable-next-line quote-props
      backgroundColor: isActive(path) ?
      theme.palette.primary.main : theme.palette.primary.contrastText,
      '&:hover': {
        backgroundColor: isActive(path) ?
        theme.palette.primary.main : theme.palette.primary.contrastText,
      },
    };
  };

  const contrastIcon = (theme, path) => {
    return {
      color: isActive(path) ?
      theme.palette.primary.contrastText : theme.palette.text.secondary,
    };
  };

  return (
    <>
      <ListItem
        button
        sx={(theme)=> contrastButton(theme, '/cashier')}
        onClick={() => navigate('/cashier')}
      >
        <ListItemIcon>
          <Receipt sx={(theme)=> contrastIcon(theme, '/cashier')} />
        </ListItemIcon>
        <ListItemText
          sx={(theme)=> contrastIcon(theme, '/cashier')}
          primary={capitalize('cashier')}
        />
      </ListItem>

      <ListSubheader>MASTER</ListSubheader>
      <ListItem
        button
        sx={(theme)=> contrastButton(theme, '/customer')}
        onClick={() => navigate('/customer')}
      >
        <ListItemIcon>
          <PersonAdd sx={(theme)=> contrastIcon(theme, '/customer')} />
        </ListItemIcon>
        <ListItemText
          sx={(theme)=> contrastIcon(theme, '/customer')}
          primary={capitalize('customer')}
        />
      </ListItem>

      <ListItem
        button
        sx={(theme)=> contrastButton(theme, '/invoice')}
        onClick={() => navigate('/invoice')}
      >
        <ListItemIcon>
          <Receipt
            sx={(theme)=> contrastIcon(theme, '/invoice')}
          />
        </ListItemIcon>
        <ListItemText
          sx={(theme)=> contrastIcon(theme, '/invoice')}
          primary={capitalize('invoice')} />
      </ListItem>

      <ListItem
        button
        sx={(theme)=> contrastButton(theme, '/sales')}
        onClick={() => navigate('/sales')}
      >
        <ListItemIcon>
          <ShoppingCart
            sx={(theme)=> contrastIcon(theme, '/sales')}
          />
        </ListItemIcon>
        <ListItemText
          sx={(theme)=> contrastIcon(theme, '/sales')}
          primary={capitalize('sales')} />
      </ListItem>

      <ListItem
        button
        sx={(theme)=> contrastButton(theme, '/product')}
        onClick={() => navigate('/product')}
      >
        <ListItemIcon>
          <ShoppingCart sx={(theme)=> contrastIcon(theme, '/product')} />
        </ListItemIcon>
        <ListItemText
          sx={(theme)=> contrastIcon(theme, '/product')}
          primary={capitalize('product')} />
      </ListItem>

      <ListItem
        button
        sx={(theme)=> contrastButton(theme, '/category')}
        onClick={() => navigate('/category')}
      >
        <ListItemIcon>
          <Category
            sx={(theme)=> contrastIcon(theme, '/category')}
          />
        </ListItemIcon>
        <ListItemText
          sx={(theme)=> contrastIcon(theme, '/category')}
          primary={capitalize('category')} />
      </ListItem>

      <ListItem
        button
        sx={(theme)=> contrastButton(theme, '/unit')}
        onClick={() => navigate('/unit')}
      >
        <ListItemIcon>
          <ListAlt
            sx={(theme)=> contrastIcon(theme, '/unit')}
          />
        </ListItemIcon>
        <ListItemText
          sx={(theme)=> contrastIcon(theme, '/unit')}
          primary={capitalize('unit')} />
      </ListItem>

      <ListItem
        button
        sx={(theme)=> contrastButton(theme, '/purchase_order')}
        onClick={() => navigate('/purchase_order')}
      >
        <ListItemIcon>
          <ShoppingCart
            sx={(theme)=> contrastIcon(theme, '/purchase_order')}
          />
        </ListItemIcon>
        <ListItemText
          sx={(theme)=> contrastIcon(theme, '/purchase_order')}
          primary={capitalize('purchase_order')} />
      </ListItem>

      <ListItem
        button
        sx={(theme)=> contrastButton(theme, '/receive_product')}
        onClick={() => navigate('/receive_product')}
      >
        <ListItemIcon>
          <Receipt
            sx={(theme)=> contrastIcon(theme, '/receive_product')}
          />
        </ListItemIcon>
        <ListItemText
          sx={(theme)=> contrastIcon(theme, '/receive_product')}
          primary={capitalize('receive_product')} />
      </ListItem>

      <ListItem
        button
        sx={(theme)=> contrastButton(theme, '/supplier')}
        onClick={() => navigate('/supplier')}
      >
        <ListItemIcon>
          <PersonAdd
            sx={(theme)=> contrastIcon(theme, '/supplier')}
          />
        </ListItemIcon>
        <ListItemText
          sx={(theme)=> contrastIcon(theme, '/supplier')}
          primary={capitalize('supplier')} />
      </ListItem>

      <ListSubheader>REPORT</ListSubheader>
      <ListItem
        button
        sx={(theme)=> contrastButton(theme, '/report_sales')}
        onClick={() => navigate('/report_sales')}
      >
        <ListItemIcon>
          <Article
            sx={(theme)=> contrastIcon(theme, '/report_sales')}
          />
        </ListItemIcon>
        <ListItemText
          sx={(theme)=> contrastIcon(theme, '/report_sales')}
          primary={capitalize('report_sales')} />
      </ListItem>

      <ListItem
        button
        sx={(theme)=> contrastButton(theme, '/daily_report')}
        onClick={() => navigate('/daily_report')}
      >
        <ListItemIcon>
          <Summarize
            sx={(theme)=> contrastIcon(theme, '/daily_report')}
          />
        </ListItemIcon>
        <ListItemText
          sx={(theme)=> contrastIcon(theme, '/daily_report')}
          primary={capitalize('daily_report')} />
      </ListItem>

    </>

  );
};

export default SidebarMenu;

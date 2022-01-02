import {
  PersonAdd,
  Receipt,
  ShoppingBasket,
  Category,
  ListAlt,
  ShoppingCart,
} from '@mui/icons-material';
import React from 'react';

/**
 * EXAMPLE OF JSDOCS
 * Adds two numbers together.
 * @param {int} num1 The first number.
 * @param {int} num2 The second number.
 * @returns {int} The sum of the two numbers.
 */
// menu builder
export const menus =[
  {
    name: 'sales',
    icon: <Receipt />,
  },
  {
    name: 'customer',
    icon: <PersonAdd />,
  },
  {
    name: 'invoice',
    icon: <Receipt />,
  },
  {
    name: 'product',
    icon: <ShoppingBasket />,
  },
  {
    name: 'product_category',
    icon: <Category />,
  },
  {
    name: 'product_unit',
    icon: <ListAlt />,
  },
  {
    name: 'purchase_order',
    icon: <ShoppingCart />,
  },
  {
    name: 'receive_product',
    icon: <Receipt />,
  },
  {
    name: 'supplier',
    icon: <PersonAdd />,
  },
];

/**
 * replace _ with space
 * capitalize first letter for each word
 * @param {string} str The string you want to capitalize.
 * @return {string} The result.
 */
export const capitalize = (str) => {
  return str.replace(/_/g, ' ').replace(/\w\S*/g, function(txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};


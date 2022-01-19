import {combineReducers} from 'redux';
import User from './User';
import Supplier from './Supplier';
import Authentication from './Authentication';
import Category from './Category';
import Product from './Product';
import Invoice from './Invoice';
import Customer from './Customer';
import ProductUnit from './Product Unit';
import PurchaseOrder from './Purchase Order';
import ReceiveProduct from './Receive Product';
import Sales from './Sales';
import ConfirmDialog from './ConfirmDialog';

const appReducer = combineReducers({
  User,
  Authentication,
  Category,
  Customer,
  Invoice,
  ProductUnit,
  Product,
  PurchaseOrder,
  ReceiveProduct,
  Sales,
  Supplier,
  ConfirmDialog,
});

export default appReducer;

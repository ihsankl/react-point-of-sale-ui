/* eslint-disable */
import React, {useState} from 'react';
import {
  Drawer, Toolbar, Box,
  List,
  AppBar,
  Typography,
  Paper,
  Button,
  TextField,
  FormControl,
} from '@mui/material';
import {
  ShoppingCart,
  Search,
} from '@mui/icons-material';
import {DataGrid} from '@mui/x-data-grid';
import Header from './Components/Header';
import SidebarMenu from './Components/SidebarMenu';
import {styled} from '@mui/material/styles';
import {Title} from './layout';
import BasicTable from './Components/BasicTable';
import BasicInput from './Components/BasicInput';
import {BrowserRouter, Navigate, Route, Routes, useLocation} from 'react-router-dom';
// Customer
import Customer from './Components/Pages/Customer/';
import CreateCustomer from './Components/Pages/Customer/Create';
import UpdateCustomer from './Components/Pages/Customer/Update';
// Product Category
import ProductCategory from './Components/Pages/Product Category/';
import CreateProductCategory from './Components/Pages/Product Category/Create';
import UpdateProductCategory from './Components/Pages/Product Category/Update';
// Product Unit
import ProductUnit from './Components/Pages/Product Unit/';
import CreateProductUnit from './Components/Pages/Product Unit/Create';
import UpdateProductUnit from './Components/Pages/Product Unit/Update';
// Supplier
import Supplier from './Components/Pages/Supplier/';
import CreateSupplier from './Components/Pages/Supplier/Create';
import UpdateSupplier from './Components/Pages/Supplier/Update';
// Product
import Product from './Components/Pages/Product/';
import CreateProduct from './Components/Pages/Product/Create';
import UpdateProduct from './Components/Pages/Product/Update';
// Invoice
import Invoice from './Components/Pages/Invoice/';
import CreateInvoice from './Components/Pages/Invoice/Create';
import UpdateInvoice from './Components/Pages/Invoice/Update';
// Purchase Order
import PurchaseOrder from './Components/Pages/Purchase Order/';
import CreatePurchaseOrder from './Components/Pages/Purchase Order/Create';
import UpdatePurchaseOrder from './Components/Pages/Purchase Order/Update';
// Receive Product
import ReceiveProduct from './Components/Pages/Receive Product/';
import CreateReceiveProduct from './Components/Pages/Receive Product/Create';
import UpdateReceiveProduct from './Components/Pages/Receive Product/Update';
// Sales
import Sales from './Components/Pages/Sales/';
import RequiredAuth from './Components/Pages/Required Auth/';
import Login from './Components/Pages/Login';

const APP_NAME = process.env.REACT_APP_NAME;

const App = ()=> {
  const [auth, setAuth] = useState(true);

  return (
    <div style={{display: 'flex'}}>
      <BrowserRouter>
        {auth &&<>
          <Header />
          <Drawer
            sx={{width: '15em'}}
            variant='permanent'
            anchor="left"
          >
            <Box
              sx={{width: '15em', paddingTop: '4em'}}
              role="presentation"
            >
              <List>
                <SidebarMenu />
              </List>
            </Box>
          </Drawer>
        </>}
        <Routes>
          <Route path="/" element={<Navigate replace to="/sales" />}/>
          <Route path="/customer" element={<RequiredAuth>
            <Customer />
          </RequiredAuth>}/>
          <Route path="/customer/create" element={<RequiredAuth>
            <CreateCustomer />
          </RequiredAuth>} />
          <Route path="/customer/update/:id" element={<RequiredAuth>
            <UpdateCustomer />
          </RequiredAuth>} />

          {/* product category routes */}
          <Route path="/category" element={<RequiredAuth>
            <ProductCategory />
          </RequiredAuth>}/>
          <Route path="/category/create" element={<RequiredAuth>
            <CreateProductCategory />
          </RequiredAuth>} />
          <Route path="/category/update/:id" element={<RequiredAuth>
            <UpdateProductCategory />
          </RequiredAuth>} />

          {/* product unit routes */}
          <Route path="/unit" element={<RequiredAuth>
            <ProductUnit />
          </RequiredAuth>}/>
          <Route path="/unit/create" element={<RequiredAuth>
            <CreateProductUnit />
          </RequiredAuth>} />
          <Route path="/unit/update/:id" element={<RequiredAuth>
            <UpdateProductUnit />
          </RequiredAuth>} />

          {/* supplier routes */}
          <Route path="/supplier" element={<RequiredAuth>
            <Supplier />
          </RequiredAuth>}/>
          <Route path="/supplier/create" element={<RequiredAuth>
            <CreateSupplier />
          </RequiredAuth>} />
          <Route path="/supplier/update/:id" element={<RequiredAuth>
            <UpdateSupplier />
          </RequiredAuth>} />

          {/* product routes */}
          <Route path="/product" element={<RequiredAuth>
            <Product/>
          </RequiredAuth>}/>
          <Route path="/product/create" element={<RequiredAuth>
            <CreateProduct/>
          </RequiredAuth>}/>
          <Route path="/product/update/:id" element={<RequiredAuth>
            <UpdateProduct/>
          </RequiredAuth>}/>

          {/* invoice routes */}
          <Route path="/invoice" element={<RequiredAuth>
            <Invoice/>
          </RequiredAuth>}/>
          <Route path="/invoice/create" element={<RequiredAuth>
            <CreateInvoice/>
          </RequiredAuth>}/>
          <Route path="/invoice/update/:id" element={<RequiredAuth>
            <UpdateInvoice/>
          </RequiredAuth>}/>

          {/* purchase order routes */}
          <Route path="/purchase_order" element={<RequiredAuth>
            <PurchaseOrder/>
          </RequiredAuth>}/>
          <Route path="/purchase_order/create" element={<RequiredAuth>
            <CreatePurchaseOrder/>
          </RequiredAuth>}/>
          <Route path="/purchase_order/update/:id" element={<RequiredAuth>
            <UpdatePurchaseOrder/>
          </RequiredAuth>}/>

          {/* receive product routes */}
          <Route path="/receive_product" element={<RequiredAuth>
            <ReceiveProduct/>
          </RequiredAuth>}/>
          <Route path="/receive_product/create" element={<RequiredAuth>
            <CreateReceiveProduct/>
          </RequiredAuth>}/>
          <Route path="/receive_product/update/:id" element={<RequiredAuth>
            <UpdateReceiveProduct/>
          </RequiredAuth>}/>

          {/* sales routes */}
          <Route path="/sales" element={<RequiredAuth>
            <Sales/>
          </RequiredAuth>}/>

          {/* login */}
          <Route path="/login" element={
            auth ? <Navigate replace to="/"/> : <Login />
          }/>

          {/* redirect unmatch route */}
          <Route path="*" element={<Navigate replace to="/sales" />}/>

          {/* TODO: add sales UI. foreign key required: invoice_id, product_id */}
          {/* TODO: add reports UI */}
          {/* TODO: add 404 Not Found page */}
          {/* TODO: add keyboard shortcuts for actions:
            2. quick add/remove item
            3. print receipt
            5. press edit > edit item price > enter to get out of edit mode
           */}
          {/* TODO: give documentation for keyboard shortcuts */}
          {/* TODO: create theme customization */}
           {/* TODO: add validation for each form */}
           {/* TODO: add loading and notifications */}
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;

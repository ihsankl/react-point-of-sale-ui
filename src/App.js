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
import {BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
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

const APP_NAME = process.env.REACT_APP_NAME;

const App = ()=> {
  const [anchor, setAnchor] = useState(null);
  const [open, setOpen] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);

  return (
    <div style={{display: 'flex'}}>
      <BrowserRouter>
      <Header openDrawer={setOpen} />

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
        <Routes>
          <Route path="/" element={<Navigate replace to="/customer" />}/>
          <Route path="/customer" element={<Customer />}/>
          <Route path="/customer/create" element={<CreateCustomer />} />
          <Route path="/customer/update/:id" element={<UpdateCustomer />} />

          {/* product category routes */}
          <Route path="/product_category" element={<ProductCategory />}/>
          <Route path="/product_category/create" element={<CreateProductCategory />} />
          <Route path="/product_category/update/:id" element={<UpdateProductCategory />} />

          {/* product unit routes */}
          <Route path="/product_unit" element={<ProductUnit />}/>
          <Route path="/product_unit/create" element={<CreateProductUnit />} />
          <Route path="/product_unit/update/:id" element={<UpdateProductUnit />} />

          {/* supplier routes */}
          <Route path="/supplier" element={<Supplier />}/>
          <Route path="/supplier/create" element={<CreateSupplier />} />
          <Route path="/supplier/update/:id" element={<UpdateSupplier />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;

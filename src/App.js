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
import {BrowserRouter, Route, Redirect, Routes as Switch} from 'react-router-dom';
import Customer from './Components/Pages/Customer/';
import CreateCustomer from './Components/Pages/Customer/Create';
import UpdateCustomer from './Components/Pages/Customer/Update';
const APP_NAME = process.env.REACT_APP_NAME;

const defaultValues = {
  customer_code: '',
  customer_name: '',
  customer_address: '',
  customer_contact: '',
};

const App = ()=> {
  const [anchor, setAnchor] = useState(null);
  const [open, setOpen] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);

  return (
    <div style={{display: 'flex'}}>
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
      <BrowserRouter>
        <Switch>
          <Route exact path="/customer" element={<Customer/>}/>
        </Switch>
        <Switch>
          <Route exact path="/customer/create" element={<CreateCustomer/>}/>
        </Switch>
        <Switch>
          <Route exact path="/customer/update" element={<UpdateCustomer/>}/>
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;

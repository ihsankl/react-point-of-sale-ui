import React, {useEffect, useState} from 'react';
import {
  Drawer, Box,
  List,
  Backdrop,
  CircularProgress,
} from '@mui/material';
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
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
import Sales from './Components/Pages/Sales';
import CreateSales from './Components/Pages/Sales/Create';
import UpdateSales from './Components/Pages/Sales/Update';
// Cashier
import Cashier from './Components/Pages/Cashier';
// Misc
import RequiredAuth from './Components/Pages/Required Auth/';
import Login from './Components/Pages/Login';
import ErrorNotif from './Components/ErrorNotif';
import SuccessNotif from './Components/SuccessNotif';
import Information from './Components/Information';
import Header from './Components/Header';
import SidebarMenu from './Components/SidebarMenu';
// Reports
import ReportSales from './Components/Pages/Report Sales';

// redux thing
import {useDispatch, useSelector} from 'react-redux';
import Register from './Components/Pages/Register';
import {checkToken, clearToken} from './Redux/Slicer/Authentication';
import {setUserData} from './Redux/Slicer/AppState';

const App = ()=> {
  const [mounted, setMounted] = useState(false);
  const CustomerState = useSelector((state) => state.Customer);
  const CategoryState = useSelector((state) => state.Category);
  const ProductUnitState = useSelector((state) => state.ProductUnit);
  const SupplierState = useSelector((state) => state.Supplier);
  const ProductState = useSelector((state) => state.Product);
  const InvoiceState = useSelector((state) => state.Invoice);
  const PurchaseOrderState = useSelector((state) => state.PurchaseOrder);
  const ReceiveProductState = useSelector((state) => state.ReceiveProduct);
  const SalesState = useSelector((state) => state.Sales);
  const AuthState = useSelector((state) => state.Authentication);
  const UserState = useSelector((state) => state.User);
  const UserData = UserState.data?.data ?? [];
  const auth = AuthState.isLoggedIn;

  const dispatch = useDispatch();

  // fetch all data from server
  useEffect(() => {
    if (!mounted) {
      dispatch(checkToken());
      setMounted(true);
    }

    if (!!UserData) dispatch(setUserData(UserData[0]));

    if (AuthState.error.state) dispatch(clearToken());

    return () => {
    };
  }, [
    AuthState,
    mounted,
    UserData,
    auth,
  ]);

  const isLoading =
  CustomerState.isLoading ||
  CategoryState.isLoading ||
  ProductUnitState.isLoading ||
  SupplierState.isLoading ||
  ProductState.isLoading ||
  InvoiceState.isLoading ||
  PurchaseOrderState.isLoading ||
  ReceiveProductState.isLoading ||
  SalesState.isLoading ||
  AuthState.isLoading;

  return (
    <div style={{display: 'flex'}}>
      {/* notification snackbar */}
      <ErrorNotif/>
      <SuccessNotif/>
      {/* information snackbar on left corner */}
      <Information/>
      <Backdrop
        sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 3}}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <BrowserRouter>
        {!!auth &&<>
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
          <Route path="/" element={<Navigate replace to="/cashier" />}/>
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

          {/* cashier routes */}
          <Route path="/cashier" element={<RequiredAuth>
            <Cashier/>
          </RequiredAuth>}/>

          {/* sales routes */}
          <Route path="/sales" element={<RequiredAuth>
            <Sales/>
          </RequiredAuth>}/>
          <Route path="/sales/create" element={<RequiredAuth>
            <CreateSales/>
          </RequiredAuth>}/>
          <Route path="/sales/update/:id" element={<RequiredAuth>
            <UpdateSales/>
          </RequiredAuth>}/>

          {/* report sales routes */}
          <Route path="/report_sales" element={<RequiredAuth>
            <ReportSales/>
          </RequiredAuth>}/>

          {/* login */}
          <Route path="/login" element={
            !!auth ? <Navigate replace to="/"/> : <Login />
          }/>

          {/* register */}
          <Route path="/register" element={
            !!auth ? <Navigate replace to="/"/> : <Register />
          }/>

          {/* redirect unmatch route */}
          <Route path="*" element={<Navigate replace to="/cashier" />}/>
          {/* TODO: give documentation for keyboard shortcuts */}
          {/* TODO: create theme customization */}
          {/* TODO: percent difference not yet working */}
          {/* TODO: change all selection to autocomplete */}
          {/* TODO: add 30,90 and a year selection in Latest Sales */}
          {/* TODO: optimizing all components */}
          {/* TODO: latest sales still doesn't work */}
          {/* TODO: get data from dropdown when it's clicked */}
          {/* TODO: show products and its besides cashier menu */}
          {/* TODO: add daily reports */}
          {/* TODO: move all computation to backend */}
          {/* TODO: product CRUD is a mess */}
          {/* TODO: remove alert when changes tab */}
          {/* TODO: refining alert system */}
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;

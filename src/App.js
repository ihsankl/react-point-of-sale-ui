import React, {useEffect, useState} from 'react';
import {
  Drawer, Box,
  List,
  Backdrop,
  CircularProgress,
} from '@mui/material';
import Header from './Components/Header';
import SidebarMenu from './Components/SidebarMenu';
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
import Sales from './Components/Pages/Sales/';
import RequiredAuth from './Components/Pages/Required Auth/';
import Login from './Components/Pages/Login';

// redux thing
import {useDispatch, useSelector} from 'react-redux';
import {getCustomers} from './Redux/Slicer/Customer';
import {getAllCategory} from './Redux/Slicer/Category';
import {getProductUnit} from './Redux/Slicer/Product Unit';
import {getSupplier} from './Redux/Slicer/Supplier';
import {getProduct} from './Redux/Slicer/Product';
import {getInvoice} from './Redux/Slicer/Invoice';
import {getPurchaseOrder} from './Redux/Slicer/Purchase Order';
import {getReceiveProduct} from './Redux/Slicer/Receive Product';
import ErrorNotif from './Components/ErrorNotif';
import SuccessNotif from './Components/SuccessNotif';
import Information from './Components/Information';
import {getAllSales} from './Redux/Slicer/Sales';
import ReportSales from './Components/Pages/Report Sales';

const App = ()=> {
  // eslint-disable-next-line no-unused-vars
  const [auth, setAuth] = useState(true);
  const [mount, setMount] = useState(false);
  const CustomerState = useSelector((state) => state.Customer);
  const CategoryState = useSelector((state) => state.Category);
  const ProductUnitState = useSelector((state) => state.ProductUnit);
  const SupplierState = useSelector((state) => state.Supplier);
  const ProductState = useSelector((state) => state.Product);
  const InvoiceState = useSelector((state) => state.Invoice);
  const PurchaseOrderState = useSelector((state) => state.PurchaseOrder);
  const ReceiveProductState = useSelector((state) => state.ReceiveProduct);

  const dispatch = useDispatch();

  // fetch all data from server
  useEffect(() => {
    if (!mount) {
      initAllData();
      setMount(true);
    }
    return () => {

    };
  }, [
    CustomerState,
    CategoryState,
    ProductUnitState,
    SupplierState,
    ProductState,
    InvoiceState,
    PurchaseOrderState,
    ReceiveProductState,
  ]);

  const initAllData = async () => {
    await dispatch(getCustomers()).unwrap();
    await dispatch(getAllCategory()).unwrap();
    await dispatch(getProductUnit()).unwrap();
    await dispatch(getSupplier()).unwrap();
    await dispatch(getProduct()).unwrap();
    await dispatch(getInvoice()).unwrap();
    await dispatch(getPurchaseOrder()).unwrap();
    await dispatch(getReceiveProduct()).unwrap();
    await dispatch(getAllSales()).unwrap();
  };

  const isLoading =
  CustomerState.isLoading ||
  CategoryState.isLoading ||
  ProductUnitState.isLoading ||
  SupplierState.isLoading ||
  ProductState.isLoading ||
  InvoiceState.isLoading ||
  PurchaseOrderState.isLoading ||
  ReceiveProductState.isLoading;

  return (
    <div style={{display: 'flex'}}>
      {/* notification snackbar */}
      <ErrorNotif/>
      <SuccessNotif/>
      {/* information snackbar on left corner */}
      <Information/>
      <Backdrop
        sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 2}}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
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

          {/* report sales routes */}
          <Route path="/report_sales" element={<RequiredAuth>
            <ReportSales/>
          </RequiredAuth>}/>

          {/* login */}
          <Route path="/login" element={
            auth ? <Navigate replace to="/"/> : <Login />
          }/>

          {/* redirect unmatch route */}
          <Route path="*" element={<Navigate replace to="/sales" />}/>

          {/* TODO: add sales UI. foreign
          key required: invoice_id, product_id */}
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
          {/* TODO: user id is not yet implemented */}
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;

/* eslint-disable camelcase */
import {
  Delete as DeleteIcon,
  Loop as LoopIcon,
  Print as PrintIcon,
} from '@mui/icons-material';
import {
  Autocomplete,
  Box,
  Button,
  IconButton,
  TextField,
} from '@mui/material';
import {DataGrid} from '@mui/x-data-grid';
import React, {useEffect, useRef, useState} from 'react';
import useKeyboardShortcut from 'use-keyboard-shortcut';
import {useDispatch, useSelector} from 'react-redux';
import {
  FormContainer,
  FormControlContainer,
  PaperContainer,
  SubHeader,
  Title,
  TitleWithDivider,
} from '../../../layout';
import {
  addItems,
  clearItems,
  editItem,
  removeItem,
  upItem,
} from '../../../Redux/Slicer/Cashier';
import {headersBuilder, rupiahFormatter} from '../../../helper';
import {
  clearSuccess as clearSales,
  createSales,
} from '../../../Redux/Slicer/Sales';
import {getProduct} from '../../../Redux/Slicer/Product';
import {fetchUserByName} from '../../../Redux/Slicer/User';
import EditCart from './EditCart';
import axios from 'axios';
import dayjs from 'dayjs';
import {setSuccess, unsetSuccess} from '../../../Redux/Slicer/AppState';

const Cashier = () => {
  const [pageSize, setPageSize] = useState(20);
  const [paid, setPaid] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [code, setCode] = useState('');
  const [codeLabel, setCodeLabel] = useState('');
  const barcodeRef = useRef(null);
  const paidRef = useRef(null);
  const dispatch = useDispatch();
  const ProductState = useSelector((state) => state.Product);
  const CashierItems = useSelector((state) => state.Cashier);
  const SalesState = useSelector((state) => state.Sales);
  const AuthState = useSelector((state) => state.Authentication);
  const AppState = useSelector((state) => state.AppState);
  const CashierData = CashierItems.data;
  const ProductData = ProductState.data?.data ?? [];
  const {username} = AppState;
  const auth = AuthState.token;
  const UserData = AppState.userData;

  // quick move to scan field
  useKeyboardShortcut(['Control', 'S'],
      () => barcodeRef.current?.focus(),
      {overrideSystem: true});

  // quick move to paid field
  useKeyboardShortcut(['Control', 'X'],
      () => paidRef.current.focus(),
      {overrideSystem: true});

  // print receipt
  useKeyboardShortcut(['Control', 'D'],
      () => handleInputSales(),
      {overrideSystem: true});

  useEffect(() => {
    barcodeRef.current?.focus();

    if (SalesState.isSuccess) {
      handlePrint();
      dispatch(clearItems());
      dispatch(clearSales());
      initProduct();
      setPaid('');
      setCode('');
    }

    if (!!auth) {
      initProduct();
      const data = {username};
      dispatch(fetchUserByName(data));
    }

    return () => {
      barcodeRef.current?.blur();
    };
  }, [
    SalesState,
    auth,
  ]);

  const initProduct = async () => {
    await dispatch(getProduct()).unwrap();
  };

  // handle scan
  const handleScan = (e) => {
    // if pressed enter
    if (e.key === 'Enter') {
      const product = ProductData.find((item) => item.code === code);
      if (product) {
        // if the found product is already in the list
        // then just increment the quantity
        const found = CashierData
            .find((item) => item.product_id === product.product_id);
        if (found) {
          const data = {
            qty: 1,
            unit_price: product.unit_price,
            product_id: product.id,
          };
          dispatch(upItem(data));
        } else {
          // if the found product is not in the list
          // then add it to the list
          const data = {
            qty: 1,
            unit_price: product.unit_price,
            sub_total: product.unit_price,
            product_id: product.id,
            id: product.id,
            product_name: `${product.name} (${product.unit_name})`,
            stock: product.unit_in_stock,
          };
          // if out of stock, dont add to cart
          if (product.unit_in_stock > 0) {
            dispatch(addItems(data));
          }
        }
      }
    }
    setCodeLabel('');
    setCode('');
  };
  // handle remove item
  const handleRemove = (row) => {
    setTimeout(() => {
      dispatch(removeItem(row));
    });
  };

  const columns = [
    {
      field: 'id',
      headerName: 'No.',
      width: 70,
      valueGetter: (params) => CashierData.indexOf(params.row) + 1,
    }, ,
    {
      field: 'product_name',
      headerName: 'Product',
      width: 150,
    },
    {
      field: 'unit_price',
      headerName: 'Price',
      width: 150,
      editable: true,
      valueGetter: (params) => params.row.unit_price,
      valueSetter: (params) => {
        const [unit_price] = params.value.toString().split(' ');
        // edit row data
        const data = {
          ...params.row,
          unit_price,
        };
        dispatch(editItem(data));
        return data;
      },
    },
    {
      field: 'qty',
      headerName: 'Quantity',
      type: 'number',
      width: 150,
      editable: true,
      renderCell: (params) => <EditCart params={params} />,
      valueGetter: (params) => params.row.qty,
      valueSetter: (params) => {
        const [qty] = params.value.toString().split(' ');
        // cant below 0
        if (qty <= 0) return {...params.row, qty: 1};
        // get product stock from ProductData
        const stock = ProductData.find((item) =>
          item.id === params.row.product_id).unit_in_stock;
        // cant exceed stock
        if (qty > stock) return {...params.row, qty: stock};
        // edit row data
        const data = {
          ...params.row,
          qty,
        };
        dispatch(editItem(data));
        return data;
      },
    },
    {
      field: 'sub_total',
      headerName: 'Sub Total',
      type: 'number',
      width: 110,
      editable: true,
      valueGetter: (params) => params.row.sub_total,
      valueSetter: (params) => {
        const [sub_total] = params.value.toString().split(' ');
        const data = {
          ...params.row,
          sub_total,
        };
        dispatch(editItem(data));
        return data;
      },
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 120,
      disableSelectionOnClick: true,
      renderCell: (params) => {
        return (
          <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
            <IconButton
              onClick={() => handleRemove(CashierData.indexOf(params.row))}
              color="inherit"
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        );
      },
    },
  ];

  // sum up the total
  // unit_price * sub_total
  const total = CashierData.reduce((acc, item) => {
    return parseInt(acc) + (parseInt(item.sub_total));
  }, 0);

  // count change
  const change = parseInt(paid) - parseInt(total);

  const handleInputSales = () => {
    const tempPaid = paid ?? 0;
    if (CashierData.length > 0 && tempPaid > 0) {
      const data = {
        user_id: UserData.id,
        products: CashierData,
        amount_tendered: tempPaid,
      };
      dispatch(createSales(data));
      initProduct();
    }
  };

  const handlePrint = async () => {
    const data = {
      products: CashierData,
      receipt_id: '#1',
      operator: UserData?.username,
      date: dayjs().format('DD/MM/YYYY'),
      total: total,
      change: change,
      paid: paid,
    };
    try {
      // eslint-disable-next-line max-len
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/sales/print`, data, {
        ...headersBuilder(),
      });
      if (res) {
        dispatch(setSuccess());
        setTimeout(() => {
          dispatch(unsetSuccess());
        }, 3000);
      }
    } catch (error) {
      // TODO: handle error
      console.log(error.message);
    }
  };

  return (
    <>
      <PaperContainer elevation={3} square>
        <TitleWithDivider>Cashier</TitleWithDivider>
        <SubHeader />
        <Box sx={{display: 'flex', gap: '1em'}}>
          <Box sx={{
            height: 'calc(100vh - 15.5em)',
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
          }}>
            <FormContainer
              sx={{
                flexDirection: 'row',
                gap: '1em',
              }}
              onSubmit={(e) => e.preventDefault()}
            >
              <FormControlContainer
                sx={{
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'row',
                  gap: '.3em',
                }}
              >
                <TextField
                  label="Barcode"
                  sx={{flex: 1}}
                  variant="outlined"
                  fullWidth
                  inputRef={barcodeRef}
                  onChange={(e)=> setCode(e.target.value)}
                  value={code}
                  onKeyDown={handleScan}
                />
                <Autocomplete
                  sx={{
                    flex: 1,
                  }}
                  value={codeLabel}
                  onChange={(event, newValue) => {
                    setCodeLabel(newValue);
                    setCode(newValue?.code);
                  }}
                  onKeyDown={handleScan}
                  options={ProductData.map((item) => {
                    return {
                      label: `${item.code} - ${item.name}`,
                      code: item.code,
                    };
                  })}
                  renderInput={(params) =>
                    <TextField
                      label="Name"
                      {...params}
                    />
                  }
                />
                <Button
                  onClick={()=> dispatch(getProduct())}
                  variant='outlined'
                  aria-label="delete"
                >
                  <LoopIcon />
                </Button>
              </FormControlContainer>
            </FormContainer>
            <DataGrid
              sx={{
                marginTop: '1em',
                flex: 1,
              }}
              rows={CashierData}
              columns={columns}
              pageSize={pageSize}
              rowsPerPageOptions={[5, 10, 20]}
              disableSelectionOnClick
              onPageSizeChange={(page) => {
                setPageSize(page);
              }}
            />
            <Box
              sx={{
                display: 'flex',
                gap: '1em',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  flexDirection: 'column',
                  gap: '1em',
                  marginTop: '1em',
                }}
              >
                <TextField
                  inputRef={paidRef}
                  sx={{width: '10em', fontSize: '2em'}}
                  id={'paid'}
                  label={'Paid'}
                  type={'number'}
                  name={'paid'}
                  value={paid}
                  variant="standard"
                  fullWidth
                  onChange={(e) => setPaid(e.target.value)}
                />
                <Title>Changes : {rupiahFormatter(change)}</Title>
                <Title sx={{fontSize: '2em'}}>
                  Total : {rupiahFormatter(total)}
                </Title>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  width: '100%',
                  alignItems: 'center',
                }}
              >
                <Button
                  disabled={CashierData.length === 0 || !paid || paid < total}
                  onClick={handleInputSales}
                  variant="contained"
                  startIcon={<PrintIcon />}
                  sx={{
                    px: '2em',
                    py: '1em',
                  }}
                >
                Print
                </Button>
              </Box>
            </Box>
          </Box>
          {/* eslint-disable-next-line max-len */}
          <Box sx={{flex: 1}}/>
        </Box>
      </PaperContainer>
    </>
  );
};

export default Cashier;

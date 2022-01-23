
import {Add, Delete, Edit, Print, Remove} from '@mui/icons-material';
import {
  Box,
  Button,
  IconButton,
  TextField,
} from '@mui/material';
import {DataGrid} from '@mui/x-data-grid';
import React, {Fragment, useEffect, useRef, useState} from 'react';
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
  downItem,
  removeItem,
  upItem,
} from '../../../Redux/Slicer/Cashier';
import {rupiahFormatter} from '../../../helper';
import {createSales} from '../../../Redux/Slicer/Sales';

const Cashier = () => {
  const [pageSize, setPageSize] = useState(20);
  const [paid, setPaid] = useState('');
  const [code, setCode] = useState('');
  const barcodeRef = useRef(null);
  const paidRef = useRef(null);
  const dispatch = useDispatch();
  const ProductState = useSelector((state) => state.Product);
  const CashierItems = useSelector((state) => state.Cashier);
  const SalesState = useSelector((state) => state.Sales);
  const CashierData = CashierItems.data;
  const ProductData = ProductState.data?.data ?? [];

  // quick move to scan field
  useKeyboardShortcut(['Control', 'S'],
      () => barcodeRef.current.focus(),
      {overrideSystem: true});

  // quick move to paid field
  useKeyboardShortcut(['Control', 'X'],
      () => paidRef.current.focus(),
      {overrideSystem: true});

  // print receipt
  useKeyboardShortcut(['Control', 'P'],
      () => handlePrint(),
      {overrideSystem: true});

  useEffect(() => {
    barcodeRef.current.focus();
    if (SalesState.isSuccess) {
      dispatch(clearItems());
      setPaid('');
      setCode('');
    }
    return () => {
      barcodeRef.current?.blur();
    };
  }, [SalesState]);

  // handle scan
  const handleScan = (e) => {
    const code = e.target.value;
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
            product_name: product.name,
          };
          dispatch(addItems(data));
        }
      }
      setCode('');
    }
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
      editable: false,
    },
    {
      field: 'unit_price',
      headerName: 'Price',
      width: 150,
      editable: false,
    },
    {
      field: 'qty',
      headerName: 'Quantity',
      type: 'number',
      width: 150,
      editable: false,
      renderCell: (params) => {
        return (
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <IconButton
              onClick={() => {
                const data = {
                  qty: 1,
                  unit_price: params.row.unit_price,
                  product_id: params.row.product_id,
                };
                dispatch(upItem(data));
              }}
              color="inherit"
            >
              <Add />
            </IconButton>
            {params.value}
            <IconButton
              onClick={() => {
                const data = {
                  qty: 1,
                  unit_price: params.row.unit_price,
                  product_id: params.row.product_id,
                };
                dispatch(downItem(data));
              }}
              color="inherit"
            >
              <Remove />
            </IconButton>
          </div>
        );
      },
    },
    {
      field: 'sub_total',
      headerName: 'Sub Total',
      type: 'number',
      width: 110,
      editable: false,
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 120,
      editable: false,
      disableSelectionOnClick: true,
      renderCell: (params) => {
        return (
          <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <IconButton
              onClick={() => handleRemove(CashierData.indexOf(params.row))}
              color="inherit"
            >
              <Delete />
            </IconButton>
            <IconButton
              onClick={() => console.log(params.row)}
              color="inherit"
            >
              <Edit />
            </IconButton>
          </div>
        );
      },
    },
  ];

  // sum up the total
  const total = CashierData.reduce((acc, item) => {
    return acc + item.sub_total;
  }, 0);

  // count change
  const change = paid - total;

  // print receipt
  const handlePrint = () => {
    const newPaid = paid ?? 0;
    if (CashierData.length > 0 && newPaid > 0) {
      const data = {
        user_id: 1,
        products: CashierData,
        amount_tendered: newPaid,
      };
      dispatch(createSales(data));
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
              <FormControlContainer sx={{width: '100%'}}>
                <TextField
                  label="Barcode"
                  variant="outlined"
                  fullWidth
                  inputRef={barcodeRef}
                  onChange={(e)=> setCode(e.target.value)}
                  value={code}
                  onKeyDown={handleScan}
                />
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
              onRowEditCommit={(row) => {
                console.log(row); console.log('onRowEditCommit');
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
                  onClick={handlePrint}
                  variant="contained"
                  startIcon={<Print />}
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
          <Box sx={{flex: 1}}>
            {/* <FormContainer onSubmit={(e) => e.preventDefault()}>
              <FormControlContainer sx={{width: '100%'}}>
                <Autocomplete
                  onInputChange={(e)=> {
                    setSearch(e.target.value);
                    // find product by name
                    const product = ProductData.find(item
                      // => item.name === e.target.value);
                    console.log('product >>> ',product);
                    console.log(e.target.value);
                    if (product) {
                      const found = CashierData
                      // .find(item => item.product_id === product.id);
                      if (found) {
                        const data = {
                          qty: 1,
                          unit_price: found.unit_price,
                          product_id: product.id,
                        };
                        dispatch(upItem(data));
                      } else {
                        const data = {
                          qty: 1,
                          unit_price: product.price,
                          product_id: product.id,
                        };
                        dispatch(addItems(data));
                      }
                    }
                  }}
                  // always show the suggestions list
                  open={true}
                  isOptionEqualToValue={(option, value) =>
                    option.value === value.value}
                  disablePortal
                  id="combo-box-demo"
                  options={optionsBuilder(ProductData)}
                  // sx={{width: 300}}
                  renderInput={
                    (params) =>
                      <TextField
                        inputRef={searchRef}
                        value={search}
                        {...params}
                        label="Name"
                      />
                  }
                />
              </FormControlContainer>
            </FormContainer> */}
          </Box>
        </Box>
      </PaperContainer>
    </>
  );
};

export default Cashier;


import {Add, Delete, Edit, Remove} from '@mui/icons-material';
import {Autocomplete, IconButton, TextField} from '@mui/material';
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
import {getProduct} from '../../../Redux/Slicer/Product';

const columns = [
  {field: 'id', headerName: 'No.', width: 70}, ,
  {
    field: 'product',
    headerName: 'Product',
    width: 150,
    editable: false,
  },
  {
    field: 'price',
    headerName: 'Price',
    width: 150,
    editable: false,
  },
  {
    field: 'quantity',
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
            onClick={() => console.log(params.row)}
            color="inherit"
          >
            <Add />
          </IconButton>
          {params.value}
          <IconButton
            onClick={() => console.log(params.row)}
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
            onClick={() => console.log(params.row)}
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

const rows = [
  {
    id: 1,
    product: 'Product 1',
    price: '$100',
    quantity: '1',
    sub_total: '$100',
  },
];

const Sales = () => {
  const [pageSize, setPageSize] = useState(20);
  const [paid, setPaid] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [code, setCode] = useState('');
  const barcodeRef = useRef(null);
  const paidRef = useRef(null);
  // TODO: fetch products
  // eslint-disable-next-line no-unused-vars
  const Product = useSelector((state) => state.Product);
  const ProductData = useSelector((state) => state.Product.data?.data);
  const dispatch = useDispatch();

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
      () => console.log('Pressed Control + P'),
      {overrideSystem: true});

  // edit mode
  useKeyboardShortcut(['Control', 'E'],
      () => console.log('Pressed Control + E'),
      {overrideSystem: true});

  useEffect(() => {
    barcodeRef.current.focus();
    getAllProducts();
    console.log(ProductData);
    return () => {
      barcodeRef.current?.blur();
    };
  }, []);

  const getAllProducts = async () => {
    await dispatch(getProduct()).unwrap();
  };

  return (
    <PaperContainer elevation={3} square>
      <TitleWithDivider>Sales</TitleWithDivider>
      <SubHeader />
      <div style={{
        height: 'calc(100vh - 15.5em)',
        display: 'flex',
        flexDirection: 'column',
      }}>
        <FormContainer onSubmit={(e) => e.preventDefault()}>
          <FormControlContainer>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={null}
              // sx={{width: 300}}
              renderInput={
                (params) =>
                  <TextField
                    onChange={(e) => {
                      setCode(e.target.value);
                    }}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        e.stopPropagation();
                        sendData();
                      }
                    }}
                    inputRef={barcodeRef}
                    {...params}
                    label="Name or Code"
                  />
              }
            />
          </FormControlContainer>
        </FormContainer>
        <DataGrid
          sx={{
            marginTop: '1em',
            maxWidth: '50%',
            minWidth: '40em',
          }}
          rows={rows}
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
        <div style={{
          maxWidth: '50%',
          minWidth: '40em',
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'column',
          gap: '1em',
          marginTop: '1em',
        }}>
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
          <Title>Changes :</Title>
          <Title sx={{fontSize: '2em'}}>Total :</Title>
        </div>
      </div>
    </PaperContainer>
  );
};

export default Sales;

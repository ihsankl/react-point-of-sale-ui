import {Button, TextField} from '@mui/material';
import React, {useEffect} from 'react';
import {SubHeader, PaperContainer, TitleWithDivider} from '../../../layout';
import {useNavigate} from 'react-router-dom';
import {Search} from '@mui/icons-material';
import BasicTable from '../../BasicTable';
import {useDispatch, useSelector} from 'react-redux';
import {getInvoice} from '../../../Redux/Slicer/Invoice';
import {columnsBuilder} from '../../../helper';

const Invoice = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const Invoice = useSelector((state) => state.Invoice);
  const InvoiceData = Invoice.data?.data ?? [];

  useEffect(() => {
    initInvoice();
    return () => {

    };
  }, []);

  const initInvoice = async () => {
    await dispatch(getInvoice()).unwrap();
  };

  const handleUpdate = (id) => {
    // filter the data corresponding to the id
    const data = InvoiceData.filter((item) => item.id === id);
    navigate(`/invoice/update/${id}`, {state: {data}});
  };

  const handleDelete = (id) => {
    console.log('delete not implemented');
  };

  return (
    <PaperContainer elevation={3} square>
      <TitleWithDivider>Invoice</TitleWithDivider>
      <SubHeader>
        <Button
          onClick={()=> navigate('create')}
          variant="contained"
        >Create New</Button>
        <div style={{display: 'flex', alignItems: 'flex-end'}}>
          <Search sx={{color: 'action.active', mr: 1, my: 0.5}} />
          <TextField
            id="input-with-sx"
            label="Search Item"
            variant="standard"
          />
        </div>
      </SubHeader>
      <BasicTable
        dataRows={InvoiceData}
        dataColumns={
          columnsBuilder(InvoiceData[0], handleUpdate, handleDelete)
        }
      />
    </PaperContainer>
  );
};

export default Invoice;

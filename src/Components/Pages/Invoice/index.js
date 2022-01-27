import {Button} from '@mui/material';
import React, {useEffect, useState} from 'react';
import {SubHeader, PaperContainer, TitleWithDivider} from '../../../layout';
import {useNavigate} from 'react-router-dom';
import BasicTable from '../../BasicTable';
import {useDispatch, useSelector} from 'react-redux';
import {deleteInvoice, getInvoice} from '../../../Redux/Slicer/Invoice';
import {columnsBuilder} from '../../../helper';
import ConfirmDialog from '../../ConfirmDialog';
import {
  closeConfirmDialog,
  openConfirmDialog,
} from '../../../Redux/Slicer/ConfirmDialog';

const Invoice = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [mount, setMount] = useState(false);
  const Invoice = useSelector((state) => state.Invoice);
  const InvoiceData = Invoice.data?.data ?? [];
  let whichData = [];

  useEffect(() => {
    if (!mount) {
      initInvoice();
      setMount(true);
    }
    return () => {

    };
  }, [Invoice, mount]);

  const initInvoice = async () => {
    await dispatch(getInvoice()).unwrap();
  };

  const handleUpdate = (id) => {
    // filter the data corresponding to the id
    const data = InvoiceData.filter((item) => item.id === id);
    navigate(`/invoice/update/${id}`, {state: {data}});
  };

  const handleDelete = (id) => {
    const newWhichData = InvoiceData.filter((item) => item.id === id);
    whichData = newWhichData[0];
    const data = {
      title: 'Delete Invoice',
      message: 'Are you sure you want to delete this Invoice?',
      isOpen: true,
    };
    dispatch(openConfirmDialog(data));
  };

  return (
    <>
      <PaperContainer elevation={3} square>
        <TitleWithDivider>Invoice</TitleWithDivider>
        <SubHeader>
          <Button
            onClick={()=> navigate('create')}
            variant="contained"
          >Create New</Button>

        </SubHeader>
        <BasicTable
          dataRows={InvoiceData}
          dataColumns={
            columnsBuilder(InvoiceData[0], handleUpdate, handleDelete)
          }
        />
      </PaperContainer>
      <ConfirmDialog
        onConfirm={() => {
          dispatch(deleteInvoice(whichData));
          setMount(false);
          dispatch(closeConfirmDialog());
        }}
        onCancel={() => {
          dispatch(closeConfirmDialog());
        }}
      />
    </>
  );
};

export default React.memo(Invoice);

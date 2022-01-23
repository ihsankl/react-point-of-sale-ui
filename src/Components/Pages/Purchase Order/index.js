import {Button, TextField} from '@mui/material';
import React, {useEffect, useState} from 'react';
import {SubHeader, PaperContainer, TitleWithDivider} from '../../../layout';
import {useNavigate} from 'react-router-dom';
import {Search} from '@mui/icons-material';
import BasicTable from '../../BasicTable';
import {useDispatch, useSelector} from 'react-redux';
import {
  deletePurchaseOrder,
  getPurchaseOrder,
} from '../../../Redux/Slicer/Purchase Order';
import {columnsBuilder} from '../../../helper';
import ConfirmDialog from '../../ConfirmDialog';
import {
  closeConfirmDialog,
  openConfirmDialog,
} from '../../../Redux/Slicer/ConfirmDialog';

const PurchaseOrder = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [mount, setMount] = useState(false);
  const PurchaseOrder = useSelector((state) => state.PurchaseOrder);
  const PurchaseOrderData = PurchaseOrder.data?.data ?? [];
  let whichData = [];

  useEffect(() => {
    if (!mount) {
      initPurchaseOrder();
      setMount(true);
    }
    return () => {

    };
  }, [PurchaseOrder, mount]);

  const initPurchaseOrder = async () => {
    await dispatch(getPurchaseOrder()).unwrap();
  };

  const handleUpdate = (id) => {
    const data = PurchaseOrderData.filter((item) => item.id === id);
    navigate(`/purchase_order/update/${id}`, {state: {data}});
  };

  const handleDelete = (id) => {
    const newWhichData = PurchaseOrderData.filter((item) => item.id === id);
    whichData = newWhichData[0];
    const data = {
      title: 'Delete Purchase Order',
      message: 'Are you sure you want to delete this Purchase Order?',
      isOpen: true,
    };
    dispatch(openConfirmDialog(data));
  };

  return (
    <>
      <PaperContainer elevation={3} square>
        <TitleWithDivider>Purchase Order</TitleWithDivider>
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
          dataRows={PurchaseOrderData}
          dataColumns={
            columnsBuilder(PurchaseOrderData[0], handleUpdate, handleDelete)
          }
        />
      </PaperContainer>
      <ConfirmDialog
        onConfirm={() => {
          dispatch(deletePurchaseOrder(whichData));
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

export default React.memo(PurchaseOrder);

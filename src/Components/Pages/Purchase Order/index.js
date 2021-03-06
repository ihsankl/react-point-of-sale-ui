import {Button} from '@mui/material';
import React, {useEffect} from 'react';
import {SubHeader, PaperContainer, TitleWithDivider} from '../../../layout';
import {useNavigate} from 'react-router-dom';
import BasicTable from '../../BasicTable';
import {useDispatch, useSelector} from 'react-redux';
import {
  clearSuccess,
  deletePurchaseOrder,
  getPurchaseOrder,
} from '../../../Redux/Slicer/Purchase Order';
import {columnsBuilder} from '../../../helper';
import ConfirmDialog from '../../ConfirmDialog';
import {
  closeConfirmDialog,
  openConfirmDialog,
} from '../../../Redux/Slicer/ConfirmDialog';
import {setMountPage, unsetMountPage} from '../../../Redux/Slicer/AppState';
import {Cached} from '@mui/icons-material';

const PurchaseOrder = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // eslint-disable-next-line max-len
  const mount = useSelector((state) => state.AppState.pageMounted.purchase_order);
  const PurchaseOrder = useSelector((state) => state.PurchaseOrder);
  const PurchaseOrderData = PurchaseOrder.data?.data ?? [];
  let whichData = [];

  useEffect(() => {
    if (!mount && PurchaseOrderData.length === 0) {
      initPurchaseOrder();
      dispatch(setMountPage('purchase_order'));
    }

    if (PurchaseOrder.isSuccess) {
      dispatch(clearSuccess());
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
          <Button
            onClick={initPurchaseOrder}
            variant='outlined'
            startIcon={<Cached/>}
          >
            Refresh
          </Button>
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
          dispatch(unsetMountPage('purchase_order'));
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

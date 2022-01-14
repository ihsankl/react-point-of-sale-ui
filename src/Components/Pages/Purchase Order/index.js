import {Button, TextField} from '@mui/material';
import React, {useEffect} from 'react';
import {SubHeader, PaperContainer, TitleWithDivider} from '../../../layout';
import {useNavigate} from 'react-router-dom';
import {Search} from '@mui/icons-material';
import BasicTable from '../../BasicTable';
import {useDispatch, useSelector} from 'react-redux';
import {getPurchaseOrder} from '../../../Redux/Slicer/Purchase Order';
import {columnsBuilder} from '../../../helper';

const PurchaseOrder = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const PurchaseOrder = useSelector((state) => state.PurchaseOrder);
  const PurchaseOrderData = PurchaseOrder.data?.data ?? [];

  useEffect(() => {
    initPurchaseOrder();
    return () => {

    };
  }, []);

  const initPurchaseOrder = async () => {
    await dispatch(getPurchaseOrder()).unwrap();
  };

  const handleUpdate = (id) => {
    const data = CustomerData.filter((item) => item.id === id);
    navigate(`/purchase_order/update/${id}`, {state: {data}});
  };

  const handleDelete = (id) => {
    console.log('delete not implemented');
  };

  return (
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
  );
};

export default PurchaseOrder;

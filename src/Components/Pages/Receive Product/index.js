import {Button, TextField} from '@mui/material';
import React, {useEffect, useState} from 'react';
import {SubHeader, PaperContainer, TitleWithDivider} from '../../../layout';
import {useNavigate} from 'react-router-dom';
import {Search} from '@mui/icons-material';
import BasicTable from '../../BasicTable';
import {useDispatch, useSelector} from 'react-redux';
import {
  deleteReceiveProduct,
  getReceiveProduct}
  from '../../../Redux/Slicer/Receive Product';
import {columnsBuilder} from '../../../helper';
import {
  closeConfirmDialog,
  openConfirmDialog,
} from '../../../Redux/Slicer/ConfirmDialog';
import ConfirmDialog from '../../ConfirmDialog';

const ReceiveProduct = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [mount, setMount] = useState(false);
  const ReceiveProduct = useSelector((state) => state.ReceiveProduct);
  const ReceiveProductData = ReceiveProduct.data?.data ?? [];
  let [whichData] = useState([]);

  useEffect(() => {
    if (!mount) {
      if (ReceiveProductData.length === 0) {
        initReceiveProduct();
      }
      setMount(true);
    }
    return () => {

    };
  }, [ReceiveProduct]);

  const initReceiveProduct = async () => {
    await dispatch(getReceiveProduct()).unwrap();
  };

  const handleUpdate = (id) => {
    const data = ReceiveProductData.filter((item) => item.id === id);
    navigate(`/receive_product/update/${id}`, {state: {data}});
  };

  const handleDelete = (id) => {
    const newWhichData = ReceiveProductData.filter((item) => item.id === id);
    whichData = newWhichData[0];
    const data = {
      title: 'Delete Receive Product',
      message: 'Are you sure you want to delete this Receive Product?',
      isOpen: true,
    };
    dispatch(openConfirmDialog(data));
  };

  return (
    <>
      <PaperContainer elevation={3} square>
        <TitleWithDivider>Receive Product</TitleWithDivider>
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
          dataRows={ReceiveProductData}
          dataColumns={
            columnsBuilder(ReceiveProductData[0], handleUpdate, handleDelete)
          }
        />
      </PaperContainer>
      <ConfirmDialog
        onConfirm={() => {
          dispatch(deleteReceiveProduct(whichData));
          dispatch(closeConfirmDialog());
        }}
        onCancel={() => {
          dispatch(closeConfirmDialog());
        }}
      />
    </>
  );
};

export default ReceiveProduct;

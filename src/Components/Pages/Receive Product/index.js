import {Button} from '@mui/material';
import React, {useEffect} from 'react';
import {SubHeader, PaperContainer, TitleWithDivider} from '../../../layout';
import {useNavigate} from 'react-router-dom';
import BasicTable from '../../BasicTable';
import {useDispatch, useSelector} from 'react-redux';
import {
  clearSuccess,
  deleteReceiveProduct,
  getReceiveProduct}
  from '../../../Redux/Slicer/Receive Product';
import {columnsBuilder} from '../../../helper';
import {
  closeConfirmDialog,
  openConfirmDialog,
} from '../../../Redux/Slicer/ConfirmDialog';
import ConfirmDialog from '../../ConfirmDialog';
import {setMountPage, unsetMountPage} from '../../../Redux/Slicer/AppState';
import {Cached} from '@mui/icons-material';

const ReceiveProduct = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // eslint-disable-next-line max-len
  const mount = useSelector((state) => state.AppState.pageMounted.receive_product);
  const ReceiveProduct = useSelector((state) => state.ReceiveProduct);
  const ReceiveProductData = ReceiveProduct.data?.data ?? [];
  let whichData = [];

  useEffect(() => {
    if (!mount && ReceiveProductData.length === 0) {
      initReceiveProduct();
      dispatch(setMountPage('receive_product'));
    }

    if (ReceiveProduct.isSuccess) {
      dispatch(clearSuccess());
    }

    return () => {

    };
  }, [ReceiveProduct, mount]);

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
          <Button
            onClick={initReceiveProduct}
            variant='outlined'
            startIcon={<Cached/>}
          >
            Refresh
          </Button>
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
          dispatch(unsetMountPage('receive_product'));
          dispatch(closeConfirmDialog());
        }}
        onCancel={() => {
          dispatch(closeConfirmDialog());
        }}
      />
    </>
  );
};

export default React.memo(ReceiveProduct);

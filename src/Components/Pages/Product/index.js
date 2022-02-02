import {Button} from '@mui/material';
import React, {useEffect} from 'react';
import {SubHeader, PaperContainer, TitleWithDivider} from '../../../layout';
import {useNavigate} from 'react-router-dom';
import BasicTable from '../../BasicTable';
import {useDispatch, useSelector} from 'react-redux';
import {
  clearSuccess,
  deleteProduct,
  getProduct,
} from '../../../Redux/Slicer/Product';
import {columnsBuilder} from '../../../helper';
import ConfirmDialog from '../../ConfirmDialog';
import {
  closeConfirmDialog,
  openConfirmDialog,
} from '../../../Redux/Slicer/ConfirmDialog';
import {setMountPage, unsetMountPage} from '../../../Redux/Slicer/AppState';

const Product = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const mount = useSelector((state) => state.AppState.pageMounted.product);
  const Product = useSelector((state) => state.Product);
  const ProductData = Product.data?.data ?? [];
  let whichData = [];

  useEffect(() => {
    if (!mount && ProductData.length === 0) {
      initProduct();
      dispatch(setMountPage('product'));
    }

    if (Product.isSuccess) {
      dispatch(clearSuccess());
    }

    return () => {

    };
  }, [Product, mount]);

  const initProduct = async () => {
    await dispatch(getProduct()).unwrap();
  };

  const handleUpdate = (id) => {
    const data = ProductData.filter((item) => item.id === id);
    navigate(`/product/update/${id}`, {state: {data}});
  };

  const handleDelete = (id) => {
    const newWhichData = ProductData.filter((item) => item.id === id);
    whichData = newWhichData[0];
    const data = {
      title: 'Delete Product',
      message: 'Are you sure you want to delete this product?',
      isOpen: true,
    };
    dispatch(openConfirmDialog(data));
  };

  return (
    <>
      <PaperContainer elevation={3} square>
        <TitleWithDivider>Product</TitleWithDivider>
        <SubHeader>
          <Button
            onClick={()=> navigate('create')}
            variant="contained"
          >Create New</Button>

        </SubHeader>
        <BasicTable
          dataRows={ProductData}
          dataColumns={
            columnsBuilder(ProductData[0], handleUpdate, handleDelete)
          }
        />
      </PaperContainer>
      <ConfirmDialog
        onConfirm={() => {
          dispatch(deleteProduct(whichData));
          dispatch(unsetMountPage('product'));
          dispatch(closeConfirmDialog());
        }}
        onCancel={() => {
          dispatch(closeConfirmDialog());
        }}
      />
    </>
  );
};

export default React.memo(Product);

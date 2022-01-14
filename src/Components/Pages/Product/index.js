import {Button, TextField} from '@mui/material';
import React, {useEffect} from 'react';
import {SubHeader, PaperContainer, TitleWithDivider} from '../../../layout';
import {useNavigate} from 'react-router-dom';
import {Search} from '@mui/icons-material';
import BasicTable from '../../BasicTable';
import {useDispatch, useSelector} from 'react-redux';
import {getProduct} from '../../../Redux/Slicer/Product';
import {columnsBuilder} from '../../../helper';

const Product = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const Product = useSelector((state) => state.Product);
  const ProductData = Product.data?.data ?? [];

  useEffect(() => {
    initProduct();
    return () => {

    };
  }, []);

  const initProduct = async () => {
    await dispatch(getProduct()).unwrap();
  };

  const handleUpdate = (id) => {
    const data = ProductData.filter((item) => item.id === id);
    navigate(`/product/update/${id}`, {state: {data}});
  };

  const handleDelete = (id) => {
    console.log('delete not implemented');
  };

  return (
    <PaperContainer elevation={3} square>
      <TitleWithDivider>Product</TitleWithDivider>
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
        dataRows={ProductData}
        dataColumns={
          columnsBuilder(ProductData[0], handleUpdate, handleDelete)
        }
      />
    </PaperContainer>
  );
};

export default Product;

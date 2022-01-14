import {Button, TextField} from '@mui/material';
import React from 'react';
import {SubHeader, PaperContainer, TitleWithDivider} from '../../../layout';
import {useNavigate} from 'react-router-dom';
import {Search} from '@mui/icons-material';
import BasicTable from '../../BasicTable';
import {useDispatch, useSelector} from 'react-redux';
import {getReceiveProduct} from '../../../Redux/Slicer/Receive Product';
import {columnsBuilder} from '../../../helper';

const ReceiveProduct = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const ReceiveProduct = useSelector((state) => state.ReceiveProduct);
  const ReceiveProductData = ReceiveProduct.data?.data ?? [];

  useEffect(() => {
    initReceiveProduct();
    return () => {

    };
  }, []);

  const initReceiveProduct = async () => {
    await dispatch(getReceiveProduct()).unwrap();
  };

  const handleUpdate = (id) => {
    const data = CustomerData.filter((item) => item.id === id);
    navigate(`/receive_product/update/${id}`, {state: {data}});
  };

  const handleDelete = (id) => {
    console.log('delete not implemented');
  };

  return (
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
  );
};

export default ReceiveProduct;

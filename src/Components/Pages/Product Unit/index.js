import {Search} from '@mui/icons-material';
import {Button, TextField} from '@mui/material';
import React, {useEffect} from 'react';
import {SubHeader, PaperContainer, TitleWithDivider} from '../../../layout';
import BasicTable from '../../BasicTable';
import {useNavigate} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {useSelector} from 'react-redux';
import {getProductUnit} from '../../../Redux/Slicer/Product Unit';
import {columnsBuilder} from '../../../helper';

const ProductUnit = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const ProductUnit = useSelector((state) => state.ProductUnit);
  const ProductUnitData = ProductUnit.data?.data ?? [];

  useEffect(() => {
    initProductUnit();
    return () => {

    };
  }, []);

  const initProductUnit = async () => {
    await dispatch(getProductUnit()).unwrap();
  };

  const handleUpdate = (id) => {
    const data = ProductUnitData.filter((item) => item.id === id);
    navigate(`/unit/update/${id}`, {state: {data}});
  };

  const handleDelete = (id) => {
    console.log('delete not implemented');
  };

  return (
    <PaperContainer elevation={3} square>
      <TitleWithDivider>Product Unit</TitleWithDivider>
      <SubHeader>
        <Button
          onClick={()=> navigate('create')}
          variant="contained">
          Create New
        </Button>
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
        dataRows={ProductUnitData}
        dataColumns={
          columnsBuilder(ProductUnitData[0], handleUpdate, handleDelete)
        }
      />
    </PaperContainer>
  );
};

export default ProductUnit;

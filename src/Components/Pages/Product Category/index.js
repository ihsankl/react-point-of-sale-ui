import {Search} from '@mui/icons-material';
import {Button, TextField} from '@mui/material';
import React, {useEffect} from 'react';
import {SubHeader, PaperContainer, TitleWithDivider} from '../../../layout';
import BasicTable from '../../BasicTable';
import {useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {getAllCategory} from '../../../Redux/Slicer/Category';
import {columnsBuilder} from '../../../helper';

const ProductCategory = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const Category = useSelector((state) => state.Category);
  const CategoryData = Category.data?.data ?? [];

  useEffect(() => {
    initCategories();
    return () => {

    };
  }, []);

  const initCategories = async () => {
    await dispatch(getAllCategory()).unwrap();
  };

  const handleUpdate = (id) => {
    const data = CategoryData.filter((item) => item.id === id);
    navigate(`/category/update/${id}`, {state: {data}});
  };

  const handleDelete = (id) => {
    console.log('delete not implemented');
  };

  return (
    <PaperContainer elevation={3} square>
      <TitleWithDivider>Product Category</TitleWithDivider>
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
        dataRows={CategoryData}
        dataColumns={
          columnsBuilder(CategoryData[0], handleUpdate, handleDelete)
        }
      />
    </PaperContainer>
  );
};

export default ProductCategory;

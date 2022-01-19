import {Search} from '@mui/icons-material';
import {Button, TextField} from '@mui/material';
import React, {useEffect, useState} from 'react';
import {SubHeader, PaperContainer, TitleWithDivider} from '../../../layout';
import BasicTable from '../../BasicTable';
import {useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {deleteCategory, getAllCategory} from '../../../Redux/Slicer/Category';
import {columnsBuilder} from '../../../helper';
import {
  closeConfirmDialog,
  openConfirmDialog,
} from '../../../Redux/Slicer/ConfirmDialog';
import ConfirmDialog from '../../ConfirmDialog';

const ProductCategory = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const Category = useSelector((state) => state.Category);
  const CategoryData = Category.data?.data ?? [];
  let [whichData] = useState([]);

  useEffect(() => {
    if (CategoryData.length === 0) {
      initCategories();
    }
    return () => {

    };
  }, [Category]);

  const initCategories = async () => {
    await dispatch(getAllCategory()).unwrap();
  };

  const handleUpdate = (id) => {
    const data = CategoryData.filter((item) => item.id === id);
    navigate(`/category/update/${id}`, {state: {data}});
  };

  const handleDelete = (id) => {
    const newWhichData = CategoryData.filter((item) => item.id === id);
    whichData = newWhichData[0];
    const data = {
      title: 'Delete Category',
      message: 'Are you sure you want to delete this Category?',
      isOpen: true,
    };
    dispatch(openConfirmDialog(data));
  };

  return (
    <>
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
      <ConfirmDialog
        onConfirm={() => {
          dispatch(deleteCategory(whichData));
          dispatch(closeConfirmDialog());
        }}
        onCancel={() => {
          dispatch(closeConfirmDialog());
        }}
      />
    </>
  );
};

export default ProductCategory;

import {Button} from '@mui/material';
import React, {useEffect} from 'react';
import {SubHeader, PaperContainer, TitleWithDivider} from '../../../layout';
import BasicTable from '../../BasicTable';
import {useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {
  clearSuccess,
  deleteCategory,
  getAllCategory,
} from '../../../Redux/Slicer/Category';
import {columnsBuilder} from '../../../helper';
import {
  closeConfirmDialog,
  openConfirmDialog,
} from '../../../Redux/Slicer/ConfirmDialog';
import ConfirmDialog from '../../ConfirmDialog';
import {setMountPage, unsetMountPage} from '../../../Redux/Slicer/AppState';
import {Cached} from '@mui/icons-material';

const ProductCategory = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const mount = useSelector((state) => state.AppState.pageMounted.category);
  const Category = useSelector((state) => state.Category);
  const CategoryData = Category.data?.data ?? [];
  let whichData = [];

  useEffect(() => {
    if (!mount && CategoryData.length === 0) {
      initCategories();
      dispatch(setMountPage('category'));
    }
    if (Category.isSuccess) {
      dispatch(clearSuccess());
    }

    return () => {

    };
  }, [Category, mount]);

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
          <Button
            onClick={initCategories}
            variant='outlined'
            startIcon={<Cached/>}
          >
            Refresh
          </Button>
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
          dispatch(unsetMountPage('category'));
          dispatch(closeConfirmDialog());
        }}
        onCancel={() => {
          dispatch(closeConfirmDialog());
        }}
      />
    </>
  );
};

export default React.memo(ProductCategory);

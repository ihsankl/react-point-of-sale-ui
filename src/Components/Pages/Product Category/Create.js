import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {SubHeader, PaperContainer, TitleWithDivider} from '../../../layout';
import {setSuccess, unsetMountPage} from '../../../Redux/Slicer/AppState';
import {clearSuccess, createCategory} from '../../../Redux/Slicer/Category';
import BasicInput from '../../BasicInput';

const defaultValues = {
  product_category_name: '',
};

const CreateProductCategory = () => {
  const dispatch = useDispatch();
  const ProductCategoryState = useSelector((state) => state.Category);
  const [formValues, setFormValues] = useState(defaultValues);

  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    const data = {
      name: formValues.product_category_name,
    };
    dispatch(createCategory(data));
  };

  useEffect(() => {
    if (ProductCategoryState.isSuccess) {
      dispatch(setSuccess());
      dispatch(unsetMountPage('category'));
      dispatch(unsetMountPage('product'));
      setTimeout(() => {
        dispatch(clearSuccess());
      }, 5000);
    }

    return () => {

    };
  }, [ProductCategoryState]);

  const fields = [
    {
      id: 'product_category_name',
      label: 'Name',
      onChange: handleInputChange,
      value: formValues.product_category_name,
      error: !formValues.product_category_name,
      helperText: !!formValues.product_category_name ?
      '' : 'Please enter category name',
    },
  ];
  return (
    <>
      <PaperContainer elevation={3} square>
        <TitleWithDivider>Create Product Category</TitleWithDivider>
        <SubHeader>
          <BasicInput fields={fields} onSubmit={handleSubmit} />
        </SubHeader>
      </PaperContainer>
    </>
  );
};

export default CreateProductCategory;

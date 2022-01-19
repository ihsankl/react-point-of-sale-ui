import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {useLocation, useNavigate} from 'react-router-dom';
import {SubHeader, PaperContainer, TitleWithDivider} from '../../../layout';
import {updateCategory} from '../../../Redux/Slicer/Category';
import BasicInput from '../../BasicInput';

const defaultValues = {
  product_category_id: '',
  product_category_name: '',
};

const UpdateProductCategory = () => {
  const [formValues, setFormValues] = useState(defaultValues);

  const dispatch = useDispatch();
  const {state} = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!!state) {
      const data = {
        product_category_id: state.data[0].id,
        product_category_name: state.data[0].name,
      };
      setFormValues(data);
    } else {
      navigate(-1);
    }
    return () => {

    };
  }, []);

  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

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

  const handleSubmit = () => {
    const data = {
      id: formValues.product_category_id,
      name: formValues.product_category_name,
    };
    dispatch(updateCategory(data));
  };

  return (
    <>
      <PaperContainer elevation={3} square>
        <TitleWithDivider>Update Product Category</TitleWithDivider>
        <SubHeader>
          <BasicInput isUpdate fields={fields} onSubmit={handleSubmit}/>
        </SubHeader>
      </PaperContainer>
    </>
  );
};

export default UpdateProductCategory;

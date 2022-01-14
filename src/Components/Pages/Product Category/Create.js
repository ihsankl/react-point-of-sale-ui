import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {SubHeader, PaperContainer, TitleWithDivider} from '../../../layout';
import {createCategory} from '../../../Redux/Slicer/Category';
import BasicInput from '../../BasicInput';

const defaultValues = {
  product_category_name: '',
};

const CreateProductCategory = () => {
  const dispatch = useDispatch();
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

  const fields = [
    {
      id: 'product_category_name',
      label: 'Name',
      onChange: handleInputChange,
      value: formValues.product_category_name,
    },
  ];
  return (
    <PaperContainer elevation={3} square>
      <TitleWithDivider>Create Product Category</TitleWithDivider>
      <SubHeader>
        <BasicInput fields={fields} onSubmit={handleSubmit} />
      </SubHeader>
    </PaperContainer>
  );
};

export default CreateProductCategory;

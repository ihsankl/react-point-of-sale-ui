import React, {useEffect, useState} from 'react';
import {SubHeader, PaperContainer, TitleWithDivider} from '../../../layout';
import BasicInput from '../../BasicInput';

const defaultValues = {
  product_category_name: '',
};

const UpdateProductCategory = () => {
  const [formValues, setFormValues] = useState(defaultValues);

  useEffect(() => {
    // get data from backend first
    // then set the formValues
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
    },
  ];

  return (
    <PaperContainer elevation={3} square>
      <TitleWithDivider>Update Product Category</TitleWithDivider>
      <SubHeader>
        <BasicInput isUpdate fields={fields} onSubmit={null}/>
      </SubHeader>
    </PaperContainer>
  );
};

export default UpdateProductCategory;

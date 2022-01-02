import React, {useState} from 'react';
import {ContentContainer, PaperContainer, Title} from '../../../layout';
import BasicInput from '../../BasicInput';

const defaultValues = {
  product_category_name: '',
};


const CreateProductCategory = () => {
  const [formValues, setFormValues] = useState(defaultValues);

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
      <Title>Create Product Category</Title>
      <ContentContainer>
        <BasicInput fields={fields} onSubmit={null} />
      </ContentContainer>

    </PaperContainer>
  );
};

export default CreateProductCategory;

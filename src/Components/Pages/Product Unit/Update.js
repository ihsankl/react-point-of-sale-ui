import React, {useEffect, useState} from 'react';
import {ContentContainer, PaperContainer, Title} from '../../../layout';
import BasicInput from '../../BasicInput';

const defaultValues = {
  product_unit_name: '',
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
      id: 'product_unit_name',
      label: 'Name',
      onChange: handleInputChange,
      value: formValues.product_unit_name,
    },
  ];

  return (
    <PaperContainer elevation={3} square>
      <Title>Update Customer</Title>
      <ContentContainer>
        <BasicInput isUpdate fields={fields} onSubmit={null}/>
      </ContentContainer>
    </PaperContainer>
  );
};

export default UpdateProductCategory;

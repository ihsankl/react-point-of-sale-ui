import React, {useState} from 'react';
import {SubHeader, PaperContainer, Title} from '../../../layout';
import BasicInput from '../../BasicInput';

const defaultValues = {
  product_unit_name: '',
};


const CreateProductUnit = () => {
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
      id: 'product_unit_name',
      label: 'Name',
      onChange: handleInputChange,
      value: formValues.product_unit_name,
    },
  ];
  return (
    <PaperContainer elevation={3} square>
      <Title>Create Product Unit</Title>
      <SubHeader>
        <BasicInput fields={fields} onSubmit={null} />
      </SubHeader>
    </PaperContainer>
  );
};

export default CreateProductUnit;

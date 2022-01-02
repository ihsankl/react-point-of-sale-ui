import React, {useState} from 'react';
import {ContentContainer, PaperContainer, Title} from '../../../layout';
import BasicInput from '../../BasicInput';

const defaultValues = {
  customer_code: '',
  customer_name: '',
  customer_address: '',
  customer_contact: '',
};


const CreateSupplier = () => {
  const [formValues, setFormValues] = useState(defaultValues);

  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const customerFields = [
    {id: 'customer_code', label: 'Code', onChange: handleInputChange},
    {id: 'customer_name', label: 'Name', onChange: handleInputChange},
    {id: 'customer_address', label: 'Address', onChange: handleInputChange},
    {id: 'customer_contact', label: 'Contact', onChange: handleInputChange},
  ];
  return (
    <PaperContainer elevation={3} square>
      <Title>Create Customer</Title>
      <ContentContainer>
        <BasicInput fields={customerFields} onSubmit={null} />
      </ContentContainer>

    </PaperContainer>
  );
};

export default CreateSupplier;

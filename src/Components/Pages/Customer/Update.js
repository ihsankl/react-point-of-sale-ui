import React, {useEffect, useState} from 'react';
import {ContentContainer, PaperContainer, Title} from '../../../layout';
import BasicInput from '../../BasicInput';

const defaultValues = {
  customer_code: '',
  customer_name: '',
  customer_address: '',
  customer_contact: '',
  customer_id: 0,
};

const UpdateCustomer = () => {
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
      id: 'customer_code',
      label: 'Code',
      onChange: handleInputChange,
      value: formValues.customer_code,
    },
    {
      id: 'customer_name',
      label: 'Name',
      onChange: handleInputChange,
      value: formValues.customer_name,
    },
    {
      id: 'customer_address',
      label: 'Address',
      onChange: handleInputChange,
      value: formValues.customer_address,
    },
    {
      id: 'customer_contact',
      label: 'Contact',
      onChange: handleInputChange,
      value: formValues.customer_contact,
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

export default UpdateCustomer;

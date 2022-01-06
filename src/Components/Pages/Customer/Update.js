import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {SubHeader, PaperContainer, TitleWithDivider} from '../../../layout';
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
  const urlParams = useParams();

  useEffect(() => {
    // get data from backend first
    // then set the formValues
    console.log(urlParams.id);
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
      <TitleWithDivider>Update Customer</TitleWithDivider>
      <SubHeader>
        <BasicInput isUpdate fields={fields} onSubmit={null} />
      </SubHeader>
    </PaperContainer>
  );
};

export default UpdateCustomer;

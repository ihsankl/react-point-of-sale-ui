import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {SubHeader, PaperContainer, TitleWithDivider} from '../../../layout';
import {createCustomer} from '../../../Redux/Slicer/Customer';
import BasicInput from '../../BasicInput';

const defaultValues = {
  customer_code: '',
  customer_name: '',
  customer_address: '',
  customer_contact: '',
};

const CreateCustomer = () => {
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
      code: formValues.customer_code,
      name: formValues.customer_name,
      address: formValues.customer_address,
      contact: formValues.customer_contact,
    };
    dispatch(createCustomer(data));
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
      <TitleWithDivider>Create Customer</TitleWithDivider>
      <SubHeader>
        <BasicInput fields={fields} onSubmit={handleSubmit} />
      </SubHeader>
    </PaperContainer>
  );
};

export default CreateCustomer;

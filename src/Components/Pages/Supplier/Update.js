import React, {useEffect, useState} from 'react';
import {SubHeader, PaperContainer, TitleWithDivider} from '../../../layout';
import BasicInput from '../../BasicInput';

const defaultValues = {
  supplier_code: '',
  supplier_name: '',
  supplier_address: '',
  supplier_email: '',
  supplier_contact: '',
};

const UpdateSupplier = () => {
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
      id: 'supplier_code',
      label: 'Code',
      onChange: handleInputChange,
      value: formValues.supplier_code,
    },
    {
      id: 'supplier_name',
      label: 'Name',
      onChange: handleInputChange,
      value: formValues.supplier_name,
    },
    {
      id: 'supplier_address',
      label: 'Address',
      onChange: handleInputChange,
      value: formValues.supplier_address,
    },
    {
      id: 'supplier_contact',
      label: 'Contact',
      onChange: handleInputChange,
      value: formValues.supplier_contact,
    },
  ];

  return (
    <PaperContainer elevation={3} square>
      <TitleWithDivider>Update Supplier</TitleWithDivider>
      <SubHeader>
        <BasicInput isUpdate fields={fields} onSubmit={null}/>
      </SubHeader>
    </PaperContainer>
  );
};

export default UpdateSupplier;

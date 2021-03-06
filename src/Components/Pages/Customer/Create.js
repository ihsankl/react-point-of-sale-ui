/* eslint-disable camelcase */
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {isNumber} from '../../../helper';
import {SubHeader, PaperContainer, TitleWithDivider} from '../../../layout';
import {setSuccess, unsetMountPage} from '../../../Redux/Slicer/AppState';
import {clearSuccess, createCustomer} from '../../../Redux/Slicer/Customer';
import BasicInput from '../../BasicInput';

const defaultValues = {
  customer_code: '',
  customer_name: '',
  customer_address: '',
  customer_contact: '',
};

const CreateCustomer = () => {
  const dispatch = useDispatch();
  const CustomerState = useSelector((state) => state.Customer);
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

  useEffect(() => {
    if (CustomerState.isSuccess) {
      dispatch(setSuccess());
      dispatch(unsetMountPage('customer'));
      setTimeout(() => {
        dispatch(clearSuccess());
      }, 5000);
    }

    return () => {

    };
  }, [CustomerState]);


  const fieldsInitState = [
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
      error: !isNumber(formValues.customer_contact),
      helperText: isNumber(formValues.customer_contact) ?
      '' : 'Contact must be a number',
    },
  ];

  return (
    <>
      <PaperContainer elevation={3} square>
        <TitleWithDivider>Create Customer</TitleWithDivider>
        <SubHeader>
          <BasicInput fields={fieldsInitState} onSubmit={handleSubmit} />
        </SubHeader>
      </PaperContainer>
    </>
  );
};

export default CreateCustomer;

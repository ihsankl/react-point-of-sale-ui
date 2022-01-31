import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useLocation, useNavigate} from 'react-router-dom';
import {isNumber} from '../../../helper';
import {SubHeader, PaperContainer, TitleWithDivider} from '../../../layout';
import {setSuccess} from '../../../Redux/Slicer/AppState';
import {clearSuccess, updateCustomer} from '../../../Redux/Slicer/Customer';
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
  const CustomerState = useSelector((state) => state.Customer);
  const dispatch = useDispatch();
  const {state} = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!!state) {
      const data = {
        customer_code: state.data[0].code,
        customer_name: state.data[0].name,
        customer_address: state.data[0].address,
        customer_contact: state.data[0].contact,
        customer_id: state.data[0].id,
      };
      setFormValues(data);
    } else {
      navigate(-1);
    }

    return () => {

    };
  }, []);

  useEffect(() => {
    if (CustomerState.isSuccess) {
      dispatch(setSuccess());
      setTimeout(() => {
        dispatch(clearSuccess());
      }, 5000);
    }

    return () => {

    };
  }, [CustomerState]);

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
      error: !isNumber(formValues.customer_contact),
      helperText: isNumber(formValues.customer_contact) ?
      '' : 'Contact must be a number',

    },
  ];

  const handleSubmit = () => {
    const data = {
      id: formValues.customer_id,
      code: formValues.customer_code,
      name: formValues.customer_name,
      address: formValues.customer_address,
      contact: formValues.customer_contact,
    };
    dispatch(updateCustomer(data));
  };

  return (
    <>
      <PaperContainer elevation={3} square>
        <TitleWithDivider>Update Customer</TitleWithDivider>
        <SubHeader>
          <BasicInput isUpdate fields={fields} onSubmit={handleSubmit} />
        </SubHeader>
      </PaperContainer>
    </>
  );
};

export default UpdateCustomer;

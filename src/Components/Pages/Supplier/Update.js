import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useLocation, useNavigate} from 'react-router-dom';
import {SubHeader, PaperContainer, TitleWithDivider} from '../../../layout';
import {updateSupplier} from '../../../Redux/Slicer/Supplier';
import BasicInput from '../../BasicInput';

const defaultValues = {
  supplier_id: 0,
  supplier_code: '',
  supplier_name: '',
  supplier_address: '',
  supplier_email: '',
  supplier_contact: '',
};

const UpdateSupplier = () => {
  const [formValues, setFormValues] = useState(defaultValues);
  const mount = useSelector((state) => state.AppState.pageMount.supplier);
  const SupplierState = useSelector((state) => state.Supplier);
  const dispatch = useDispatch();
  const {state} = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!!state) {
      const data = {
        supplier_id: state.data[0].id,
        supplier_code: state.data[0].code,
        supplier_name: state.data[0].name,
        supplier_address: state.data[0].address,
        supplier_email: state.data[0].email,
        supplier_contact: state.data[0].contact,
      };
      setFormValues(data);
    } else {
      navigate(-1);
    }
    return () => {

    };
  }, [mount]);

  useEffect(() => {
    if (SupplierState.isSuccess) {
      dispatch(setSuccess());
      dispatch(unsetMountPage('supplier'));
      dispatch(unsetMountPage('purchase_order'));
      dispatch(unsetMountPage('receive_product'));
      setTimeout(() => {
        dispatch(clearSuccess());
      }, 5000);
    }

    return () => {

    };
  }, [SupplierState]);

  const handleSubmit = () => {
    const data = {
      id: formValues.supplier_id,
      code: formValues.supplier_code,
      name: formValues.supplier_name,
      address: formValues.supplier_address,
      email: formValues.supplier_email,
      contact: formValues.supplier_contact,
    };
    dispatch(updateSupplier(data));
  };

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
    <>
      <PaperContainer elevation={3} square>
        <TitleWithDivider>Update Supplier</TitleWithDivider>
        <SubHeader>
          <BasicInput isUpdate fields={fields} onSubmit={handleSubmit}/>
        </SubHeader>
      </PaperContainer>
    </>
  );
};

export default UpdateSupplier;

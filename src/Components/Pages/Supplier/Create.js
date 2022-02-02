import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {SubHeader, PaperContainer, TitleWithDivider} from '../../../layout';
import {setSuccess, unsetMountPage} from '../../../Redux/Slicer/AppState';
import {clearSuccess, createSupplier} from '../../../Redux/Slicer/Supplier';
import BasicInput from '../../BasicInput';

const defaultValues = {
  supplier_code: '',
  supplier_name: '',
  supplier_address: '',
  supplier_email: '',
  supplier_contact: '',
};

const CreateSupplier = () => {
  const dispatch = useDispatch();
  const [formValues, setFormValues] = useState(defaultValues);
  const SupplierState = useSelector((state) => state.Supplier);

  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  React.useEffect(() => {
    if (SupplierState.isSuccess) {
      dispatch(setSuccess());
      dispatch(unsetMountPage('receive_product'));
      setTimeout(() => {
        dispatch(clearSuccess());
      }, 5000);
    }

    return () => {

    };
  }, [SupplierState]);

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
      id: 'supplier_email',
      label: 'Email',
      onChange: handleInputChange,
      value: formValues.supplier_email,
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

  const handleSubmit = () => {
    const data = {
      code: formValues.supplier_code,
      name: formValues.supplier_name,
      address: formValues.supplier_address,
      email: formValues.supplier_email,
      contact: formValues.supplier_contact,
    };
    dispatch(createSupplier(data));
  };

  return (
    <>
      <PaperContainer elevation={3} square>
        <TitleWithDivider>Create Supplier</TitleWithDivider>
        <SubHeader>
          <BasicInput fields={fields} onSubmit={handleSubmit} />
        </SubHeader>
      </PaperContainer>
    </>
  );
};

export default CreateSupplier;

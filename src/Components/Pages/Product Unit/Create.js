import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {SubHeader, PaperContainer, TitleWithDivider} from '../../../layout';
import {setSuccess} from '../../../Redux/Slicer/AppState';
import {
  clearSuccess,
  createProductUnit,
} from '../../../Redux/Slicer/Product Unit';
import BasicInput from '../../BasicInput';

const defaultValues = {
  product_unit_name: '',
};

const CreateProductUnit = () => {
  const dispatch = useDispatch();
  const ProductUnitState = useSelector((state) => state.ProductUnit);
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
      name: formValues.product_unit_name,
    };
    dispatch(createProductUnit(data));
  };

  React.useEffect(() => {
    if (ProductUnitState.isSuccess) {
      dispatch(setSuccess());
      dispatch(unsetMountPage('unit'));
      dispatch(unsetMountPage('product'));
      setTimeout(() => {
        dispatch(clearSuccess());
      }, 5000);
    }

    return () => {

    };
  }, [ProductUnitState]);

  const fields = [
    {
      id: 'product_unit_name',
      label: 'Name',
      onChange: handleInputChange,
      value: formValues.product_unit_name,
      error: !formValues.product_unit_name,
      helperText: !!formValues.product_unit_name ?
      '' : 'Please enter product unit name',
    },
  ];
  return (
    <>
      <PaperContainer elevation={3} square>
        <TitleWithDivider>Create Product Unit</TitleWithDivider>
        <SubHeader>
          <BasicInput fields={fields} onSubmit={handleSubmit} />
        </SubHeader>
      </PaperContainer>
    </>
  );
};

export default CreateProductUnit;

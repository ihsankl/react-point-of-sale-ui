import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {SubHeader, PaperContainer, TitleWithDivider} from '../../../layout';
import {createProductUnit} from '../../../Redux/Slicer/Product Unit';
import BasicInput from '../../BasicInput';

const defaultValues = {
  product_unit_name: '',
};

const CreateProductUnit = () => {
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
      name: formValues.product_unit_name,
    };
    dispatch(createProductUnit(data));
  };

  const fields = [
    {
      id: 'product_unit_name',
      label: 'Name',
      onChange: handleInputChange,
      value: formValues.product_unit_name,
    },
  ];
  return (
    <PaperContainer elevation={3} square>
      <TitleWithDivider>Create Product Unit</TitleWithDivider>
      <SubHeader>
        <BasicInput fields={fields} onSubmit={handleSubmit} />
      </SubHeader>
    </PaperContainer>
  );
};

export default CreateProductUnit;

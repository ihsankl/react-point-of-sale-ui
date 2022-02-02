import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useLocation, useNavigate} from 'react-router-dom';
import {SubHeader, PaperContainer, TitleWithDivider} from '../../../layout';
import {setSuccess, unsetMountPage} from '../../../Redux/Slicer/AppState';
import {
  clearSuccess,
  updateProductUnit,
} from '../../../Redux/Slicer/Product Unit';
import BasicInput from '../../BasicInput';

const defaultValues = {
  product_unit_id: '',
  product_unit_name: '',
};

const UpdateProductCategory = () => {
  const [formValues, setFormValues] = useState(defaultValues);
  const ProductUnitState = useSelector((state) => state.ProductUnit);
  const dispatch = useDispatch();
  const {state} = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!!state) {
      const data = {
        product_unit_id: state.data[0].id,
        product_unit_name: state.data[0].name,
      };
      setFormValues(data);
    } else {
      navigate(-1);
    }
    return () => {

    };
  }, []);

  useEffect(() => {
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

  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    const data = {
      id: formValues.product_unit_id,
      name: formValues.product_unit_name,
    };
    dispatch(updateProductUnit(data));
  };


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
        <TitleWithDivider>Update Product Unit</TitleWithDivider>
        <SubHeader>
          <BasicInput isUpdate fields={fields} onSubmit={handleSubmit}/>
        </SubHeader>
      </PaperContainer>
    </>
  );
};

export default UpdateProductCategory;

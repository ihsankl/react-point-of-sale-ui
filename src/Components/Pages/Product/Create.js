// /* eslint-disable */
import {
  Autocomplete,
  FormHelperText,
  TextField,
} from '@mui/material';
import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import {
  FormControlContainer,
  PaperContainer,
  SubHeader,
  TitleWithDivider,
} from '../../../layout';
// eslint-disable-next-line no-unused-vars
import {clearSuccess, createProduct} from '../../../Redux/Slicer/Product';
import BasicInput from '../../BasicInput';
import {isNumber} from '../../../helper';
import {getProductUnit} from '../../../Redux/Slicer/Product Unit';
import {getAllCategory} from '../../../Redux/Slicer/Category';
import {setSuccess, unsetMountPage} from '../../../Redux/Slicer/AppState';

const defaultValues = {
  product_code: '',
  product_name: '',
  product_unit_in_stock: '',
  product_disc_percentage: '',
  product_unit_price: '',
  product_re_order_level: '',
  product_unit_id: '',
  product_category_id: '',
  product_distributor_price: '',
};

const CreateProduct = () => {
  const dispatch = useDispatch();
  const ProductUnit = useSelector((state) => state.ProductUnit);
  const ProductState = useSelector((state) => state.Product);
  const ProductUnitData = ProductUnit.data?.data ?? [];
  const Category = useSelector((state) => state.Category);
  const CategoryData = Category.data?.data ?? [];
  const AppState = useSelector((state) => state.AppState);
  const UserData = AppState.userData;
  const [mount, setMount] = useState(false);
  const [formValues, setFormValues] = useState(defaultValues);
  const [productUnitValue, setProductUnitValue] = useState('');
  const [productCategoryValue, setProductCategoryValue] = useState('');

  useEffect(() => {
    if (!mount && ProductUnitData.length === 0 || CategoryData.length === 0) {
      getUnitAndCategory();
      setMount(true);
    }
    return () => {

    };
  }, [mount]);

  const getUnitAndCategory = async () => {
    await dispatch(getProductUnit()).unwrap();
    await dispatch(getAllCategory()).unwrap();
  };

  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    const data = {
      code: formValues.product_code,
      name: formValues.product_name,
      unit_in_stock: formValues.product_unit_in_stock,
      disc_percentage: formValues.product_disc_percentage,
      unit_price: formValues.product_unit_price,
      re_order_level: formValues.product_re_order_level,
      unit_id: formValues.product_unit_id,
      category_id: formValues.product_category_id,
      user_id: UserData.id,
      distributor_price: formValues.product_distributor_price,
    };
    dispatch(createProduct(data));
  };

  useEffect(() => {
    if (ProductState.isSuccess) {
      dispatch(setSuccess());
      dispatch(unsetMountPage('product'));
      dispatch(unsetMountPage('purchase_order'));
      dispatch(unsetMountPage('receive_product'));
      setTimeout(() => {
        dispatch(clearSuccess());
      }, 5000);
    }
    return () => {

    };
  }, [ProductState]);

  const fields = [
    {
      id: 'product_code',
      label: 'Code',
      onChange: handleInputChange,
      value: formValues.product_code,
      error: !formValues.product_code,
      helperText: formValues.product_code ? '' : 'Code is required',
    },
    {
      id: 'product_name',
      label: 'Name',
      onChange: handleInputChange,
      value: formValues.product_name,
      error: !formValues.product_name,
      helperText: !!formValues.product_name ? '' : 'Name is required',
    },
    {
      id: 'product_unit_in_stock',
      label: 'Unit in Stock',
      onChange: handleInputChange,
      type: 'number',
      value: formValues.product_unit_in_stock,
      error: !isNumber(formValues.product_unit_in_stock),
      helperText: isNumber(formValues.product_unit_in_stock) ?
      '' : 'Unit in Stock must be a number',
    },
    {
      id: 'product_disc_percentage',
      label: 'Disc Percentage',
      type: 'number',
      onChange: handleInputChange,
      value: formValues.product_disc_percentage,
    },
    {
      id: 'product_unit_price',
      label: 'Unit Price',
      type: 'number',
      onChange: handleInputChange,
      value: formValues.product_unit_price,
      error: !isNumber(formValues.product_unit_price),
      helperText: isNumber(formValues.product_unit_price) ?
      '' : 'Unit Price must be a number',
    },
    {
      id: 'product_distributor_price',
      label: 'Distributor Price',
      type: 'number',
      onChange: handleInputChange,
      value: formValues.product_distributor_price,
    },
    {
      id: 'product_re_order_level',
      label: 'Re-Order Level',
      onChange: handleInputChange,
      value: formValues.product_re_order_level,
    },
  ];

  return (
    <>
      <PaperContainer elevation={3} square>
        <TitleWithDivider>Create Product</TitleWithDivider>
        <SubHeader>
          <BasicInput fields={fields} onSubmit={handleSubmit}>
            <FormControlContainer>
              <Autocomplete
                value={productUnitValue}
                onChange={(event, newValue) => {
                  const value = {...formValues};
                  value.product_unit_id = newValue?.id;
                  setProductUnitValue(newValue?.name);
                  setFormValues(value);
                }}
                name="product_unit_id"
                id="product_unit_id_label"
                options={ProductUnitData.map((item) => {
                  return {
                    ...item, label: `${item.name}`,
                  };
                })}
                // eslint-disable-next-line max-len
                renderInput={(params) => <TextField error={!formValues.product_unit_id} {...params} label="Product Unit" />}
              />
              {!formValues.product_unit_id &&
                <FormHelperText error={!formValues.product_unit_id}>
                  Product Unit is required
                </FormHelperText>
              }
            </FormControlContainer>
            <FormControlContainer>
              <Autocomplete
                value={productCategoryValue}
                onChange={(event, newValue) => {
                  const value = {...formValues};
                  value.product_category_id = newValue?.id;
                  setProductCategoryValue(newValue?.name);
                  setFormValues(value);
                }}
                name="product_category_id"
                id="product_category_id_label"
                options={CategoryData.map((item) => {
                  return {
                    ...item, label: `${item.name}`,
                  };
                })}
                // eslint-disable-next-line max-len
                renderInput={(params) => <TextField error={!formValues.product_category_id} {...params} label="Product Category" />}
              />
              {!formValues.product_category_id &&
                <FormHelperText error={!formValues.product_category_id}>
                  Product Category is required
                </FormHelperText>
              }
            </FormControlContainer>
            <FormControlContainer>
              <TextField
                id={'product_user_id'}
                label={'User'}
                name={'product_user_id'}
                defaultValue={UserData.username}
                disabled
                variant="outlined"
                fullWidth
              />
            </FormControlContainer>
          </BasicInput>
        </SubHeader>
      </PaperContainer>
    </>
  );
};

export default CreateProduct;

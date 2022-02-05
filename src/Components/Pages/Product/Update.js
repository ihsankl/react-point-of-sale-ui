// /* eslint-disable */
import {
  Autocomplete,
  FormHelperText,
  TextField,
} from '@mui/material';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useLocation, useNavigate} from 'react-router-dom';
import {
  FormControlContainer,
  PaperContainer,
  SubHeader,
  TitleWithDivider,
} from '../../../layout';
// eslint-disable-next-line no-unused-vars
import {clearSuccess, updateProduct} from '../../../Redux/Slicer/Product';
import BasicInput from '../../BasicInput';
import {isNumber} from '../../../helper';
import {getAllCategory} from '../../../Redux/Slicer/Category';
import {getProductUnit} from '../../../Redux/Slicer/Product Unit';
import {setSuccess, unsetMountPage} from '../../../Redux/Slicer/AppState';

const defaultValues = {
  product_id: '',
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

const UpdateProduct = () => {
  const [formValues, setFormValues] = useState(defaultValues);
  const [mount, setMount] = useState(false);
  const [productUnitValue, setProductUnitValue] = useState('');
  const [productCategoryValue, setProductCategoryValue] = useState('');
  const dispatch = useDispatch();
  const {state} = useLocation();
  const navigate = useNavigate();
  const ProductUnit = useSelector((state) => state.ProductUnit);
  const AppState = useSelector((state) => state.AppState);
  const ProductState = useSelector((state) => state.Product);
  const ProductUnitData = ProductUnit.data?.data ?? [];
  const Category = useSelector((state) => state.Category);
  const CategoryData = Category.data?.data ?? [];
  const UserData = AppState.userData;

  useEffect(() => {
    if (!!state) {
      const data = {
        product_id: state.data[0].id,
        product_code: state.data[0].code,
        product_name: state.data[0].name,
        product_unit_in_stock: state.data[0].unit_in_stock,
        product_disc_percentage: state.data[0].disc_percentage,
        product_unit_price: state.data[0].unit_price,
        product_re_order_level: state.data[0].re_order_level,
        product_unit_id: state.data[0].unit_id,
        product_category_id: state.data[0].category_id,
        product_user_id: state.data[0].user_id,
        product_distributor_price: state.data[0].distributor_price,
      };
      // eslint-disable-next-line max-len
      const findUnit = ProductUnitData.find((unit) => unit.id === data.product_unit_id);
      // eslint-disable-next-line max-len
      const findCategory = CategoryData.find((category) => category.id === data.product_category_id);
      setProductCategoryValue(findCategory?.name);
      setProductUnitValue(findUnit?.name);
      setFormValues(data);
    } else {
      navigate(-1);
    }
    if (!mount && CategoryData.length < 1 || ProductUnitData.length < 1) {
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

  const handleSubmit = () => {
    const data = {
      id: formValues.product_id,
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
    dispatch(updateProduct(data));
  };

  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
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
      helperText: !!formValues.product_code ?
      '' : 'Product Code is Required',
    },
    {
      id: 'product_name',
      label: 'Name',
      onChange: handleInputChange,
      value: formValues.product_name,
      error: !formValues.product_name,
      helperText: !!formValues.product_name ?
      '' : 'Product Name is Required',
    },
    {
      id: 'product_unit_in_stock',
      label: 'Unit in Stock',
      onChange: handleInputChange,
      type: 'number',
      value: formValues.product_unit_in_stock,
      error: !isNumber(formValues.product_unit_in_stock),
      type: 'number',
      // eslint-disable-next-line max-len
      helperText: isNumber(formValues.product_unit_in_stock) || formValues.product_unit_in_stock === 0?
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
      id: 'product_distributor_price',
      label: 'Distributor Price',
      type: 'number',
      onChange: handleInputChange,
      value: formValues.product_distributor_price,
    },
    {
      id: 'product_unit_price',
      label: 'Unit Price',
      type: 'number',
      onChange: handleInputChange,
      value: formValues.product_unit_price,
      error: !isNumber(formValues.product_unit_price),
      type: 'number',
      // eslint-disable-next-line max-len
      helperText: isNumber(formValues.product_unit_price) || formValues.product_unit_price === 0?
      '' : 'Unit Price must be a number',
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
        <TitleWithDivider>Update Product</TitleWithDivider>
        <SubHeader>
          <BasicInput isUpdate fields={fields} onSubmit={handleSubmit}>
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

export default UpdateProduct;

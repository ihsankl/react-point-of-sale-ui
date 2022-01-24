import {DesktopDatePicker, LocalizationProvider} from '@mui/lab';
import {
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import DateAdapter from '@mui/lab/AdapterDayjs';
import React, {useEffect, useState} from 'react';
import {
  FormControlContainer,
  PaperContainer,
  SubHeader,
  TitleWithDivider,
} from '../../../layout';
import BasicInput from '../../BasicInput';
import {updatePurchaseOrder} from '../../../Redux/Slicer/Purchase Order';
import {useDispatch, useSelector} from 'react-redux';
import {useLocation, useNavigate} from 'react-router-dom';
import {getSupplier} from '../../../Redux/Slicer/Supplier';
import {getProduct} from '../../../Redux/Slicer/Product';

const defaultValues = {
  purchase_order_id: '',
  purchase_order_qty: '',
  purchase_order_sub_total: '',
  purchase_order_order_date: new Date(),
  purchase_order_unit_price: '',
  purchase_order_product_id: '',
  purchase_order_supplier_id: '',
};

const UpdatePurchaseOrder = () => {
  const [formValues, setFormValues] = useState(defaultValues);
  const [mount, setmount] = useState(false);
  const dispatch = useDispatch();
  const {state} = useLocation();
  const navigate = useNavigate();
  const Supplier = useSelector((x) => x.Supplier);
  const AppState = useSelector((x) => x.AppState);
  const Product = useSelector((x) => x.Product);
  const SupplierData = Supplier.data?.data ?? [];
  const ProductData = Product.data?.data ?? [];
  const UserData = AppState.userData;

  useEffect(() => {
    if (!!state) {
      const data = {
        purchase_order_id: state.data[0].id,
        purchase_order_qty: state.data[0].qty,
        purchase_order_sub_total: state.data[0].sub_total,
        purchase_order_order_date: state.data[0].order_date,
        purchase_order_unit_price: state.data[0].unit_price,
        purchase_order_product_id: state.data[0].product_id,
        purchase_order_user_id: state.data[0].user_id,
        purchase_order_supplier_id: state.data[0].supplier_id,
      };
      setFormValues(data);
    } else {
      navigate(-1);
    }
    if (!mount) {
      getProductAndSupplier();
      setmount(true);
    }
    return () => {

    };
  }, [mount]);

  const getProductAndSupplier = async () => {
    await dispatch(getSupplier()).unwrap();
    await dispatch(getProduct()).unwrap();
  };

  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleDateChange = (newValue) => {
    const value = {...formValues};
    value.purchase_order_order_date = newValue;
    setFormValues(value);
  };

  const fields = [
    {
      id: 'purchase_order_qty',
      label: 'Quantity',
      onChange: handleInputChange,
      value: formValues.purchase_order_qty,
      error: !formValues.purchase_order_qty,
      helperText: !!formValues.purchase_order_qty ? '' : 'Quantity is required',
    },
    {
      id: 'purchase_order_sub_total',
      label: 'Sub Total',
      onChange: handleInputChange,
      value: formValues.purchase_order_sub_total,
      error: !formValues.purchase_order_sub_total,
      helperText: !!formValues.purchase_order_sub_total ?
      '' : 'Sub Total is required',
    },
    {
      id: 'purchase_order_unit_price',
      label: 'Unit Price',
      onChange: handleInputChange,
      value: formValues.purchase_order_unit_price,
      error: !formValues.purchase_order_unit_price,
      helperText: !!formValues.purchase_order_unit_price ?
      '' : 'Unit Price is required',
    },
  ];

  const handleSubmit = () => {
    const data = {
      id: formValues.purchase_order_id,
      qty: formValues.purchase_order_qty,
      sub_total: formValues.purchase_order_sub_total,
      order_date: formValues.purchase_order_order_date,
      unit_price: formValues.purchase_order_unit_price,
      product_id: formValues.purchase_order_product_id,
      user_id: UserData.id,
      supplier_id: formValues.purchase_order_supplier_id,
    };
    dispatch(updatePurchaseOrder(data));
  };

  return (
    <>
      <PaperContainer elevation={3} square>
        <TitleWithDivider>Update Purchase Order</TitleWithDivider>
        <SubHeader>
          <BasicInput isUpdate fields={fields} onSubmit={handleSubmit}>
            <FormControlContainer>
              <LocalizationProvider dateAdapter={DateAdapter}>
                <DesktopDatePicker
                  label="Order Date"
                  labelId="purchase_order_order_date_label"
                  inputFormat="YYYY-MM-DD"
                  mask='____-__-__'
                  name="purchase_order_order_date"
                  id="purchase_order_order_date"
                  value={formValues.purchase_order_order_date}
                  onChange={handleDateChange}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </FormControlContainer>
            <FormControlContainer>
              <InputLabel
                id="purchase_order_supplier_id_label"
              >
                Supplier
              </InputLabel>
              <Select
                error={!formValues.purchase_order_supplier_id}
                labelId="purchase_order_supplier_id_label"
                id="purchase_order_supplier_id"
                name="purchase_order_supplier_id"
                label="Supplier"
                value={formValues.purchase_order_supplier_id}
                onChange={handleInputChange}
              >
                {SupplierData.map((value) => (
                  <MenuItem key={value.id} value={value.id}>
                    {value.name}
                  </MenuItem>
                ))}
              </Select>
              {!formValues.purchase_order_supplier_id &&
              <FormHelperText error={!formValues.purchase_order_supplier_id}>
                Supplier is required
              </FormHelperText>
              }
            </FormControlContainer>
            <FormControlContainer>
              <InputLabel
                id="purchase_order_product_id_label"
              >
                Product
              </InputLabel>
              <Select
                error={!formValues.purchase_order_product_id}
                labelId="purchase_order_product_id_label"
                id="purchase_order_product_id"
                name="purchase_order_product_id"
                label="Product"
                value={formValues.purchase_order_product_id}
                onChange={handleInputChange}
              >
                {ProductData.map((value) => (
                  <MenuItem key={value.id} value={value.id}>
                    {value.name}
                  </MenuItem>
                ))}
              </Select>
              {!formValues.purchase_order_product_id &&
              <FormHelperText error={!formValues.purchase_order_product_id}>
                Product is required
              </FormHelperText>
              }
            </FormControlContainer>
            <FormControlContainer>
              <TextField
                id={'purchase_order_user_id'}
                label={'User'}
                name={'purchase_order_user_id'}
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

export default UpdatePurchaseOrder;

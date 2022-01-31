import {DesktopDatePicker, LocalizationProvider} from '@mui/lab';
import {TextField} from '@mui/material';
import React, {useEffect, useState} from 'react';
import {
  FormControlContainer,
  PaperContainer,
  SubHeader,
  TitleWithDivider,
} from '../../../layout';
import BasicInput from '../../BasicInput';
import DateAdapter from '@mui/lab/AdapterDayjs';
import {useLocation, useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {clearSuccess, updateInvoice} from '../../../Redux/Slicer/Invoice';
import dayjs from 'dayjs';
import {isNumber} from '../../../helper';
import {setSuccess} from '../../../Redux/Slicer/AppState';

const defaultValues = {
  invoice_id: '',
  invoice_total_amount: '',
  invoice_amount_tendered: 0,
  invoice_date_recorded: new Date(),
  invoice_customer_id: 1,
};

const UpdateInvoice = () => {
  const [formValues, setFormValues] = useState(defaultValues);
  const dispatch = useDispatch();
  const AppState = useSelector((state) => state.AppState);
  const InvoiceState = useSelector((state) => state.Invoice);
  const UserData = AppState.userData;
  const {state} = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // get data from previous page first
    // then set the formValues
    if (!!state) {
      const data = {
        invoice_id: state.data[0].id,
        invoice_total_amount: state.data[0].total_amount,
        invoice_amount_tendered: state.data[0].amount_tendered,
        // eslint-disable-next-line max-len
        invoice_date_recorded: new Date(state.data[0].date_recorded),
        invoice_user_id: state.data[0].user_id,
        invoice_customer_id: state.data[0].customer_id,
      };
      setFormValues(data);
    } else {
      navigate(-1);
    }
    return () => {

    };
  }, []);

  useEffect(() => {
    if (InvoiceState.isSuccess) {
      dispatch(setSuccess());
      setTimeout(() => {
        dispatch(clearSuccess());
      }, 5000);
    }

    return () => {

    };
  }, [InvoiceState]);

  const handleSubmit = () => {
    const data = {
      id: formValues.invoice_id,
      total_amount: formValues.invoice_total_amount,
      amount_tendered: !!formValues.invoice_amount_tendered ?? 0,
      // eslint-disable-next-line max-len
      date_recorded: dayjs(formValues.invoice_date_recorded).format('YYYY-MM-DD'),
      user_id: UserData.id,
      customer_id: formValues.invoice_customer_id,
    };
    dispatch(updateInvoice(data));
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
    value.invoice_date_recorded = newValue;
    setFormValues(value);
  };

  const fields = [
    {
      id: 'invoice_total_amount',
      label: 'Total Amount',
      onChange: handleInputChange,
      value: formValues.invoice_total_amount,
      error: !isNumber(formValues.invoice_total_amount),
      helperText: isNumber(formValues.invoice_total_amount) ?
      '' : 'Total Amount must be a number',
    },
    {
      id: 'invoice_amount_tendered',
      label: 'Amount Tendered',
      onChange: handleInputChange,
      value: formValues.invoice_amount_tendered,
    },
  ];

  return (
    <>
      <PaperContainer elevation={3} square>
        <TitleWithDivider>Update Invoice</TitleWithDivider>
        <SubHeader>
          <BasicInput isUpdate fields={fields} onSubmit={handleSubmit}>
            <FormControlContainer>
              <LocalizationProvider dateAdapter={DateAdapter}>
                <DesktopDatePicker
                  label="Date Recorded"
                  labelId="invoice_date_recorded_label"
                  inputFormat="YYYY-DD-MM"
                  name="invoice_date_recorded"
                  mask='____-__-__'
                  id="invoice_date_recorded"
                  value={formValues.invoice_date_recorded}
                  onChange={handleDateChange}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </FormControlContainer>
            <FormControlContainer>
              <TextField
                id={'invoice_user_id'}
                label={'User'}
                name={'invoice_user_id'}
                defaultValue={UserData.username}
                disabled
                variant="outlined"
                fullWidth
              />
            </FormControlContainer>
            <FormControlContainer>
              <TextField
                id={'invoice_customer_id'}
                label={'Customer'}
                name={'invoice_customer_id'}
                defaultValue={formValues.invoice_customer_id}
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

export default UpdateInvoice;

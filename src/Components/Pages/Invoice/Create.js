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
import {useDispatch, useSelector} from 'react-redux';
import {clearSuccess, createInvoice} from '../../../Redux/Slicer/Invoice';
import dayjs from 'dayjs';
import {isNumber} from '../../../helper';
import {setSuccess, unsetMountPage} from '../../../Redux/Slicer/AppState';

const defaultValues = {
  invoice_total_amount: '',
  invoice_amount_tendered: 0,
  invoice_date_recorded: new Date(),
  invoice_customer_id: 1,
  invoice_note: '',
};

const CreateInvoice = () => {
  const dispatch = useDispatch();
  const AppState = useSelector((state) => state.AppState);
  const InvoiceState = useSelector((state) => state.Invoice);
  const UserData = AppState.userData;

  const [formValues, setFormValues] = useState(defaultValues);

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

  const handleSubmit = () => {
    const data = {
      total_amount: formValues.invoice_total_amount,
      // eslint-disable-next-line max-len
      amount_tendered: !!formValues.invoice_amount_tendered ? formValues.invoice_amount_tendered: 0,
      // eslint-disable-next-line max-len
      date_recorded: dayjs(formValues.invoice_date_recorded).format('YYYY-MM-DD'),
      user_id: UserData.id,
      customer_id: formValues.invoice_customer_id,
      note: formValues.invoice_note,
    };
    dispatch(createInvoice(data));
  };

  useEffect(() => {
    if (InvoiceState.isSuccess) {
      dispatch(setSuccess());
      dispatch(unsetMountPage('invoice'));
      setTimeout(() => {
        dispatch(clearSuccess());
      }, 5000);
    }

    return () => {

    };
  }, [InvoiceState]);

  const fields = [
    {
      id: 'invoice_total_amount',
      label: 'Total Amount',
      onChange: handleInputChange,
      type: 'number',
      value: formValues.invoice_total_amount,
      error: !isNumber(formValues.invoice_total_amount),
      helperText: isNumber(formValues.invoice_total_amount) ?
      '' : 'Total Amount must be a number',
    },
    {
      id: 'invoice_amount_tendered',
      label: 'Amount Tendered',
      type: 'number',
      onChange: handleInputChange,
      value: formValues.invoice_amount_tendered,
    },
    {
      id: 'invoice_note',
      label: 'Note',
      onChange: handleInputChange,
      value: formValues.invoice_note,
      multiline: true,
    },
  ];

  return (
    <>
      <PaperContainer elevation={3} square>
        <TitleWithDivider>Create Invoice</TitleWithDivider>
        <SubHeader>
          <BasicInput fields={fields} onSubmit={handleSubmit}>
            <FormControlContainer>
              <LocalizationProvider dateAdapter={DateAdapter}>
                <DesktopDatePicker
                  label="Date Recorded"
                  labelId="invoice_date_recorded_label"
                  inputFormat="YYYY-MM-DD"
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
                defaultValue={UserData?.username}
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

export default CreateInvoice;

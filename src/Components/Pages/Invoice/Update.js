import {DesktopDatePicker, LocalizationProvider} from '@mui/lab';
import {TextField} from '@mui/material';
import React, {useState} from 'react';
import {
  FormControlContainer,
  PaperContainer,
  SubHeader,
  TitleWithDivider,
} from '../../../layout';
import BasicInput from '../../BasicInput';
import DateAdapter from '@mui/lab/AdapterDayjs';

const defaultValues = {
  invoice_total_amount: '',
  invoice_amount_tendered: '',
  invoice_date_recorded: new Date(),
  invoice_user_id: 1,
  invoice_customer_id: 1,
};

const UpdateInvoice = () => {
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

  const fields = [
    {
      id: 'invoice_total_amount',
      label: 'Total Amount',
      onChange: handleInputChange,
      value: formValues.invoice_total_amount,
    },
    {
      id: 'invoice_amount_tendered',
      label: 'Amount Tendered',
      onChange: handleInputChange,
      value: formValues.invoice_amount_tendered,
    },
  ];

  return (
    <PaperContainer elevation={3} square>
      <TitleWithDivider>Create Invoice</TitleWithDivider>
      <SubHeader>
        <BasicInput fields={fields} onSubmit={null}>
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
              defaultValue={formValues.invoice_user_id}
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
  );
};

export default UpdateInvoice;
